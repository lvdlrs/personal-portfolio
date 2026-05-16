import { INTERNAL_LINK_TYPES } from "@/sanity/lib/schema-config";
import { sanity } from "@/sanity/lib/fetch";
import {
  LayoutQueryResult,
  RedirectQueryResult,
  SitemapQueryResult,
} from "@/sanity/types";
import { defineQuery } from "next-sanity";
import {
  BUTTON_FRAGMENT,
  IMAGE_FRAGMENT,
  INTERNAL_LINK_FRAGMENT,
  LINK_FRAGMENT,
} from "@/lib/fragments";

export async function getLayoutData() {
  const layoutQuery = defineQuery(`
    *[_type == "siteSettings"][0]{
      "header": {
        logo {
          ${IMAGE_FRAGMENT}
        },
        "navigation": headerNavigation[]{
          _key,
          label,
          link {
            ${LINK_FRAGMENT}
          },
          navigationLinks[] {
            _key,
            label,
            link {
              ${LINK_FRAGMENT}
            }
          }
        },
        "mainLink": mainLink {
          ${BUTTON_FRAGMENT}
        }
      },
      "footer": {
        logo {
          ${IMAGE_FRAGMENT}
        },
        "navigation": footerNavigation[]{
          _key,
          label,
          navigationLinks[] {
            _key,
            label,
            link {
              ${LINK_FRAGMENT}
            }
          }
        },
      },
      googleTagManagerId
    }
  `);

  return await sanity<LayoutQueryResult>({
    query: layoutQuery,
  });
}

export async function getSitemapData() {
  const sitemapQuery = defineQuery(`
    *[_type in $types && seo.index != "noindex"]{
      _type,
      "slug": coalesce(slug.current, null),
      _updatedAt
    }  
  `);

  return await sanity<SitemapQueryResult>({
    query: sitemapQuery,
    params: {
      types: INTERNAL_LINK_TYPES,
    },
  });
}

export async function getPossibleRedirect(source: string) {
  const sources = !source.endsWith("/") ? [source, `${source}/`] : [source];
  const redirectQuery = defineQuery(
    `*[_type == "redirect" && from.current in $sources][0]{
        "to": to.link->{
          ${INTERNAL_LINK_FRAGMENT}
        },
        permanent,
        "from": from.current
      }`,
  );

  return sanity<RedirectQueryResult>({
    query: redirectQuery,
    params: {
      sources,
    },
  });
}
