export type InternalLinkTypes = (typeof INTERNAL_LINK_TYPES)[number];

export const INTERNAL_LINK_TYPES = [
  "frontPage",
  "confirmationPage",
  "page",
  "post",
] as const;

export const SINGLETON_TYPES = [
  "siteSettings",
  "frontPage",
  "confirmationPage",
  "notFoundPage",
] as const;

export const EXCLUDED_TYPES = [...SINGLETON_TYPES, "media.tag"];
