import { Icon } from "@/sanity/studio/components/icons";
import { defineField, defineType } from "sanity";

export const externalLink = defineType({
  name: "externalLink",
  title: "External Link",
  type: "object",
  icon: Icon.ExternalLink,
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (Rule) =>
        Rule.required()
          .error("External link is required")
          .uri({ scheme: ["http", "https", "tel", "mailto"] }),
    }),
  ],
});
