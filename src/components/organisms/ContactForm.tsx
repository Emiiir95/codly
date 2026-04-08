import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/atoms/Button";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error" };

export default function ContactForm() {
  const { t, raw } = useI18n();
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subjectOptions = raw<Record<string, string>>(
    "contact.form.subjectOptions",
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
    };

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          fieldErrors?: Record<string, string>;
        };
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setState({ status: "error" });
        return;
      }
      setState({ status: "success" });
      e.currentTarget.reset();
    } catch {
      setState({ status: "error" });
    }
  };

  const inputCls =
    "w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-fg)] shadow-sm outline-none transition placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="card flex flex-col gap-5 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-[var(--color-fg)]">
            {t("contact.form.name")}
          </span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            placeholder={t("contact.form.namePlaceholder")}
            className={inputCls}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="text-xs text-rose-600">{errors.name}</span>
          )}
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-[var(--color-fg)]">
            {t("contact.form.email")}
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder={t("contact.form.emailPlaceholder")}
            className={inputCls}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-xs text-rose-600">{errors.email}</span>
          )}
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-[var(--color-fg)]">
          {t("contact.form.company")}
        </span>
        <input
          type="text"
          name="company"
          placeholder={t("contact.form.companyPlaceholder")}
          className={inputCls}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-[var(--color-fg)]">
          {t("contact.form.subject")}
        </span>
        <select
          name="subject"
          required
          defaultValue=""
          className={inputCls}
          aria-invalid={!!errors.subject}
        >
          <option value="" disabled>
            —
          </option>
          {Object.entries(subjectOptions).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <span className="text-xs text-rose-600">{errors.subject}</span>
        )}
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-[var(--color-fg)]">
          {t("contact.form.message")}
        </span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={6}
          placeholder={t("contact.form.messagePlaceholder")}
          className={`${inputCls} resize-y`}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="text-xs text-rose-600">{errors.message}</span>
        )}
      </label>
      <label className="flex items-start gap-3 text-xs text-[var(--color-fg-muted)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
        />
        <span>{t("contact.form.consent")}</span>
      </label>
      {errors.consent && (
        <span className="text-xs text-rose-600">{errors.consent}</span>
      )}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting"
            ? t("contact.form.submitting")
            : t("contact.form.submit")}
        </Button>
        {state.status === "success" && (
          <p className="text-sm text-emerald-600" role="status">
            {t("contact.form.success")}
          </p>
        )}
        {state.status === "error" && (
          <p className="text-sm text-rose-600" role="alert">
            {t("contact.form.error")}
          </p>
        )}
      </div>
    </form>
  );
}
