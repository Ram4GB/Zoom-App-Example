import { Outlet } from "react-router-dom";
import { Container, Box, Flex, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { SettingsIcon, QuestionOutlineIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import logo from "@/assets/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png";

export default function Layout() {
  return (
    <>
      <Container maxW="container.xl">
        <Box p={2} as="header" h="64px">
          <Flex alignItems="center">
            <img className="w-32 h-10" src={logo} alt="" />
            <Box ml="auto">
              <Stack direction="row">
                <Tooltip hasArrow label="Support">
                  <IconButton
                    color="#5f6368"
                    size="lg"
                    variant="unstyled"
                    icon={<QuestionOutlineIcon />}
                    aria-label="QA"
                  />
                </Tooltip>
                <Tooltip hasArrow label="Report a problem">
                  <IconButton
                    color="#5f6368"
                    size="lg"
                    variant="unstyled"
                    icon={<InfoOutlineIcon />}
                    aria-label="Info"
                  />
                </Tooltip>
                <Tooltip hasArrow label="Settings">
                  <IconButton
                    color="#5f6368"
                    size="lg"
                    variant="unstyled"
                    icon={<SettingsIcon />}
                    aria-label="Settings icon"
                  />
                </Tooltip>
              </Stack>
            </Box>
          </Flex>
        </Box>

        <Outlet />
      </Container>
    </>
  );
}
