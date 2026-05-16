import { IconRouteSquare } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  icon: IconRouteSquare,
  fields: [
    defineField({
      name: "from",
      title: "From",
      type: "slug",
    }),
    defineField({
      name: "to",
      title: "To",
      type: "internalLink",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Permanent (302)", value: "permanent" },
          { title: "Temporary (308)", value: "temporary" },
        ],
      },
      initialValue: "permanent",
    }),
  ],
});
