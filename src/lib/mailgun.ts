import Mailgun from "mailgun.js";
import { SITE_TITLE } from "./constants";

const mailgun = new Mailgun(FormData);

export const mg = mailgun.client({
  username: "fjellvann@mg.fjellvann.no",
  url: "https://api.eu.mailgun.net",
  key: process.env.MAILGUN_API_KEY!,
});

export async function sendEmailNotification({
  email,
  html,
  subject,
}: {
  email?: string;
  html: string;
  subject: string;
}) {
  const message = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `${SITE_TITLE} <no-reply@fjellvann.no>`,
    to: process.env.MAILGUN_SEND_TO!,
    subject,
    "h:reply-to": email,
    html,
  });

  return message.status === 200;
}

export async function sendEmail({
  html,
  subject,
  to,
}: {
  html: string;
  subject: string;
  to: string;
}) {
  const message = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `${SITE_TITLE} <no-reply@fjellvann.no>`,
    to,
    subject,
    "h:reply-to": process.env.MAILGUN_SEND_TO!,
    html,
  });

  return message.status === 200;
}
