"use server";

import { db } from "@/db";
import { formSubmissions, formSubmissionsSchema } from "@/db/schema";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { sendEmailNotification } from "./mailgun";

export async function exitPreview(pathname: string) {
  (await draftMode()).disable();

  redirect(pathname);
}

export async function sendFormSubmission(_: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);

  const parsed = formSubmissionsSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      data,
      errors: z.treeifyError(parsed.error).errors,
    };
  }

  if (
    process.env.MAILGUN_API_KEY &&
    process.env.MAILGUN_API_KEY !== "INSERT_MAILGUN_API_KEY_HERE"
  ) {
    await sendEmailNotification({
      email: parsed.data.email,
      subject: "Nytt skjema sendt",
      html: `<p>Nytt skjema sendt fra ${parsed.data.url}</p>`,
    });
  }

  if (
    process.env.DATABASE_URL &&
    process.env.DATABASE_URL !== "postgres://default:password@username"
  ) {
    await db.insert(formSubmissions).values(parsed.data);
  }

  redirect("/takk");
}
