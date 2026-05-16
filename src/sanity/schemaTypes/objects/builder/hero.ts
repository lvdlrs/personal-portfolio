import { IconStar } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";
import {
  portableText,
  buttons,
  choice,
  image,
  sectionId,
} from "../../fields";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: IconStar,
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
    image({ group: "content" }),
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
      name: "mediaPosition",
      options: ["left", "right"],
      group: "appearance",
    }),
    choice({
      name: "layout",
      options: ["default", "full"],
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
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Hero",
        subtitle: title ? "Hero" : undefined,
        media,
      };
    },
  },
});
