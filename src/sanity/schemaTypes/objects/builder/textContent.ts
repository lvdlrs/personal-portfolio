import { IconAlignJustified } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";
import { portableText, buttons, choice, sectionId } from "../../fields";

export const textContent = defineType({
  name: "textContent",
  title: "Text",
  type: "object",
  icon: IconAlignJustified,
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
    choice({
      name: "alignment",
      options: ["left", "center", "right"],
      group: "appearance",
    }),
    choice({
      name: "variant",
      options: ["default", "featured"],
      group: "appearance",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Text",
        subtitle: title ? "Text" : undefined,
      };
    },
  },
});
