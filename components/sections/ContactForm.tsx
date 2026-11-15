"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { Magnetic } from "../ui/Magnetic";
const initialState: ContactState = { status: "idle", message: "" };

const fieldClass =
  "border-border text-foreground placeholder:text-muted focus-visible:border-accent text-lead w-full border-b bg-transparent py-4 transition-colors";
const labelClass = "text-label text-muted font-mono uppercase";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  return (
    <form action={formAction} noValidate className="space-y-10">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className={fieldClass}
        />
        {state.errors?.name && (
          <p id="name-error" className="text-accent mt-2 text-sm">
            {state.errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={fieldClass}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-accent mt-2 text-sm">
            {state.errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={`${fieldClass} resize-none`}
        />
        {state.errors?.message && (
          <p id="message-error" className="text-accent mt-2 text-sm">
            {state.errors.message}
          </p>
        )}
      </div>
<Magnetic>
  <button type="submit" disabled={pending} className="...نفس الـ classes">
    {pending ? "Sending…" : "Send message"}
  </button>
</Magnetic>      <div aria-hidden="true" className="sr-only">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent text-background text-label font-mono uppercase px-8 py-4 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Sending…" : "Send message"}
        </button>

        {/* Announced by screen readers when the result arrives */}
        <p role="status" aria-live="polite" className="text-muted">
          {state.message}
        </p>
      </div>
    </form>
  );
}