import { Box, Flex, Select } from "@chakra-ui/react";

export const SoundOption = () => {
  return (
    <Box>
      <Box>
        <Box as="p">Microphone</Box>
        <Flex mt="1">
          <Select size="lg" maxW="311px">
            <option>Default - MacBook Pro Microphone (Built-in)</option>
            <option>Hế nhô ☘️👨‍💻🤗🌻 Microphone</option>
          </Select>
        </Flex>
      </Box>

      <Box mt="6">
        <Box as="p">Speakers</Box>
        <Flex mt="1">
          <Select size="lg" maxW="311px">
            <option>Default - MacBook Pro Microphone (Built-in)</option>
            <option>Hế nhô ☘️👨‍💻🤗🌻 Microphone</option>
          </Select>
        </Flex>
      </Box>
    </Box>
  );
};
