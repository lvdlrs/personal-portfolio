import "server-only";

import { getPossibleRedirect } from "@/data/general";
import { generateLink } from "./utils";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { InternalLinkTypes } from "@/sanity/lib/schema-config";

export async function maybeNotFound({
  slug,
  type,
}: {
  slug?: string;
  type: InternalLinkTypes;
}) {
  const link = generateLink({ type, slug });

  const data = await getPossibleRedirect(link);

  if (data && data.permanent === "permanent" && data.to) {
    permanentRedirect(
      generateLink({
        type: data.to.url.type,
        slug: data.to.url.slug,
      }),
    );
  }

  if (data && data.permanent === "temporary" && data.to) {
    redirect(
      generateLink({
        type: data.to.url.type,
        slug: data.to.url.slug,
      }),
    );
  }

  notFound();
}
