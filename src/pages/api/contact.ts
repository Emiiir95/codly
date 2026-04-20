import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "name" }),
  email: z.string().trim().email({ message: "email" }),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.enum(["web", "seo", "refonte", "other"], {
    message: "subject",
  }),
  message: z.string().trim().min(20, { message: "message" }),
  consent: z.literal(true, { message: "consent" }),
});

type ApiResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = String(issue.path[0] ?? "form");
      fieldErrors[path] = issue.message;
    }
    console.warn("[contact] Validation failed:", {
      fieldErrors,
      received: req.body,
    });
    return res
      .status(400)
      .json({ ok: false, error: "validation", fieldErrors });
  }

  const { name, email, company, subject, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    console.error(
      "[contact] Missing env: RESEND_API_KEY / CONTACT_FROM / CONTACT_TO",
    );
    return res.status(500).json({ ok: false, error: "server_misconfigured" });
  }

  console.log("[contact] sending with:", {
    apiKeyPrefix: apiKey.slice(0, 10) + "…",
    from,
    to,
  });

  const resend = new Resend(apiKey);

  const html = `
    <h2>Nouveau message depuis le formulaire de contact</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    ${company ? `<p><strong>Société :</strong> ${escapeHtml(company)}</p>` : ""}
    <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message :</strong></p>
    <pre style="font-family: inherit; white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</pre>
  `;

  const text = [
    `Nouveau message depuis le formulaire de contact`,
    ``,
    `Nom : ${name}`,
    `Email : ${email}`,
    company ? `Société : ${company}` : null,
    `Sujet : ${subject}`,
    ``,
    `Message :`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return res.status(502).json({ ok: false, error: "email_failed" });
    }
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return res.status(502).json({ ok: false, error: "email_failed" });
  }

  return res.status(200).json({ ok: true });
}
