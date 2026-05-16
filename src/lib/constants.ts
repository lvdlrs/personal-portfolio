import { nameToTitle } from "./utils";

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME!;
export const SITE_TITLE = nameToTitle(SITE_NAME);
export const SITE_LANG = "no";
