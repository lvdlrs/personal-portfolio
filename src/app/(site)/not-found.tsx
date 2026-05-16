import { Container } from "@/components/shared/container";
import { getMetadata } from "@/data/metadata";
import { getNotFoundPage } from "@/data/page";

export async function generateMetadata() {
  return await getMetadata({ type: "notFoundPage" });
}

export default async function NotFound() {
  const data = await getNotFoundPage();

  return (
    <Container>
      <div>
        <h1>{data?.title || "Not Found"}</h1>
      </div>
    </Container>
  );
}
