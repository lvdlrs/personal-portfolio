import { INTERNAL_LINK_TYPES } from "@/sanity/lib/schema-config";
import { Icon } from "@/sanity/studio/components/icons";
import { defineField, defineType } from "sanity";

export const internalLink = defineType({
  name: "internalLink",
  title: "Internal Link",
  type: "object",
  icon: Icon.InternalLink,
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "reference",
      to: INTERNAL_LINK_TYPES.map((type) => ({ type })),
      validation: (Rule) => Rule.required().error("Internal link is required"),
    }),
  ],
});
