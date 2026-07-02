"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createSessionToken, verifyPassword } from "@/lib/auth";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUser || !expectedHash) {
    return {
      status: "error",
      message: "El panel no está configurado todavía: faltan ADMIN_USERNAME y ADMIN_PASSWORD_HASH.",
    };
  }

  const passwordOk = await verifyPassword(password, expectedHash);
  if (username !== expectedUser || !passwordOk) {
    return { status: "error", message: "Usuario o contraseña incorrectos." };
  }

  const token = await createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
