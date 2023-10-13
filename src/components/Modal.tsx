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
  loading?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  loadingText?: string;
  hideCancelBtn?: boolean;
  hideCloseIcon?: boolean;
  onClose: () => void;
  onOk?: () => void;
}

const Modal = (props: Modal) => {
  const { isOpen, loading, title, description, confirmText, loadingText, hideCancelBtn, hideCloseIcon, onClose, onOk } =
    props;

  return (
    <ModalChakra isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent mx={4}>
        <ModalHeader pb={0}>{title}</ModalHeader>
        {!hideCloseIcon && <ModalCloseButton />}
        <ModalBody>{description}</ModalBody>

        <ModalFooter>
          {!hideCancelBtn && (
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          )}
          {onOk && (
            <Button isLoading={loading} loadingText={loadingText} onClick={onOk} colorScheme="teal" variant="ghost">
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
};

export default Modal;
