import { Container } from "@/components/shared/container";
import { getMetadata } from "@/data/metadata";
import { getConfirmationPage } from "@/data/page";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return await getMetadata({ type: "confirmationPage" });
}

export default async function ConfirmationPage() {
  const data = await getConfirmationPage();

  if (!data) {
    notFound();
  }

  return (
    <Container>
      <div>
        <h1>{data.title || "Takk!"}</h1>
      </div>
    </Container>
  );
}
