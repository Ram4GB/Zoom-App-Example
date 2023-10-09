import { Box, Flex, Select } from "@chakra-ui/react";

interface SoundOption {
  audios: MediaDeviceInfo[];
  videos: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
}

export const SoundOption = (props: SoundOption) => {
  return (
    <Box>
      <Box>
        <Box as="p">Microphone</Box>
        <Flex mt="1">
          <Select size="lg" maxW="311px">
            {props.audios.map((audio) => (
              <option key={audio.deviceId}>{audio.label}</option>
            ))}
          </Select>
        </Flex>
      </Box>

      <Box mt="6">
        <Box as="p">Speakers</Box>
        <Flex mt="1">
          <Select size="lg" maxW="311px">
            {props.speakers.map((speaker) => (
              <option key={speaker.deviceId}>{speaker.label}</option>
            ))}
          </Select>
        </Flex>
      </Box>
    </Box>
  );
};
