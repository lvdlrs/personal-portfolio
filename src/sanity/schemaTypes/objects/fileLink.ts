import { Icon } from "@/sanity/studio/components/icons";
import { defineField, defineType } from "sanity";

export const fileLink = defineType({
  name: "fileLink",
  title: "File Link",
  type: "object",
  icon: Icon.FileLink,
  fields: [
    defineField({
      name: "file",
      title: "File",
      type: "file",
      validation: (Rule) => Rule.required().error("File is required"),
    }),
  ],
});
