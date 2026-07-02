"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-forest-dark px-6 py-3 text-sm font-bold text-cream transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginForm({ nextPath }: { nextPath?: string }) {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={nextPath ?? "/admin"} />

      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-semibold text-ink">
          Usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-semibold text-ink">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <SubmitButton />

      {state.status === "error" && (
        <p className="text-sm font-semibold text-clay-dark" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  );
}
