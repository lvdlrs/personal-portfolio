import { IconHome2 } from "@tabler/icons-react";
import { defineResource } from "../fields";
import { internalTitle, pageBuilder } from "../fields";

export const frontPage = defineResource({
  name: "frontPage",
  icon: IconHome2,
  fields: [
    internalTitle({ initialValue: "Forside" }),
    pageBuilder({ group: "content" }),
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
