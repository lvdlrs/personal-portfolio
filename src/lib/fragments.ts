import { groq } from "next-sanity";

export const IMAGE_FRAGMENT = groq`
asset,
hotspot,
crop,
"metadata": asset->{
  altText,
  "dimensions": metadata.dimensions{
    aspectRatio,
    width,
    height
  }
}`;

export const VIDEO_FRAGMENT = groq`
title,
videoUrl,
thumbnail {
  ${IMAGE_FRAGMENT}
}
`;

export const SEO_FRAGMENT = groq`
"title": coalesce(seo.title, title, internalTitle),
"description": coalesce(seo.description, description),
"index": coalesce(seo.index, "index"),
"follow": coalesce(seo.follow, "follow"),
"featuredImage": coalesce(seo.featuredImage{${IMAGE_FRAGMENT}}, image{${IMAGE_FRAGMENT}}),
"canonical": seo.canonical
`;

export const INTERNAL_LINK_FRAGMENT = groq`
"url": {
  "type": _type,
  "slug": slug.current,
}`;

export const INTERNAL_ANCHOR_LINK_FRAGMENT = groq`
"url": {
  "type": _type,
  "slug": slug.current,
  "anchor": coalesce(^.anchorLink.id, ^.id, "")
}`;

export const LINK_FRAGMENT = groq`
"metadata": select(
  linkType == "internal" => internalLink.link->{
    ${INTERNAL_LINK_FRAGMENT}
  },
  linkType == "external" => externalLink{
    "url": link
  },
  linkType == "anchor" => anchorLink.link.link->{
    ${INTERNAL_ANCHOR_LINK_FRAGMENT}
  },
  linkType == "file" => fileLink{
    "url": file.asset->url
  }
)
`;

export const BUTTON_FRAGMENT = groq`
text,
link {
  ${LINK_FRAGMENT}
}
`;

export const SIMPLE_BLOCK_CONTENT_FRAGMENT = groq`
...,
markDefs[]{
  _key,
  _type,
  _type == "internalLink" => link->{
    ${INTERNAL_LINK_FRAGMENT}
  },
  _type == "externalLink" => {
    "url": link
  },
  _type == "anchorLink" => link.link->{
    ${INTERNAL_ANCHOR_LINK_FRAGMENT}
  },
  _type == "fileLink" => {
    "url": file.asset->url
  }
}
`;

export const DEFAULT_BLOCK_CONTENT_FRAGMENT = groq`
${SIMPLE_BLOCK_CONTENT_FRAGMENT},
_type == "image" => {
  ${IMAGE_FRAGMENT},
  caption
}
`;

export const PAGE_BUILDER_BLOCKS = groq`
_key,
_type,
sectionId,
_type == "hero" => {
  mediaPosition,
  layout,
  variant,
  image {
    ${IMAGE_FRAGMENT}
  },
  title,
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  }
},
_type == "textImage" => {
  mediaPosition,
  image {
    ${IMAGE_FRAGMENT}
  },
  title,
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  },
  variant,
  mediaPosition
},
_type == "textContent" => {
  variant,
  alignment,
  title,
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  }
},
_type == "collapsibleContent" => {
  variant,
  alignment,
  title,
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  },
  collapsibleContentGroups[]{
    _key,
    title,
    collapsibleContentItems[]{
      _key,
      title,
      "content": content.text[]{
        ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
      }
    }
  }
},
_type == "featuredLinks" => {
  variant,
  alignment,
  title,
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  },
  featuredLinks[]{
    _key,
    title,
    "content": content.text[]{
      ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
    },
    button {
      ${BUTTON_FRAGMENT}
    }
  }
},
_type == "callout" => {
  alignment,
  title,
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  }
},
_type == "textVideo" => {
  title,
  video {
    ${VIDEO_FRAGMENT}
  },
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  },
  variant,
  mediaPosition
},
_type == "contactForm" => {
  title,
  "content": content.text[]{
    ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
  },
  links[]{
    _key,
    ${BUTTON_FRAGMENT}
  },
  variant
}
`;

export const PAGE_BUILDER_FRAGMENT = groq`
${PAGE_BUILDER_BLOCKS},
_type == "globalBlockContent" => {
  "block": block->block[0] {
    ${PAGE_BUILDER_BLOCKS}
  }
}
`;
