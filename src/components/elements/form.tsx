"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { sendFormSubmission } from "@/lib/actions";

export function Form() {
  const [, dispatch, isPending] = useActionState(sendFormSubmission, null);
  return (
    <form action={dispatch}>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Navn</Label>
            <Input name="name" type="text" required />
          </div>
          <div className="space-y-1">
            <Label>E-post</Label>
            <Input name="email" type="email" required />
          </div>
          <div className="space-y-1">
            <Label>Melding</Label>
            <Textarea name="message" className="min-h-24" required />
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sender..." : "Send"}
        </Button>
      </div>
    </form>
  );
}
