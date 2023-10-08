import {
  Box,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Select,
  Stack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsSpeaker } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { BiCog } from "react-icons/bi";

type SettingModal = Omit<ModalProps, "children">;

export default function SettingModal(props: SettingModal) {
  return (
    <Modal {...props} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <Flex minHeight="calc(100vh - 128px)">
            <Box w="256px" borderRight="1px solid #ddd" pr={2}>
              <Heading as="h2" p="6">
                Settings
              </Heading>

              <Stack gap={0}>
                <SettingOption isActive icon={BsSpeaker} text="Audio" />
                <SettingOption icon={GoDeviceCameraVideo} text="Video" />
                <SettingOption icon={BiCog} text="General" />
              </Stack>
            </Box>
            <Box pl="6" pr="6" pt="6" mt="60px" w="calc(100% - 256px)">
              <SoundOption />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

interface SettingOption {
  icon: IconType;
  text: string;
  isActive?: boolean;
}

const SettingOption = (props: SettingOption) => {
  const { icon: Icon, text, isActive } = props;

  return (
    <Box
      transition="background-color 0.3s ease"
      cursor="pointer"
      _hover={{ bgColor: "#eee" }}
      borderRadius="0px 30px 30px 0px"
      p={6}
      as="div"
      display="flex"
      alignItems="center"
      h="46px"
      bgColor={isActive ? "#eee" : ""}
    >
      <IconButton
        display="flex"
        justifyContent="center"
        variant="unstyled"
        aria-label=""
        color="lightGrey"
        fontSize="20px"
        icon={<Icon />}
        as="button"
      />
      <Box as="p" className="text-[14px] font-semibold" color="lightGrey">
        {text}
      </Box>
    </Box>
  );
};

const SoundOption = () => {
  return (
    <Box>
      <Box>
        <Box as="p">Microphone</Box>
        <Flex mt="1">
          <Select size="lg" maxW="311px">
            <option>Hello world</option>
          </Select>
        </Flex>
      </Box>

      <Box mt="6">
        <Box as="p">Speakers</Box>
        <Flex mt="1">
          <Select size="lg" maxW="311px">
            <option>Hello world</option>
          </Select>
        </Flex>
      </Box>
    </Box>
  );
};
