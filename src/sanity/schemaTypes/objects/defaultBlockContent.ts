import { Icon } from "@/sanity/studio/components/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { BLOCK_ANNOTATIONS } from "../fields";

export const defaultBlockContent = defineType({
  name: "defaultBlockContent",
  title: "Content",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [
        defineArrayMember({
          name: "block",
          title: "Block",
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Blockquote", value: "blockquote" },
          ],
          marks: {
            annotations: BLOCK_ANNOTATIONS,
          },
        }),
        defineArrayMember({
          name: "image",
          title: "Image",
          type: "image",
          icon: Icon.Image,
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});
