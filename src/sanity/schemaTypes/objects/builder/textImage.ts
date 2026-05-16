import { IconPhoto } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";
import {
  portableText,
  buttons,
  choice,
  image,
  sectionId,
} from "../../fields";

export const textImage = defineType({
  name: "textImage",
  title: "Text Image",
  type: "object",
  icon: IconPhoto,
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
        title: title || "Text Image",
        subtitle: title ? "Text Image" : undefined,
        media,
      };
    },
  },
});
