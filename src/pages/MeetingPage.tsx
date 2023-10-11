import { Container } from "@chakra-ui/layout";
import Zoom from "../components/Zoom/Zoom";
import { useNavigate } from "react-router";
import { useDisclosure } from "@chakra-ui/hooks";
import Confirmation from "../components/Confirmation";
import { useState } from "react";

export default function Meeting() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const onOk = () => {
    setLoading(true);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <Container
        h={{ base: "auto", lg: "100vh" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        maxW="none"
        w="full"
        pb={0}
        px={0}
      >
        <Zoom onEnded={onOpen} />

        <Confirmation
          loading={loading}
          onOk={onOk}
          isOpen={isOpen}
          onClose={onClose}
          title="Notification"
          description="Thanks for joining on the meeting."
          confirmText="Ok, thank you"
        />
      </Container>
    </>
  );
}
