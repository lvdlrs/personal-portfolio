import { apiVersion } from "@/sanity/lib/env";
import { client } from "@/sanity/lib/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    apiVersion,
    token: process.env.SANITY_API_READ_TOKEN,
  }),
});
