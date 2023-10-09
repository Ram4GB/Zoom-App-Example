import { Box, Flex, Select } from "@chakra-ui/react";

interface VideoOption {
  videos: MediaDeviceInfo[];
}

export const VideoOption = (props: VideoOption) => {
  return (
    <Box>
      <Box>
        <Box as="p" color="zlink" fontSize="14px" fontWeight="semibold">
          Camera
        </Box>
        <Flex mt="1">
          <Select size="lg" maxW="311px">
            {props.videos.map((video) => (
              <option key={video.deviceId}>{video.label}</option>
            ))}
          </Select>
        </Flex>
      </Box>
    </Box>
  );
};
