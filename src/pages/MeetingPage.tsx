import { Container } from "@chakra-ui/layout";
import Zoom from "../components/Zoom/Zoom";
import { useNavigate } from "react-router";

export default function Meeting() {
  const navigate = useNavigate();

  return (
    <Container h={{ base: "auto", lg: "100vh" }} maxW="none" w="full" pb={{ base: 8, lg: 0 }} px={0}>
      <Zoom onEnd={() => navigate("/")} />
    </Container>
  );
}
