import { sanity } from "@/sanity/lib/fetch";
import { defineQuery } from "next-sanity";
import {
  BUTTON_FRAGMENT,
  DEFAULT_BLOCK_CONTENT_FRAGMENT,
  PAGE_BUILDER_FRAGMENT,
  SIMPLE_BLOCK_CONTENT_FRAGMENT,
} from "@/lib/fragments";
import {
  ConfirmationPageQueryResult,
  FrontPageQueryResult,
  NotFoundPageQueryResult,
  PageQueryResult,
} from "@/sanity/types";

export async function getPage(slug: string) {
  const pageQuery = defineQuery(`
    *[_type == "page" && slug.current == $slug][0]{
      "content": select(
        pageType == "pageBuilder" => pageBuilder {
          "type": "pageBuilder",
          blocks[]{
            ${PAGE_BUILDER_FRAGMENT}
          }
        },
        pageType == "text" => content {
          "title": ^.title,
          "type": "text",
          text[] {
            ${DEFAULT_BLOCK_CONTENT_FRAGMENT}
          }
        }
      )
    }
  `);

  return sanity<PageQueryResult>({
    query: pageQuery,
    params: { slug },
  });
}

export async function getFrontPage() {
  const frontPageQuery = defineQuery(`
      *[_type == "frontPage"][0]{
        "content": pageBuilder {
          "type": "pageBuilder",
          blocks[]{
            ${PAGE_BUILDER_FRAGMENT}
          }
        }
      }
    `);

  return sanity<FrontPageQueryResult>({
    query: frontPageQuery,
  });
}

export async function getConfirmationPage() {
  const confirmationPageQuery = defineQuery(`
    *[_type == "confirmationPage"][0]{
      title,
      "content": content[]{
        ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
      },
      links[] {
        _key,
        ${BUTTON_FRAGMENT}
      }
    }
  `);

  return sanity<ConfirmationPageQueryResult>({
    query: confirmationPageQuery,
  });
}

export async function getNotFoundPage() {
  const notFoundPageQuery = defineQuery(`
    *[_type == "notFoundPage"][0]{
      title,
      "content": content[]{
        ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
      },
      links[] {
        _key,
        ${BUTTON_FRAGMENT}
      }
    }
  `);

  return sanity<NotFoundPageQueryResult>({
    query: notFoundPageQuery,
  });
}
