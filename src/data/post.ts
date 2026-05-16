import {
  DEFAULT_BLOCK_CONTENT_FRAGMENT,
  IMAGE_FRAGMENT,
  SIMPLE_BLOCK_CONTENT_FRAGMENT
} from "@/lib/fragments";
import { sanity } from "@/sanity/lib/fetch";
import { PostQueryResult } from "@/sanity/types";
import { defineQuery, groq } from "next-sanity";

// @sanity-typegen-ignore
const POST_FRAGMENT = groq`
  _id,
  featuredImage {
    ${IMAGE_FRAGMENT}
  },
  title,
  _type,
  "slug": slug.current,
  "excerpt": pt::text(excerpt.text)
`;

export async function getPost(slug: string) {
  const postQuery = defineQuery(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      featuredImage {
        ${IMAGE_FRAGMENT}
      },
      "authors": authors[]->{
        _id,
        name,
        title,
        headshot {
          ${IMAGE_FRAGMENT}
        }
      },
      "excerpt": excerpt.text[]{
        ${SIMPLE_BLOCK_CONTENT_FRAGMENT}
      },
      "content": content.text[]{
        ${DEFAULT_BLOCK_CONTENT_FRAGMENT}
      },
      "relatedPosts": select(
        defined(relatedPosts) => relatedPosts[]->{
          ${POST_FRAGMENT}
        },
        true => *[_type == "post" && _id != ^._id][0..3]{
          ${POST_FRAGMENT}
        }
      )
    }
  `);

  return sanity<PostQueryResult>({
    query: postQuery,
    params: { slug },
  });
}
