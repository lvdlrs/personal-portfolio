import { Container } from "@/components/shared/container";
import { PortableText } from "@/components/shared/portable-text";
import { TextContent } from "@/components/templates/text-content";
import { Button } from "@/components/ui/button";
import { getMetadata } from "@/data/metadata";
import { getPost } from "@/data/post";
import { generateLink } from "@/lib/utils";
import { maybeNotFound } from "@/lib/utils.server";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return await getMetadata({ type: "post", slug });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getPost(slug);

  if (!data) {
    await maybeNotFound({ slug, type: "post" });
  }

  return (
    <Container>
      <div className="max-w-body mx-auto">
        {data?.title && <h1 className="text-2xl font-bold">{data.title}</h1>}
        {data?.featuredImage?.asset?._ref && (
          <div className="w-full aspect-video my-8">
            <Image
              src={urlFor(data.featuredImage).url()}
              alt={data.featuredImage.metadata?.altText ?? ""}
              fill
              className="object-cover rounded-lg h-auto w-full"
            />
          </div>
        )}
        {Boolean(data?.excerpt?.length) && (
          <div className="text-lg space-y-4 mt-4">
            <PortableText value={data?.excerpt ?? []} />
          </div>
        )}
        {Boolean(data?.content?.length) && (
          <div className="mt-8">
            <PortableText value={data?.content ?? []} />
          </div>
        )}
      </div>
      {Boolean(data?.relatedPosts?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          {data?.relatedPosts?.map((post) => (
            <Link
              key={post._id}
              href={generateLink({ type: "post", slug: post.slug })}
              className="grid grid-rows-[auto_1fr] gap-4"
            >
              <div className="aspect-vieo">
                {post.featuredImage?.asset?._ref && (
                  <Image
                    src={urlFor(post.featuredImage).url()}
                    alt={post.featuredImage.metadata?.altText ?? ""}
                    width={500}
                    height={500}
                    className="object-cover rounded-lg h-auto w-full"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between gap-2">
                <div>
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <Button variant="link">
                  Les mer
                </Button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
