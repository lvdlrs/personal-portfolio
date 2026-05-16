import { cleanStega, generateLink } from "@/lib/utils";
import { Container } from "../shared/container";
import { PageBuilderBlockProps } from "./page-builder";
import { PortableText } from "../shared/portable-text";
import { Button } from "../ui/button";
import Link from "next/link";

export function TextContent(props: PageBuilderBlockProps<"textContent">) {
  const Heading = props.isHero ? "h1" : "h2";
  const variant = cleanStega(props.block.variant ?? "default");
  const alignment = cleanStega(props.block.alignment ?? "left");

  return (
    <Container id={props.block.sectionId} variant={variant}>
      <div
        data-alignment={alignment}
        className="max-w-body data-[alignment=center]:mx-auto data-[alignment=right]:ml-auto"
      >
        <div className="space-y-8">
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
      </div>
    </Container>
  );
}
