import { defineArrayMember, defineField, defineType } from "sanity";
import { BLOCK_ANNOTATIONS } from "../fields";

export const builderBlockContent = defineType({
  name: "builderBlockContent",
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
          marks: {
            annotations: BLOCK_ANNOTATIONS,
          },
        }),
      ],
    }),
  ],
});
