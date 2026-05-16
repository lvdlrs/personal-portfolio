import { IconAlertCircle } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";
import { portableText, buttons, choice, sectionId } from "../../fields";

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  icon: IconAlertCircle,
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
      options: ["left", "center"],
      group: "appearance",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Callout",
        subtitle: title ? "Callout" : undefined,
      };
    },
  },
});
