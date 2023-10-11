import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";
import { FocusableElement } from "@chakra-ui/utils";
import { LegacyRef, RefObject, useRef } from "react";

interface Confirmation {
  isOpen: boolean;
  loading?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  loadingText?: string;
  onClose: () => void;
  onOk: () => void;
}

const Confirmation = ({
  isOpen,
  loading,
  title,
  description,
  confirmText,
  loadingText,
  onClose,
  onOk,
}: Confirmation) => {
  const cancelRef = useRef<RefObject<FocusableElement>>();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as unknown as RefObject<FocusableElement>}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)">
        <AlertDialogContent mx={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" pb={0}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef as unknown as LegacyRef<HTMLButtonElement>} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={loading} loadingText={loadingText} colorScheme="teal" onClick={onOk} ml={3}>
              {confirmText ?? "Ok, let's go"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Confirmation;
