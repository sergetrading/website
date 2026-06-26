"use client";

import React, { useState } from "react";
import { Reveal, MaskReveal } from "@/components/ui/motion";

const EMAIL = "info@crestmont.consulting";

type FieldKey = "name" | "email" | "org" | "message";
type Errors = Partial<Record<FieldKey, string>>;

/**
 * The close, reworked from a lone email into a *considered enquiry* — the page's
 * one interactive moment. It deliberately rejects the SaaS contact form: no
 * boxed inputs, no "Submit". Instead it borrows the page's own grammar — the
 * left-rail editorial spread of About and Method, and fields drawn as hairline
 * underlines, the same rule that divides every other section. The stance sits on
 * the left, the few fields on the right; the brass note is the underline that
 * brightens and the arrow that travels on the action.
 *
 * Submission is intentionally left unwired (static GitHub Pages export): the
 * form is fully built and validated, and `onSubmit` marks the single place to
 * POST to a host-friendly endpoint when one is chosen.
 */
export function ContactSection() {
  const [form, setForm] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    org: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update =
    (k: FieldKey) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setForm((f) => ({ ...f, [k]: value }));
      // Clear a field's error the moment the visitor starts correcting it.
      setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
    };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "A valid email, so we can reply.";
    if (!form.message.trim()) next.message = "A line on what is at stake.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO — wire submission here. The form is built and validated; to go live,
    // POST `form` to a static-host-friendly endpoint (Web3Forms, Formspree,
    // Basin, …) and gate `setSent(true)` on its success response, e.g.:
    //
    //   const res = await fetch("https://api.web3forms.com/submit", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ access_key: "YOUR_KEY", ...form }),
    //   });
    //   if (res.ok) setSent(true);
    //
    // Until then we resolve the interaction locally so the design reads complete.
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
    >
      {/* brass hairline divider — the thread, topping the section as everywhere */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-16">
          {/* Left rail — the stance */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <Reveal>
                <span
                  className="flex items-center gap-3 text-xs font-light uppercase tracking-[0.5em] text-[hsl(var(--gray-300)/0.7)]"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  <span
                    className="h-px w-6 bg-[hsl(var(--brass)/0.6)]"
                    aria-hidden
                  />
                  The&nbsp;Enquiry
                </span>
              </Reveal>

              <h2 className="mt-8 font-serif text-4xl md:text-5xl font-normal leading-[1.06] tracking-[-0.02em]">
                <MaskReveal delay={100}>
                  Built for the <span className="italic">few.</span>
                </MaskReveal>
              </h2>

              <Reveal delay={200}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-[hsl(var(--gray-300)/0.9)]">
                  If the challenge is real and the stakes are high, we should
                  talk. We read every enquiry ourselves, and reply to the few we
                  are right for.
                </p>
              </Reveal>

              {/* Quiet direct line — for those who arrive by introduction. */}
              <Reveal delay={280}>
                <div className="mt-10">
                  <span
                    className="block text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.55)]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Or write directly
                  </span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group mt-3 inline-block text-sm tracking-[0.04em] text-[hsl(var(--gray-300)/0.95)] transition-colors duration-300 hover:text-[hsl(var(--foreground))]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <span className="relative inline-block">
                      {EMAIL}
                      <span
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[hsl(var(--brass))] transition-transform duration-500 ease-out group-hover:scale-x-100"
                        aria-hidden
                      />
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right column — the few fields, or the acknowledgement */}
          <div className="md:col-span-7">
            {sent ? (
              <Reveal>
                <div className="flex flex-col items-start gap-6 md:pt-12">
                  <span
                    className="h-[7px] w-[7px] rounded-full bg-[hsl(var(--brass))] shadow-[0_0_9px_1px_hsl(var(--brass)/0.65)]"
                    aria-hidden
                  />
                  <p className="font-serif text-3xl md:text-4xl font-normal leading-[1.1]">
                    Thank you.
                  </p>
                  <p className="max-w-md text-lg leading-relaxed text-[hsl(var(--gray-300)/0.9)]">
                    Your enquiry is with us. We read every one personally — if we
                    are the right counsel for it, you will hear from us shortly.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={120}>
                <form noValidate onSubmit={onSubmit} className="flex flex-col gap-10">
                  <Field
                    id="name"
                    label="Name"
                    value={form.name}
                    onChange={update("name")}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <Field
                    id="org"
                    label="Organisation"
                    optional
                    value={form.org}
                    onChange={update("org")}
                    autoComplete="organization"
                  />
                  <Field
                    id="message"
                    label="What is at stake"
                    textarea
                    value={form.message}
                    onChange={update("message")}
                    error={errors.message}
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[hsl(var(--foreground))]"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      <span className="relative inline-block pb-1">
                        Begin the conversation
                        <span
                          className="absolute bottom-0 left-0 h-px w-full origin-left bg-[hsl(var(--brass)/0.4)] transition-colors duration-500 ease-out group-hover:bg-[hsl(var(--brass))]"
                          aria-hidden
                        />
                      </span>
                      <span
                        className="text-[hsl(var(--brass))] transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                        aria-hidden
                      >
                        &rarr;
                      </span>
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A single hairline-underlined field — no box, matching the page's rule-not-box
 * grammar. Label sits above in the Montserrat eyebrow style; the underline is
 * the only border, brightening to brass on focus and on error.
 */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  optional = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  const errorId = error ? `${id}-error` : undefined;
  const field =
    "mt-3 w-full resize-none border-b bg-transparent pb-3 text-base md:text-lg text-[hsl(var(--foreground))] outline-none transition-colors duration-300 " +
    (error
      ? "border-[hsl(var(--brass)/0.85)]"
      : "border-[hsl(var(--gray-300)/0.22)] focus:border-[hsl(var(--brass))]");

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.65)]"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        <span>{label}</span>
        {optional && (
          <span className="text-[hsl(var(--gray-300)/0.4)]">Optional</span>
        )}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={field}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={errorId}
          autoComplete={autoComplete}
          className={field}
        />
      )}

      {error && (
        <p
          id={errorId}
          className="mt-2 text-xs tracking-[0.02em] text-[hsl(var(--brass))]"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
