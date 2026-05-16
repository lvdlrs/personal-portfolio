import { cleanStega, generateLink } from "@/lib/utils";
import { Container } from "../shared/container";
import { PageBuilderBlockProps } from "./page-builder";
import { PortableText } from "../shared/portable-text";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export function TextImage(props: PageBuilderBlockProps<"textImage">) {
  const Heading = props.isHero ? "h1" : "h2";
  const placement = cleanStega(props.block.mediaPosition ?? "right");
  const variant = cleanStega(props.block.variant ?? "default");

  return (
    <Container id={props.block.sectionId} variant={variant}>
      <div
        data-media={placement}
        className="group grid grid-cols-1 items-center gap-10 md:grid-cols-2"
      >
        <div className="order-2 space-y-8 md:group-data-[media=left]:order-2 md:group-data-[media=right]:order-1">
          <div className="space-y-4">
            <Heading className="text-foreground text-2xl font-medium md:text-3xl">
              {props.block.title}
            </Heading>
            {Boolean(props.block.content?.length) && (
              <div className="text-base">
                <PortableText value={props.block.content ?? []} />
              </div>
            )}
          </div>
          {Boolean(props.block.links?.length) && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {props.block.links?.map((link, index) => (
                <Button
                  key={link._key}
                  variant={index === 0 ? "default" : "outline"}
                  asChild
                >
                  <Link href={generateLink(link.link?.metadata?.url ?? "")}>
                    {link.text}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="order-1 md:group-data-[media=left]:order-1 md:group-data-[media=right]:order-2">
          {props.block.image?.asset?._ref && (
            <Image
              src={urlFor(props.block.image).url()}
              alt={props.block.image.metadata?.altText ?? ""}
              width={props.block.image.metadata?.dimensions?.width ?? 0}
              height={props.block.image.metadata?.dimensions?.height ?? 0}
              className="rounded-lg"
            />
          )}
        </div>
      </div>
    </Container>
  );
}
