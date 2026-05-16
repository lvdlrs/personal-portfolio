import {
  IconError404,
  IconHeartHandshake,
  IconSettings,
  IconWorld,
} from "@tabler/icons-react";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("frontPage")
        .schemaType("frontPage")
        .title("Front Page")
        .child(
          S.editor()
            .id("frontPage")
            .schemaType("frontPage")
            .documentId("frontPage")
            .title("Forside"),
        ),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("post").title("Posts"),
      S.divider().title("Settings"),
      S.documentTypeListItem("employee").title("Employees"),
      S.listItem()
        .id("siteSettings")
        .schemaType("siteSettings")
        .title("Site Settings")
        .icon(IconSettings)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.listItem()
        .id("confirmationPage")
        .schemaType("confirmationPage")
        .title("Confirmation Page")
        .icon(IconHeartHandshake)
        .child(
          S.editor()
            .id("confirmationPage")
            .schemaType("confirmationPage")
            .documentId("confirmationPage")
            .title("Takkeside"),
        ),
      S.listItem()
        .id("notFoundPage")
        .schemaType("notFoundPage")
        .title("Not Found Page")
        .icon(IconError404)
        .child(
          S.editor()
            .id("notFoundPage")
            .schemaType("notFoundPage")
            .documentId("notFoundPage")
            .title("404 Side"),
        ),
      S.documentTypeListItem("globalBlock").title("Global Blocks"),
      S.documentTypeListItem("redirect").title("Redirects"),
    ]);
