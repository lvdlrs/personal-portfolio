import { getSitemapData } from "@/data/general";
import { generateLink } from "@/lib/utils";
import { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getSitemapData();

  const url = new URL("", process.env.NEXT_PUBLIC_SITE_URL ?? "");

  return data?.map((item) => {
    const pathname = generateLink({
      // @ts-expect-error - Type is ensured by the query
      type: item._type,
      slug: item.slug,
    });
    url.pathname = pathname;
    return {
      url: url.toString(),
      lastModified: item._updatedAt,
    };
  });
}
