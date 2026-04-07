import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

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
    return res.status(400).json({
      ok: false,
      error: "validation",
      fieldErrors,
    });
  }

  // In a real deployment, dispatch the message to an inbox / CRM here
  // (e.g. Resend, Postmark, SendGrid). We keep the handler dependency-free.

  return res.status(200).json({ ok: true });
}
