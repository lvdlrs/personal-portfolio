import { IconVideo } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";
import {
  portableText,
  buttons,
  choice,
  sectionId,
  youtubeVideo,
} from "../../fields";

export const textVideo = defineType({
  name: "textVideo",
  title: "Text Video",
  type: "object",
  icon: IconVideo,
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
    youtubeVideo({ group: "content" }),
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
      media: "video.thumbnail",
    },
    prepare({ title, media }) {
      return {
        title: title || "Text Video",
        subtitle: title ? "Text Video" : undefined,
        media,
      };
    },
  },
});
