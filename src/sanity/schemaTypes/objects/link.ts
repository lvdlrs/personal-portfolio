import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
          { title: "Anchor", value: "anchor" },
          { title: "File", value: "file" },
        ],
      },
      validation: (Rule) => Rule.required().error("Link type is required"),
      initialValue: "internal",
    }),
    defineField({
      name: "internalLink",
      title: "Internal Link",
      type: "internalLink",
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "externalLink",
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
    defineField({
      name: "anchorLink",
      title: "Anchor Link",
      type: "anchorLink",
      hidden: ({ parent }) => parent?.linkType !== "anchor",
    }),
    defineField({
      name: "fileLink",
      title: "File Link",
      type: "fileLink",
      hidden: ({ parent }) => parent?.linkType !== "file",
    }),
  ],
});
