import { cleanStega, generateLink } from "@/lib/utils";
import { Container } from "../shared/container";
import { PageBuilderBlockProps } from "./page-builder";
import { PortableText } from "../shared/portable-text";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";

export function CollapsibleContent(
  props: PageBuilderBlockProps<"collapsibleContent">,
) {
  const Heading = props.isHero ? "h1" : "h2";
  const SubHeading = props.isHero ? "h2" : "h3";
  const variant = cleanStega(props.block.variant ?? "default");
  const alignment = cleanStega(props.block.alignment ?? "left");

  return (
    <Container id={props.block.sectionId} variant={variant}>
      <div
        data-alignment={alignment}
        className="group data-[alignment=center]:max-w-body grid grid-cols-1 gap-10 data-[alignment=center]:mx-auto md:not-[[data-alignment=center]]:grid-cols-2"
      >
        <div className="space-y-8 group-data-[alignment=left]:order-2 group-data-[alignment=right]:order-1">
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
        <div className="group-data-[alignment=left]:order-1 group-data-[alignment=right]:order-2">
          {Boolean(props.block.collapsibleContentGroups?.length) && (
            <div className="space-y-4">
              {props.block.collapsibleContentGroups?.map((group) => (
                <div key={group._key}>
                  {group.title && (
                    <SubHeading className="text-foreground text-lg font-medium">
                      {group.title}
                    </SubHeading>
                  )}
                  <Accordion type="single" collapsible>
                    {group.collapsibleContentItems?.map((item) => (
                      <AccordionItem key={item._key} value={item._key}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                          <div>
                            <PortableText value={item.content ?? []} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
