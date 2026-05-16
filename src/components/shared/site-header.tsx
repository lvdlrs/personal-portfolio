"use client";

import { LayoutQueryResult } from "@/sanity/types";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuContent,
} from "../ui/navigation-menu";
import Link from "next/link";
import { generateLink } from "@/lib/utils";
import { Fragment, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { IconMenu, IconX } from "@tabler/icons-react";

type SanityHeader = NonNullable<LayoutQueryResult>["header"];

export function SiteHeader(props: { header?: SanityHeader }) {
  const [isOpen, setIsOpen] = useState(false);

  function onMobileLinkClick() {
    setIsOpen(false);
  }

  return (
    <header className="px-gutter h-header bg-background sticky top-0">
      <div className="max-w-wide mx-auto flex h-full items-center justify-between">
        <div>
          <Link href="/">
            {props.header?.logo?.asset?._ref ? (
              <Image
                src={urlFor(props.header.logo).url()}
                alt={props.header.logo.metadata?.altText ?? ""}
                width={props.header.logo.metadata?.dimensions?.width ?? 0}
                height={props.header.logo.metadata?.dimensions?.height ?? 0}
              />
            ) : (
              "Logo"
            )}
          </Link>
        </div>
        <div className="nav-md:block hidden">
          {Boolean(props.header?.navigation?.length) && (
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {props.header?.navigation?.map((item) => {
                  const isSubMenu = Boolean(item.navigationLinks?.length);
                  return (
                    <NavigationMenuItem key={item._key}>
                      {isSubMenu ? (
                        <Fragment>
                          <NavigationMenuTrigger>
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul>
                              {item.navigationLinks?.map((subItem) => (
                                <NavigationMenuItem key={subItem._key}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={generateLink(
                                        subItem.link?.metadata?.url ?? "",
                                      )}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </NavigationMenuLink>
                                </NavigationMenuItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </Fragment>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={generateLink(item.link?.metadata?.url ?? "")}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div>
          <div className="nav-md:block hidden">
            {props.header?.mainLink?.text && (
              <Button asChild>
                <Link
                  href={generateLink(
                    props.header.mainLink.link?.metadata?.url ?? "",
                  )}
                >
                  {props.header.mainLink.text}
                </Link>
              </Button>
            )}
          </div>
          <div className="nav-md:hidden block">
            {Boolean(props.header?.navigation?.length) && (
              <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger>
                  <IconMenu />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="sr-only">
                    <DrawerTitle>Mobil meny</DrawerTitle>
                  </DrawerHeader>
                  <div className="relative p-4">
                    <DrawerClose className="absolute top-4 right-4">
                      <IconX />
                    </DrawerClose>
                    <div className="flex flex-col gap-4">
                      {props.header?.navigation?.map((item) => {
                        return (
                          <div key={item._key}>
                            <Button
                              asChild
                              variant="ghost"
                              onClick={onMobileLinkClick}
                            >
                              <Link
                                href={generateLink(
                                  item.link?.metadata?.url ?? "",
                                )}
                              >
                                {item.label}
                              </Link>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
