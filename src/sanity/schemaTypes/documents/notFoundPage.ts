import { IconError404 } from "@tabler/icons-react";
import { defineResource } from "../fields";
import { buttons, internalTitle, portableText } from "../fields";

export const notFoundPage = defineResource({
  name: "notFoundPage",
  title: "Not Found Page",
  icon: IconError404,
  fields: [
    internalTitle({ initialValue: "404 Side" }),
    portableText({ group: "content" }),
    buttons({ group: "content" }),
  ],
  preview: {
    select: {
      title: "internalTitle",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
