import { IconFileText } from "@tabler/icons-react";
import { defineResource, image, portableText, reference } from "../fields";

export const post = defineResource({
  name: "post",
  icon: IconFileText,
  groups: [
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    image({ name: "featuredImage", group: "content" }),
    portableText({ group: "content", type: "simple", name: "excerpt" }),
    portableText({ group: "content", type: "full" }),
    reference({
      name: "authors",
      group: "settings",
      to: "employee",
      isArray: true,
    }),
    reference({
      name: "relatedPosts",
      group: "settings",
      to: "post",
      isArray: true,
    }),
  ],
});
