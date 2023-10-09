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

interface JoinMeetingConfirmation {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onOk: () => void;
}

const JoinMeetingConfirmation = ({ isOpen, loading, onClose, onOk }: JoinMeetingConfirmation) => {
  const cancelRef = useRef<RefObject<FocusableElement>>();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as unknown as RefObject<FocusableElement>}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Join Meeting
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure to join meeting?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef as unknown as LegacyRef<HTMLButtonElement>} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={loading} loadingText="Joining..." colorScheme="teal" onClick={onOk} ml={3}>
              Ok, let's go
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default JoinMeetingConfirmation;
