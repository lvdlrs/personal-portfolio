import { generateLink } from "@/lib/utils";
import { defineLocations } from "sanity/presentation";

export const locations = {
  frontPage: defineLocations({
    select: {},
    resolve: () => {
      return {
        message: "Preview Page",
        locations: [
          {
            href: generateLink({ type: "frontPage" }),
            title: "Front Page",
          },
        ],
      };
    },
  }),
  page: defineLocations({
    select: {
      slug: "slug.current",
    },
    resolve: (doc) => {

      if (!doc?.slug) {
        return null
      }

      return {
        message: "Preview Page",
        locations: [
          {
            href: generateLink({ type: "page", slug: doc.slug }),
            title: "Page",
          },
        ],
      };
    },
  }),
  post: defineLocations({
    select: {
      slug: "slug.current",
    },
    resolve: (doc) => {
      if (!doc?.slug) {
        return null
      }

      return {
        message: "Preview Post",
        locations: [
          {
            href: generateLink({ type: "post", slug: doc.slug }),
            title: "Post",
          },
        ],
      };
    },
  }),
};
