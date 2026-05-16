import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { media } from "sanity-plugin-media";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "../schemaTypes";
import { locations } from "../studio/locations";
import { structure } from "../studio/structure";
import { EXCLUDED_TYPES, SINGLETON_TYPES } from "./schema-config";
import { dataset, projectId } from "./env";
import { SITE_TITLE, SITE_NAME } from "@/lib/constants";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

export const config = defineConfig({
  name: SITE_NAME,
  title: SITE_TITLE,
  basePath: "/dashboard",
  projectId,
  dataset,
  plugins: [
    structureTool({
      title: "Content",
      structure,
    }),
    isDev ? visionTool() : { name: "vision-disabled" },
    presentationTool({
      previewUrl: {
        initial(context) {
          if (context.origin.startsWith("http://localhost")) {
            return "http://localhost:3000";
          }
          return process.env.NEXT_PUBLIC_SITE_URL!;
        },
        previewMode: {
          enable: "/api/preview/enable",
        },
      },
      resolve: {
        locations,
      },
    }),
    media(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schemaTypes,
  },
  tasks: {
    enabled: false,
  },
  document: {
    comments: {
      enabled: false,
    },
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === "global") {
        return prev.filter(
          (template) => !EXCLUDED_TYPES.includes(template.templateId),
        );
      }
      return prev;
    },
    actions: (prev, context) => {
      // @ts-expect-error - context.schemaType is a string
      const isSingleton = SINGLETON_TYPES.includes(context.schemaType);

      if (isSingleton) {
        return prev.filter(
          (originalAction) =>
            !["delete", "duplicate", "unpublish"].includes(
              originalAction.action as string,
            ),
        );
      }

      return prev;
    },
  },
  scheduledPublishing: {
    enabled: false,
  },
});
