import { defineArrayMember, defineField, defineType } from "sanity";
import { choice, image, internalTitle, language, seo } from "../fields";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    {
      title: "General",
      name: "general",
      default: true,
    },
    {
      title: "SEO",
      name: "seo",
    },
    {
      title: "Tracking",
      name: "tracking",
    },
  ],
  fieldsets: [
    {
      title: "Header",
      name: "header",
    },
    {
      title: "Footer",
      name: "footer",
    },
  ],
  fields: [
    internalTitle({ initialValue: "Sideinnstillinger" }),
    language(),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    image({ group: "general", name: "logo", hotspot: false }),
    defineField({
      name: "headerNavigation",
      title: "Header Navigation",
      type: "array",
      fieldset: "header",
      of: [
        defineArrayMember({
          name: "navigationItem",
          type: "object",
          fields: [
            choice({
              options: ["default", "subMenu"],
            }),
            defineField({ name: "label", type: "string" }),
            defineField({
              name: "link",
              type: "link",
              hidden: ({ parent }) => parent?.variant === "subMenu",
            }),
            defineField({
              name: "navigationLinks",
              type: "array",
              of: [
                defineArrayMember({
                  name: "navigationLink",
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string" }),
                    defineField({ name: "link", type: "link" }),
                  ],
                }),
              ],
              hidden: ({ parent }) => parent?.variant !== "subMenu",
            }),
          ],
        }),
      ],
      group: "general",
    }),
    defineField({
      name: "mainLink",
      title: "Main Link",
      type: "button",
      fieldset: "header",
      group: "general",
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer Navigation",
      type: "array",
      fieldset: "footer",
      of: [
        defineArrayMember({
          name: "navigationItem",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({
              name: "navigationLinks",
              type: "array",
              of: [
                defineArrayMember({
                  name: "navigationLink",
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string" }),
                    defineField({ name: "link", type: "link" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      group: "general",
    }),
    defineField({
      name: "googleTagManagerId",
      title: "Google Tag Manager ID",
      type: "string",
      group: "tracking",
    }),
    seo({ group: "seo" }),
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      return {
        title: title || "Sideinnstillinger",
      };
    },
  },
});
