import { IconGripHorizontal } from "@tabler/icons-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  portableText,
  buttons,
  choice,
  sectionId,
  simpleBlockContent,
} from "../../fields";

export const featuredLinks = defineType({
  name: "featuredLinks",
  title: "Featured Links",
  type: "object",
  icon: IconGripHorizontal,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "appearance",
      title: "Appearance",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    portableText({ group: "content" }),
    buttons({ group: "content" }),
    sectionId({ group: "content" }),
    defineField({
      name: "featuredLinks",
      title: "Featured Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "featuredLink",
          title: "Link",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            simpleBlockContent(),
            defineField({
              name: "button",
              title: "Button",
              type: "button",
            }),
          ],
        }),
      ],
      group: "content",
    }),
    choice({
      name: "variant",
      options: ["default", "featured"],
      group: "appearance",
    }),
    choice({
      name: "alignment",
      options: ["left", "center", "right"],
      group: "appearance",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Featured Links",
        subtitle: title ? "Featured Links" : undefined,
      };
    },
  },
});
