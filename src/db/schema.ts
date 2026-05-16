import { sql } from "drizzle-orm";
import { pgSchema, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME!;

export const site = pgSchema(SITE_NAME);

export const formSubmissions = site.table("form_submissions", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
});

export const formSubmissionsSchema = createInsertSchema(formSubmissions, {
  email: z.email({ message: "Ugyldig e-postadresse" }),
});
