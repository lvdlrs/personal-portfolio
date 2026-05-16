import { SEO_FRAGMENT } from "@/lib/fragments";
import { SINGLETON_TYPES } from "@/sanity/lib/schema-config";
import { sanity } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import {
  MetaDataBySlugQueryResult,
  MetaDataByTypeQueryResult,
} from "@/sanity/types";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";

function getMetadataByType(type: string) {
  const metaDataByTypeQuery = defineQuery(`
    *[_type == $type && _type in $includedTypes][0] {
      ${SEO_FRAGMENT}
    }
  `);

  return sanity<MetaDataByTypeQueryResult>({
    query: metaDataByTypeQuery,
    params: { type, includedTypes: SINGLETON_TYPES },
  });
}

async function getMetadataBySlug(slug: string, type: string) {
  const metaDataBySlugQuery = defineQuery(`
    *[_type == $type && slug.current == $slug][0] {
      ${SEO_FRAGMENT}
    }
  `);

  return sanity<MetaDataBySlugQueryResult>({
    query: metaDataBySlugQuery,
    params: { type, slug },
  });
}

export async function getMetadata({
  slug,
  type,
}: {
  slug?: string;
  type: string;
}): Promise<Metadata> {
  // @ts-expect-error - Types overlap
  const isTypeQuery = SINGLETON_TYPES.includes(type);

  const data = isTypeQuery
    ? await getMetadataByType(type)
    : await getMetadataBySlug(slug ?? "", type);

  if (!data) {
    return {};
  }

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: data.featuredImage?.asset?._ref
        ? urlFor(data.featuredImage.asset).width(1200).height(630).url()
        : undefined,
    },
    robots: {
      index: data.index !== "noindex" ? true : false,
      follow: data.follow !== "nofollow" ? true : false,
    },
    alternates: {
      canonical: data.canonical,
    },
  };
}
