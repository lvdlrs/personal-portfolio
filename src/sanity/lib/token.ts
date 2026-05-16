import "server-only";

export const token = process.env.SANITY_API_READ_TOKEN!;

if (!token) {
  throw new Error("Missing Sanity API read token");
}
