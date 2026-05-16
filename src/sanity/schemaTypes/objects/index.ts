import { anchorLink } from "./anchorLink";
import { pageBuilder } from "./builder";
import { button } from "./button";
import { externalLink } from "./externalLink";
import { fileLink } from "./fileLink";
import { internalLink } from "./internalLink";
import { link } from "./link";
import { seo } from "./seo";
import { defaultBlockContent } from "./defaultBlockContent";
import { simpleBlockContent } from "./simpleBlockContent";
import { builderBlockContent } from "./builderBlockContent";
import { textImage } from "./builder/textImage";
import { textVideo } from "./builder/textVideo";
import { youtubeVideo } from "./youtubeVideo";
import { hero } from "./builder/hero";
import { collapsibleContent } from "./builder/collapsibleContent";
import { textContent } from "./builder/textContent";
import { contactForm } from "./builder/contactForm";
import { featuredLinks } from "./builder/featuredLinks";
import { callout } from "./builder/callout";

export const objects = [
  seo,
  externalLink,
  internalLink,
  anchorLink,
  fileLink,
  link,
  button,
  youtubeVideo,
  defaultBlockContent,
  simpleBlockContent,
  builderBlockContent,
  // builder
  textImage,
  textVideo,
  hero,
  textContent,
  collapsibleContent,
  contactForm,
  featuredLinks,
  callout,
  pageBuilder,
];
