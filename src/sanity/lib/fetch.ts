import { draftMode } from "next/headers";
import { sanityFetch } from "./live";

export async function sanity<T>({
  query,
  params,
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  const enableDrafts = isDraftMode || process.env.NODE_ENV === "development";

  const { data } = await sanityFetch({
    query,
    params,
    perspective: enableDrafts ? "drafts" : "published",
    stega: isDraftMode,
    tags,
  });

  return data as T;
}
