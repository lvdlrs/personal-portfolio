import { defineField } from "sanity";
import { blocks } from "../objects/builder";
import { IconWorldCog } from "@tabler/icons-react";

export const globalBlock = defineField({
  name: "globalBlock",
  title: "Global Block",
  type: "document",
  icon: IconWorldCog,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "block",
      title: "Block",
      type: "array",
      of: blocks,
      validation: (Rule) => Rule.required().max(1),
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
            },
          ],
        },
      },
    }),
  ],
});
