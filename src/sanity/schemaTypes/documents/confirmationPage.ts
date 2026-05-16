import { IconHeartHandshake } from "@tabler/icons-react";
import { defineResource } from "../fields";
import { portableText, buttons, internalTitle } from "../fields";

export const confirmationPage = defineResource({
  name: "confirmationPage",
  title: "Confirmation Page",
  icon: IconHeartHandshake,
  fields: [
    internalTitle({ initialValue: "Takkeside" }),
    portableText(),
    buttons({ group: "content" }),
  ],
  preview: {
    select: {
      title: "internalTitle",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
