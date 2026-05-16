import { Icon } from "@/sanity/studio/components/icons";
import { defineField, defineType } from "sanity";

export const anchorLink = defineType({
  name: "anchorLink",
  title: "Anchor Link",
  type: "object",
  icon: Icon.AnchorLink,
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "internalLink",
    }),
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .error("Anchor ID is required")
          .custom((id) => {
            return id?.match(/^[a-z0-9-]+$/)
              ? true
              : "Anchor ID must be lowercase and contain only letters, numbers, and hyphens";
          }),
    }),
  ],
});
