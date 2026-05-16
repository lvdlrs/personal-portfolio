import { IconMail } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";
import { portableText, buttons, choice, sectionId } from "../../fields";

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  icon: IconMail,
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
        title: title || "Contact Form",
        subtitle: title ? "Contact Form" : undefined,
      };
    },
  },
});
