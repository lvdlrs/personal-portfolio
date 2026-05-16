import { IconLayoutNavbarExpand } from "@tabler/icons-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { portableText, buttons, choice, sectionId } from "../../fields";

export const collapsibleContent = defineType({
  name: "collapsibleContent",
  title: "Collapsible",
  type: "object",
  icon: IconLayoutNavbarExpand,
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
    defineField({
      name: "collapsibleContentGroups",
      title: "Collapsible Content Groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "collapsibleContentGroup",
          title: "Group",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "collapsibleContentItems",
              title: "Collapsible Content Items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "collapsibleContentItem",
                  title: "Content",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                    }),
                    portableText(),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return { title: title || "Content" };
            },
          },
        }),
      ],
      group: "content",
    }),
    sectionId({ group: "content" }),
    choice({
      name: "variant",
      options: ["default", "featured"],
      group: "appearance",
    }),
    choice({
      name: "alignment",
      options: ["left", "center", "right"],
      group: "appearance",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Collapsible",
        subtitle: title ? "Collapsible" : undefined,
      };
    },
  },
});
