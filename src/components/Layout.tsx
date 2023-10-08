import { Outlet } from "react-router-dom";
import { Container, Box, Flex, IconButton, Stack, Tooltip, Avatar } from "@chakra-ui/react";
import { SettingsIcon, QuestionOutlineIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { PiDotsNineBold } from "react-icons/pi";
import logo from "@/assets/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png";
import myLogo from "@/assets/IMG_0158_2_Large.jpeg";

export default function Layout() {
  return (
    <>
      <Container maxW="container.xl">
        <Box p={2} as="header" h="64px">
          <Flex alignItems="center">
            <img className="w-32 h-10" src={logo} alt="" />
            <Box ml="auto" display="flex">
              <Stack direction="row" display="flex" alignItems="center">
                <Tooltip label="Support">
                  <IconButton
                    color="lightGrey"
                    size="lg"
                    variant="unstyled"
                    icon={<QuestionOutlineIcon />}
                    aria-label="QA"
                  />
                </Tooltip>
                <Tooltip label="Report a problem">
                  <IconButton
                    color="lightGrey"
                    size="lg"
                    variant="unstyled"
                    icon={<InfoOutlineIcon />}
                    aria-label="Info"
                  />
                </Tooltip>
                <Tooltip label="Settings">
                  <IconButton
                    color="lightGrey"
                    size="lg"
                    variant="unstyled"
                    icon={<SettingsIcon />}
                    aria-label="Settings icon"
                  />
                </Tooltip>
                <Tooltip label="Settings">
                  <input className="w-7 bg-white border-none" type="color" value="#319795" />
                </Tooltip>
              </Stack>
              <Stack direction="row" display="flex" alignItems="center" ml={6}>
                <Tooltip label="More">
                  <IconButton
                    color="lightGrey"
                    size="lg"
                    variant="unstyled"
                    icon={<PiDotsNineBold />}
                    aria-label="More"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  />
                </Tooltip>
                <Avatar cursor="pointer" w={8} h={8} src={myLogo} />
              </Stack>
            </Box>
          </Flex>
        </Box>

        <Outlet />
      </Container>
    </>
  );
}
