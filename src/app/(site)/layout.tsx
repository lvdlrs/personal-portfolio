import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { getLayoutData } from "@/data/general";
import { SITE_LANG, SITE_NAME, SITE_TITLE } from "@/lib/constants";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import "../globals.css";
import { VisualEditing } from "@/components/misc/visual-editing";
import { SanityLive } from "@/sanity/lib/live";

const inter = Inter({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_TITLE} | Not Found`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();
  const data = await getLayoutData();
  return (
    <html lang={SITE_LANG}>
      {data?.googleTagManagerId && (
        <GoogleTagManager gtmId={data.googleTagManagerId} />
      )}
      <body
        className={`${inter.variable} text-foreground bg-background [font-family:var(--font)] antialiased`}
      >
        <SiteHeader header={data?.header} />
        <main className="min-h-[calc(100vh-var(--spacing-header))]">
          {children}
        </main>
        <SiteFooter footer={data?.footer} />
        {draft.isEnabled && <VisualEditing />}
      </body>
      <SanityLive refreshOnFocus={false} />
    </html>
  );
}
