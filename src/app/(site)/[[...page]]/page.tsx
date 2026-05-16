import { PageBuilder } from "@/components/sections/page-builder";
import { TextContent } from "@/components/templates/text-content";
import { getFrontPage, getPage } from "@/data/page";
import { maybeNotFound } from "@/lib/utils.server";

import { getMetadata } from "@/data/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page?: string[] }>;
}) {
  const { page } = await params;

  const isHomePage = !page || page.length === 0;

  return isHomePage
    ? await getMetadata({ type: "frontPage" })
    : await getMetadata({ type: "page", slug: page.join("/") });
}

export default async function Page({
  params,
}: {
  params: Promise<{ page?: string[] }>;
}) {
  const { page } = await params;

  const isHomePage = !page || page.length === 0;

  const data = isHomePage
    ? await getFrontPage()
    : await getPage(page.join("/"));

  if (!data && !isHomePage) {
    await maybeNotFound({ slug: `/${page.join("/")}`, type: "page" });
  }

  if (data?.content?.type === "text") {
    return <TextContent text={data.content.text} />;
  }

  return <PageBuilder blocks={data?.content?.blocks ?? []} />;
}
