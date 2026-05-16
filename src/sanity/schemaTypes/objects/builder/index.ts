import { defineArrayMember, defineField } from "sanity";

import { IconWorldCog } from "@tabler/icons-react";
import { textImage } from "./textImage";
import { textVideo } from "./textVideo";
import { hero } from "./hero";
import { collapsibleContent } from "./collapsibleContent";
import { textContent } from "./textContent";
import { contactForm } from "./contactForm";
import { featuredLinks } from "./featuredLinks";
import { callout } from "./callout";

export const blocks = [
  defineArrayMember({ type: callout.name }),
  defineArrayMember({ type: collapsibleContent.name }),
  defineArrayMember({ type: contactForm.name }),
  defineArrayMember({ type: hero.name }),
  defineArrayMember({ type: featuredLinks.name }),
  defineArrayMember({ type: textImage.name }),
  defineArrayMember({ type: textVideo.name }),
  defineArrayMember({ type: textContent.name }),
];

export const pageBuilder = defineField({
  name: "pageBuilder",
  title: "Page Builder",
  type: "object",
  fields: [
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [
        ...blocks,
        defineField({
          name: "globalBlockContent",
          title: "Global Content",
          type: "object",
          icon: IconWorldCog,
          fields: [
            defineField({
              name: "block",
              title: "Block",
              type: "reference",
              to: [{ type: "globalBlock" }],
            }),
          ],
          preview: {
            select: {
              title: "block.title",
            },
            prepare({ title }) {
              return {
                title: title ?? "Global Block",
                subtitle: title ? "Global Block" : undefined,
              };
            },
          },
        }),
      ],
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
