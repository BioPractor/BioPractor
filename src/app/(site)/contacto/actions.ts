"use server";

import { submitContact } from "@/lib/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function contactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const result = await submitContact({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return {
    status: "success",
    message: "¡Gracias! Recibimos tu mensaje y te contactaremos pronto.",
  };
}
