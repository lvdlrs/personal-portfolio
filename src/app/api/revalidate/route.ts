import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

const token = process.env.SANITY_API_REVALIDATE_SECRET;

export const POST = async (request: NextRequest) => {
  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  try {
    const reqClone = request.clone() as NextRequest;

    const { isValidSignature } = await parseBody(
      reqClone,
      process.env.SANITY_API_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new Response("Invalid secret", { status: 400 });
    }

    revalidateTag("sanity", "max");

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Revalidation error:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
};
