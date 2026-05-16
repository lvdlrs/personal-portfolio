import { cleanStega, generateLink } from "@/lib/utils";
import { Container } from "../shared/container";
import { PageBuilderBlockProps } from "./page-builder";
import { PortableText } from "../shared/portable-text";
import { Button } from "../ui/button";
import Link from "next/link";

export function FeaturedLinks(props: PageBuilderBlockProps<"featuredLinks">) {
  const Heading = props.isHero ? "h1" : "h2";
  const variant = cleanStega(props.block.variant ?? "default");
  const alignment = cleanStega(props.block.alignment ?? "left");

  return (
    <Container id={props.block.sectionId} variant={variant}>
      <div
        data-alignment={alignment}
        className="max-w-body group data-[alignment=center]:mx-auto data-[alignment=right]:ml-auto"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <Heading className="text-foreground text-2xl font-medium group-data-[alignment=center]:text-center md:text-3xl">
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
      {Boolean(props.block.featuredLinks?.length) && (
        <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10">
          {props.block.featuredLinks?.map((link) => {
            const isLinked = Boolean(link.button?.link?.metadata?.url);

            if (isLinked) {
              return (
                <Link
                  href={generateLink(link.button?.link?.metadata?.url ?? "")}
                  key={link._key}
                >
                  <FeaturedLink link={link} />
                </Link>
              );
            }

            return <FeaturedLink link={link} key={link._key} />;
          })}
        </div>
      )}
    </Container>
  );
}

function FeaturedLink({
  link,
}: {
  link: NonNullable<
    PageBuilderBlockProps<"featuredLinks">["block"]["featuredLinks"]
  >[number];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-foreground text-lg font-medium">{link.title}</h3>
      <div className="text-base">
        <PortableText value={link.content ?? []} />
      </div>
      {link.button?.text && <Button variant="ghost">{link.button?.text}</Button>}
    </div>
  );
}
