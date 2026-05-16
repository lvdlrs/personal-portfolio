import { getVideoId } from "@/lib/get-video-id";
import { defineField, defineType } from "sanity";
import { image } from "../fields";

export const youtubeVideo = defineType({
  name: "youtubeVideo",
  title: "YouTube Video",
  type: "object",
  options: {
    collapsed: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    image({
      name: "thumbnail",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) {
            return true;
          }
          const { service } = getVideoId(value);

          if (service !== "youtube") {
            return "Invalid YouTube URL";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
    },
    prepare({ title, media }) {
      return {
        title: title || "YouTube Video",
        subtitle: title ? "YouTube Video" : undefined,
        media,
      };
    },
  },
});
