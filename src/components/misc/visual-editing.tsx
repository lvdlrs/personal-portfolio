"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";
import { Fragment, useTransition } from "react";
import { usePathname } from "next/navigation";
import { exitPreview } from "@/lib/actions";

export function VisualEditing() {
  const draftModeEnvironment = useDraftModeEnvironment();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function onExitPreview() {
    startTransition(() => {
      exitPreview(pathname);
    });
  }

  return (
    <Fragment>
      <SanityVisualEditing />
      {draftModeEnvironment === "live" && (
        <button
          disabled={pending}
          onClick={onExitPreview}
          className="fixed right-4 bottom-4 rounded-full bg-black px-6 py-4.5 text-base font-semibold text-white uppercase transition-colors"
        >
          {pending ? "Avslutter..." : "Avslutt forhåndsvisning"}
        </button>
      )}
    </Fragment>
  );
}
