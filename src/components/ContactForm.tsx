"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { contactAction, type ContactFormState } from "@/app/(site)/contacto/actions";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-forest-dark px-8 py-3 text-sm font-bold text-cream transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
    >
      {pending ? "Enviando..." : "Enviar mensaje"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(contactAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-semibold text-ink">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-semibold text-ink">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <SubmitButton />

      <div aria-live="polite">
        {state.status === "success" && (
          <p className="text-sm font-semibold text-forest">{state.message}</p>
        )}
        {state.status === "error" && (
          <p className="text-sm font-semibold text-clay-dark">{state.message}</p>
        )}
      </div>
    </form>
  );
}
