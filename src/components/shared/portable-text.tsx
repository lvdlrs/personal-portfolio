import { generateLink } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { PageQueryResult } from "@/sanity/types";
import {
  PortableText as RawPortableText,
  PortableTextProps,
  PortableTextTypeComponentProps,
  PortableTextMarkComponentProps,
} from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export type PageTextContent = Extract<
  NonNullable<PageQueryResult>["content"],
  { type: "text" }
>["text"];

type PageTextBlock = NonNullable<PageTextContent>[number];

type PageTextBlockImage = Extract<PageTextBlock, { _type: "image" }>;

type PageTextBlockMarkDef = NonNullable<PageTextBlock["markDefs"]>[number];

type PageTextBlockAnchorLink = Extract<
  NonNullable<PageTextBlockMarkDef>,
  { _type: "anchorLink" }
>;

type PageTextBlockFileLink = Extract<
  NonNullable<PageTextBlockMarkDef>,
  { _type: "fileLink" }
>;

type PageTextBlockExternalLink = Extract<
  NonNullable<PageTextBlockMarkDef>,
  { _type: "externalLink" }
>;

type PageTextBlockInternalLink = Extract<
  NonNullable<PageTextBlockMarkDef>,
  { _type: "internalLink" }
>;

export function PortableText(props: Omit<PortableTextProps, "components">) {
  return (
    <RawPortableText
      {...props}
      components={{
        block: {
          normal: (props) => <p>{props.children}</p>,
          h1: (props) => <h1>{props.children}</h1>,
          h2: (props) => <h2>{props.children}</h2>,
          h3: (props) => <h3>{props.children}</h3>,
          h4: (props) => <h4>{props.children}</h4>,
          h5: (props) => <h5>{props.children}</h5>,
          h6: (props) => <h6>{props.children}</h6>,
          blockquote: (props) => <blockquote>{props.children}</blockquote>,
        },
        marks: {
          strong: (props) => <strong>{props.children}</strong>,
          em: (props) => <em>{props.children}</em>,
          underline: (props) => <u>{props.children}</u>,
          strikeThrough: (props) => <s>{props.children}</s>,
          anchorLink: (
            props: PortableTextMarkComponentProps<PageTextBlockAnchorLink>,
          ) => {
            if (!props.value || !("url" in props.value)) {
              return null;
            }

            return (
              <Link
                href={generateLink({
                  type: props.value.url.type,
                  slug: props.value.url.slug ?? undefined,
                  anchor: props.value.url.anchor ?? undefined,
                })}
              >
                {props.children}
              </Link>
            );
          },

          externalLink: (
            props: PortableTextMarkComponentProps<PageTextBlockExternalLink>,
          ) => {
            if (!props.value || !("url" in props.value)) {
              return null;
            }

            const isExternal = props.value.url?.startsWith("http");
            const isSiteExternal = props.value.url?.startsWith(
              process.env.NEXT_PUBLIC_BASE_URL!,
            );

            if (isSiteExternal) {
              return (
                <Link
                  href={generateLink(
                    props.value.url?.replace(
                      process.env.NEXT_PUBLIC_BASE_URL!,
                      "",
                    ) ?? "#",
                  )}
                >
                  {props.children}
                </Link>
              );
            }

            return (
              <a
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                href={props.value.url ?? "#"}
              >
                {props.children}
              </a>
            );
          },
          internalLink: (
            props: PortableTextMarkComponentProps<PageTextBlockInternalLink>,
          ) => {
            if (!props.value || !("url" in props.value)) {
              return null;
            }

            return (
              <Link
                href={generateLink({
                  type: props.value.url.type,
                  slug: props.value.url.slug ?? undefined,
                })}
              >
                {props.children}
              </Link>
            );
          },
          fileLink: (
            props: PortableTextMarkComponentProps<PageTextBlockFileLink>,
          ) => {
            if (!props.value || !("url" in props.value) || !props.value.url) {
              return null;
            }

            return (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={generateLink(props.value.url)}
              >
                {props.children}
              </a>
            );
          },
        },
        list: {
          bullet: (props) => <ul>{props.children}</ul>,
          number: (props) => <ol>{props.children}</ol>,
        },
        listItem: {
          bullet: (props) => <li>{props.children}</li>,
          number: (props) => <li>{props.children}</li>,
        },
        types: {
          image: (
            props: PortableTextTypeComponentProps<PageTextBlockImage>,
          ) => {
            if (!props.value.asset?._ref) {
              return null;
            }
            return (
              <figure>
                <Image
                  src={urlFor(props.value).url()}
                  alt={props.value.metadata?.altText ?? ""}
                  width={props.value.metadata?.dimensions?.width ?? 0}
                  height={props.value.metadata?.dimensions?.height ?? 0}
                />
                {props.value.caption && (
                  <figcaption>{props.value.caption}</figcaption>
                )}
              </figure>
            );
          },
        },
      }}
    />
  );
}
