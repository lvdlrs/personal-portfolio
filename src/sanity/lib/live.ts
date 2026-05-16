import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { token } from "./token";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ token }),
  browserToken: token,
  serverToken: token,
});
