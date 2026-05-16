import { Container } from "../shared/container";
import { PageTextContent, PortableText } from "../shared/portable-text";

export function TextContent(props: { text: PageTextContent }) {
  return (
    <Container>
      <PortableText value={props.text ?? []} />
    </Container>
  );
}
