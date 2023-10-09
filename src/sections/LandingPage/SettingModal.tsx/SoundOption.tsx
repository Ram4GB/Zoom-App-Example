import { Box, Flex, IconButton, Select, Stack } from "@chakra-ui/react";
import { BsFillMicFill } from "react-icons/bs";
import { AiFillSound } from "react-icons/ai";

interface SoundOption {
  audios: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
}

export const SoundOption = (props: SoundOption) => {
  return (
    <Box>
      <Box>
        <Box as="p" color="zlink" fontSize="14px" fontWeight="bold">
          Microphone
        </Box>
        <Flex mt="1" alignItems="center">
          <Select size="lg" maxW="311px">
            {props.audios.map((audio) => (
              <option key={audio.deviceId}>{audio.label}</option>
            ))}
          </Select>
          <Stack ml="auto">
            <IconButton color="zlight-grey" variant="unstyled" icon={<BsFillMicFill />} aria-label="" />
          </Stack>
        </Flex>
      </Box>

      <Box mt="6">
        <Box as="p" color="zlink" fontSize="14px" fontWeight="bold">
          Speakers
        </Box>
        <Flex mt="1" alignItems="center">
          <Select size="lg" maxW="311px">
            {props.speakers.map((speaker) => (
              <option key={speaker.deviceId}>{speaker.label}</option>
            ))}
          </Select>
          <Stack ml="auto">
            <IconButton color="zlight-grey" variant="unstyled" icon={<AiFillSound />} aria-label="" />
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};
