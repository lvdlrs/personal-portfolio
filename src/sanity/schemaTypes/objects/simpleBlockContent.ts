import { defineArrayMember, defineField, defineType } from "sanity";
import { BLOCK_ANNOTATIONS } from "../fields";

export const simpleBlockContent = defineType({
  name: "simpleBlockContent",
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
          styles: [],
          lists: [],
          marks: {
            annotations: BLOCK_ANNOTATIONS,
          },
        }),
      ],
    }),
  ],
});
