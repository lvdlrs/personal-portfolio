import { urlFor } from "@/sanity/lib/image";
import { InternalLinkTypes } from "@/sanity/lib/schema-config";
import {
  MetaDataBySlugQueryResult,
  MetaDataByTypeQueryResult,
} from "@/sanity/types";
import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { SITE_LANG } from "./constants";
import { stegaClean } from "next-sanity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateLink(
  link:
    | {
      type: InternalLinkTypes;
      slug?: string | null;
      anchor?: string;
      category?: string;
      language?: string;
    }
    | string,
) {
  if (typeof link === "string") {
    return link;
  }

  const { type, slug, anchor, category, language } = link;

  const url = new URL("", process.env.NEXT_PUBLIC_SITE_URL ?? "");

  switch (type) {
    case "frontPage":
      url.pathname = "/";
      break;
    case "confirmationPage":
      url.pathname = "/takk";
      break;
    case "post":
      url.pathname = `/blogg/${slug}`;
      break;
    case "page":
      url.pathname = `/${slug}`;
      break;
    default:
      url.pathname = `/${slug}`;
      break;
  }

  if (category) {
    url.pathname = `/${category}/${url.pathname}`;
  }

  if (language && language !== SITE_LANG) {
    url.pathname = `/${language}/${url.pathname}`;
  }

  if (anchor) {
    url.hash = anchor;
  }

  return url.toString().replace(process.env.NEXT_PUBLIC_SITE_URL ?? "", "");
}

export async function generateMetadata(
  metadata: MetaDataBySlugQueryResult | MetaDataByTypeQueryResult,
): Promise<Metadata> {
  return {
    title: metadata?.title,
    description: metadata?.description,
    openGraph: {
      images: metadata?.featuredImage?.asset?._ref
        ? urlFor(metadata.featuredImage.asset).width(1200).height(630).url()
        : undefined,
    },
    robots: {
      index: metadata?.index !== "noindex" ? true : false,
      follow: metadata?.follow !== "nofollow" ? true : false,
    },
    alternates: {
      canonical: metadata?.canonical,
    },
  };
}

export function nameToTitle(name: string) {
  return name
    .split(/(?=[A-Z])|[-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function cleanStega<const T extends string>(input: T) {
  return stegaClean(input) as T;
}
