import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Stack,
} from "@chakra-ui/react";
import { BsSpeaker } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { BiCog } from "react-icons/bi";
import Option from "./Option";
import { SoundOption } from "./SoundOption";
import { useEffect, useState } from "react";

type SettingModal = Omit<ModalProps, "children">;

export default function SettingModal(props: SettingModal) {
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]);
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices?.();
        const audios: MediaDeviceInfo[] = [];
        const speakers: MediaDeviceInfo[] = [];
        const videos: MediaDeviceInfo[] = [];

        devices.forEach((device) => {
          if (device.kind === "audioinput") {
            audios.push(device);
          } else if (device.kind === "audiooutput") {
            speakers.push(device);
          } else {
            videos.push(device);
          }
        });

        setAudios(audios);
        setSpeakers(speakers);
        setVideos(videos);
      } catch (error) {
        throw new Error("Not supported media");
      }
    })();
  }, []);

  return (
    <Modal {...props} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Flex minHeight="calc(100vh - 128px)">
            <Box w="256px" borderRight="1px solid #ddd">
              <Heading as="h2" p="6">
                Settings
              </Heading>

              <Stack gap={0}>
                <Option isActive icon={BsSpeaker} text="Audio" />
                <Option icon={GoDeviceCameraVideo} text="Video" />
                <Option icon={BiCog} text="General" />
              </Stack>
            </Box>
            <Box pl="6" pr="6" pt="6" mt="60px" w="calc(100% - 256px)">
              <SoundOption audios={audios} videos={videos} speakers={speakers} />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
