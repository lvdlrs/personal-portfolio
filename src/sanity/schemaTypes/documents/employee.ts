import { IconUser } from "@tabler/icons-react";
import { defineType } from "sanity";
import { image, string } from "../fields";

export const employee = defineType({
  name: "employee",
  title: "Employee",
  type: "document",
  icon: IconUser,
  fields: [
    image({ name: "headshot" }),
    string({ name: "name" }),
    string({ name: "title", is: "email" })
  ],
});