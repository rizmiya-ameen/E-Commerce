import Container from "@/components/Container";
import NullData from "@/components/NullData";

export default function NotFound() {
  return (
    <div className="p-8">
      <Container>
        <NullData title="Sorry, we couldn't find that page." />
      </Container>
    </div>
  );
}
