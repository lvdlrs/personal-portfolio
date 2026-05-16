import { cleanStega, generateLink } from "@/lib/utils";
import { Container } from "../shared/container";
import { PageBuilderBlockProps } from "./page-builder";
import { PortableText } from "../shared/portable-text";
import { Button } from "../ui/button";
import Link from "next/link";

export function Callout(props: PageBuilderBlockProps<"callout">) {
  const Heading = props.isHero ? "h1" : "h2";

  const alignment = cleanStega(props.block.alignment ?? "left");

  return (
    <Container id={props.block.sectionId}>
      <div
        data-alignment={alignment}
        className="group bg-primary text-primary-foreground mx-auto max-w-narrow rounded-lg p-10"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <Heading className="text-2xl font-medium group-data-[alignment=center]:text-center md:text-3xl">
              {props.block.title}
            </Heading>
            {Boolean(props.block.content?.length) && (
              <div className="text-base group-data-[alignment=center]:text-center">
                <PortableText value={props.block.content ?? []} />
              </div>
            )}
          </div>
          {Boolean(props.block.links?.length) && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:group-data-[alignment=center]:justify-center">
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
