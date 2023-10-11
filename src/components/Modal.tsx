import { Button } from "@chakra-ui/button";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal as ModalChakra,
} from "@chakra-ui/modal";

interface Modal {
  isOpen: boolean;
  loading: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  loadingText?: string;
  onClose: () => void;
  onOk: () => void;
}

const Modal = (props: Modal) => {
  return (
    <ModalChakra isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
};

export default Modal;
