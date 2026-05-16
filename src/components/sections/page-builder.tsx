import { PageQueryResult } from "@/sanity/types";
import { Hero } from "./hero";
import { TextImage } from "./text-image";
import { TextVideo } from "./text-video";
import { CollapsibleContent } from "./collapsible-content";
import { ContactForm } from "./contact-form";
import { TextContent } from "./text-content";
import { FeaturedLinks } from "./featured-links";
import { Callout } from "./callout";

type PageBuilderBlockContent = Extract<
  NonNullable<PageQueryResult>["content"],
  { type: "pageBuilder" }
>;
type PageBuilderBlocks = NonNullable<PageBuilderBlockContent>["blocks"];
type PageBuilderBlock = NonNullable<PageBuilderBlocks>[number];

export type PageBuilderBlockProps<T extends PageBuilderBlock["_type"]> = {
  block: Extract<PageBuilderBlock, { _type: T }>;
  isHero?: boolean;
};

function PageBlock({
  block,
  isHero,
}: {
  isHero?: boolean;
  block: PageBuilderBlock;
}) {
  switch (block._type) {
    case "hero":
      return <Hero block={block} isHero={isHero} />;
    case "textImage":
      return <TextImage block={block} isHero={isHero} />;
    case "textVideo":
      return <TextVideo block={block} isHero={isHero} />;
    case "collapsibleContent":
      return <CollapsibleContent block={block} isHero={isHero} />;
    case "contactForm":
      return <ContactForm block={block} isHero={isHero} />;
    case "textContent":
      return <TextContent block={block} isHero={isHero} />;
    case "featuredLinks":
      return <FeaturedLinks block={block} isHero={isHero} />;
    case "callout":
      return <Callout block={block} isHero={isHero} />;
    default:
      return <p>{block._type}</p>;
  }
}

export function PageBuilder(props: {
  blocks: PageBuilderBlocks;
  skipHero?: boolean;
}) {
  return props.blocks?.map((block, index) => {
    const content = block._type === "globalBlockContent" ? block.block : block;
    return (
      <PageBlock
        key={content?._key}
        block={content!}
        isHero={index === 0 && !props.skipHero}
      />
    );
  });
}
