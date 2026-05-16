import {
  choice,
  defineResource,
  language,
  pageBuilder,
  seo,
  slug,
  title,
} from "../fields";
import { IconComponents } from "@tabler/icons-react";
import { defineField } from "sanity";

export const page = defineResource({
  name: "page",
  icon: IconComponents,
  fields: [
    choice({
      name: "pageType",
      options: [
        {
          title: "Text content",
          value: "text",
        },
        {
          title: "Page builder",
          value: "pageBuilder",
        },
      ],
      initialValue: "pageBuilder",
      group: "content",
    }),
    pageBuilder({
      group: "content",
      hidden: ({ parent }) => parent?.pageType !== "pageBuilder",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "defaultBlockContent",
      group: "content",
      hidden: ({ parent }) => parent?.pageType !== "text",
    }),
  ],
});
