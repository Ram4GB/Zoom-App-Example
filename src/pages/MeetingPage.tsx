import { Container } from "@chakra-ui/layout";
import Zoom from "../components/Zoom/Zoom";
import { useDisclosure } from "@chakra-ui/hooks";
import Confirmation from "../components/Confirmation";
import { useEffect, useInsertionEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader } from "@chakra-ui/react";

export default function Meeting() {
  const meetingClass = "meeting";
  const [widthPercent, setWidthPercent] = useState(65);
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSidebar, onOpen: onOpenSidebar, onClose: onCloseSidebar } = useDisclosure({});
  const [loading, setLoading] = useState(false);

  const onOk = () => {
    setLoading(true);
    setTimeout(() => (window.location.href = "/"), 100);
  };

  useInsertionEffect(() => {
    document.body.classList.add(meetingClass);
  });

  useEffect(() => {
    return () => {
      document.body.classList.remove(meetingClass);
    };
  }, []);

  const showSidebar = () => {
    setWidthPercent(65);
    onOpenSidebar();
  };

  const hideSidebar = () => {
    console.log("close");
    setWidthPercent(0);
    onCloseSidebar();
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
        onClick={showSidebar}
      >
        <Zoom userName={location.state?.userName} onEnded={onOpen} widthPercent={widthPercent} />

        <Drawer size="sm" isOpen={isOpenSidebar} onClose={hideSidebar}>
          <DrawerContent>
            <DrawerCloseButton onClick={hideSidebar} />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>Hello world</DrawerBody>
          </DrawerContent>
        </Drawer>

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
