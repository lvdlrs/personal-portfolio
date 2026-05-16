import { defineField, defineType } from "sanity";
import { choice, image, url } from "../fields";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    image({
      name: "featuredImage",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    choice({
      name: "index",
      options: ["index", "noindex"],
    }),
    choice({
      name: "follow",
      options: ["follow", "nofollow"],
    }),
    url({
      name: "canonical",
    }),
  ],
});
