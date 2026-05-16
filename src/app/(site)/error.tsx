"use client";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container>
      <div className="py-section space-y-14 text-center">
        <h1 className="text-foreground text-2xl font-medium md:text-3xl">
          {error.message || "Noe gikk galt"}
        </h1>
        <Button onClick={reset}>Reset</Button>
      </div>
    </Container>
  );
}
