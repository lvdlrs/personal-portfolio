"use client";

import { NextStudio } from "next-sanity/studio";
import { config } from "@/sanity/lib/config";

export default function Studio() {
  return <NextStudio scheme="light" config={config} />;
}
