import { cn } from "@/lib/utils";

export function Container({
  children,
  id,
  className,
  fluid,
  variant,
  layout,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string | null;
  fluid?: boolean;
  variant?: "default" | "featured";
  layout?: "default" | "full";
}) {
  return (
    <section
      data-featured={variant === "featured" ? "" : ""}
      className={cn(
        "scroll-mt-header pt-section pb-section",
        fluid ? "px-0" : "px-gutter",
        variant === "featured" ? "bg-accent" : "",
        layout === "full" ? "-mt-header min-h-[90vh]" : "",
        className,
      )}
      id={id ?? undefined}
    >
      <div className="max-w-wide mx-auto">{children}</div>
    </section>
  );
}
