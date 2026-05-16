import { defineCliConfig } from "sanity/cli";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { config } from "dotenv";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const nextPublicEnv = Object.fromEntries(
  Object.entries(process.env)
    .filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
    .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)]),
);

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: process.env.SANITY_API_APP_ID || undefined,
  },
  typegen: {
    path: "./src/data/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "./src/sanity/types.ts",
    overloadClientMethods: false,
  },
  vite: {
    envDir: ".",
    define: nextPublicEnv,
    plugins: [
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
