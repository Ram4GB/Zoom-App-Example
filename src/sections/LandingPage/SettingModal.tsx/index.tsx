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

enum TabType {
  SOUND = "SOUND",
  VIDEO = "VIDEO",
  GENERAL = "GENERAL",
}

export default function SettingModal(props: SettingModal) {
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]);
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [tab, setTab] = useState<TabType>(TabType.SOUND);

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
    <Modal {...props} blockScrollOnMount size="4xl">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent mx={4}>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Flex minHeight="calc(100vh - 128px)">
            <Box w="256px" borderRight="1px solid #ddd">
              <Heading as="h2" p="6">
                Settings
              </Heading>

              <Stack gap={0}>
                <Option
                  onClick={() => setTab(TabType.SOUND)}
                  isActive={tab === TabType.SOUND}
                  icon={BsSpeaker}
                  text="Audio"
                />
                <Option
                  onClick={() => setTab(TabType.VIDEO)}
                  isActive={tab === TabType.VIDEO}
                  icon={GoDeviceCameraVideo}
                  text="Video"
                />
                <Option
                  onClick={() => setTab(TabType.GENERAL)}
                  isActive={tab === TabType.GENERAL}
                  icon={BiCog}
                  text="General"
                />
              </Stack>
            </Box>
            <Box pl="6" pr="6" pt="6" mt="60px" w="calc(100% - 256px)">
              {tab === TabType.SOUND && <SoundOption audios={audios} videos={videos} speakers={speakers} />}
              {tab === TabType.VIDEO && <p>Video</p>}
              {tab === TabType.GENERAL && <p>General</p>}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
