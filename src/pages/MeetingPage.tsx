import { Container } from "@chakra-ui/layout";
import Zoom from "../components/Zoom";

export default function Meeting() {
  return (
    <Container h={{ base: "auto", lg: "100vh" }} maxW="none" w="full" pb={{ base: 8, lg: 0 }} px={0}>
      <Zoom />
    </Container>
  );
}
