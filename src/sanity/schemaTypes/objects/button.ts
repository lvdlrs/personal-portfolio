import { defineField, defineType } from "sanity";

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
    }),
  ],
});
