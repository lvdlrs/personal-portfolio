import { generateLink } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { LayoutQueryResult } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";

type SanityFooter = NonNullable<LayoutQueryResult>["footer"];

export function SiteFooter(props: { footer?: SanityFooter }) {
  return (
    <footer className="px-gutter bg-accent text-accent-foreground py-section">
      <div className="max-w-wide mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            {props.footer?.logo?.asset?._ref && (
              <Image
                src={urlFor(props.footer.logo).url()}
                alt={props.footer.logo.metadata?.altText ?? ""}
                width={props.footer.logo.metadata?.dimensions?.width ?? 0}
                height={props.footer.logo.metadata?.dimensions?.height ?? 0}
              />
            )}
          </div>
          <div className="md:col-span-3">
            <div className="grid grid-cols-4 gap-10">
              {props.footer?.navigation?.map((item) => (
                <div key={item._key}>
                  <h3 className="text-lg font-medium">{item.label}</h3>
                  <ul>
                    {item.navigationLinks?.map((subItem) => (
                      <li key={subItem._key}>
                        <Link
                          href={generateLink(subItem.link?.metadata?.url ?? "")}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
