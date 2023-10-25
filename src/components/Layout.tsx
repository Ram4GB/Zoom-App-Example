import { Outlet, useLocation } from "react-router-dom";
import { Container, Box, Flex, IconButton, Stack, Tooltip, Avatar } from "@chakra-ui/react";
import { SettingsIcon, QuestionOutlineIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { PiDotsNineBold } from "react-icons/pi";
import logo from "@/assets/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png";
import myLogo from "@/assets/IMG_0158_2_Large.jpeg";
import SettingModal from "../sections/LandingPage/SettingModal.tsx";
import { useState } from "react";
import dayjs from "dayjs";

interface Layout {
  fullscreen?: string[];
}

export default function Layout(props: Layout) {
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
  const { pathname } = useLocation();

  const isFullScreen = props.fullscreen?.includes(pathname);

  return (
    <>
      <Container maxW={isFullScreen ? "none" : "container.xl"} p={isFullScreen ? 0 : 2}>
        <Box p={isFullScreen ? 0 : 2} as="header" h="64px" display={isFullScreen ? "none" : ""}>
          <Flex alignItems="center">
            <img className="w-32 h-10" src={logo} alt="" />
            <Box ml="auto" display="flex">
              <Stack direction="row" display="flex" alignItems="center">
                <Box className="hidden lg:block" as="p" color="zlight-grey" fontSize="1.1rem" cursor="default">
                  {dayjs().format("h:m a • ddd, MMM D")}
                </Box>
                <Tooltip label="Support">
                  <IconButton
                    color="zlight-grey"
                    size="lg"
                    variant="unstyled"
                    icon={<QuestionOutlineIcon />}
                    aria-label="QA"
                    display={{ base: "none", lg: "inline" }}
                  />
                </Tooltip>
                <Tooltip label="Report a problem">
                  <IconButton
                    color="zlight-grey"
                    size="lg"
                    variant="unstyled"
                    icon={<InfoOutlineIcon />}
                    aria-label="Info"
                    display={{ base: "none", lg: "inline" }}
                  />
                </Tooltip>
                <Tooltip label="Settings">
                  <IconButton
                    color="zlight-grey"
                    size="lg"
                    variant="unstyled"
                    icon={<SettingsIcon />}
                    aria-label="Settings icon"
                    onClick={() => setIsOpenSettingModal(true)}
                    display="none"
                  />
                </Tooltip>
              </Stack>
              <Stack direction="row" display="flex" alignItems="center" ml={{ base: 0, lg: 6 }}>
                <Tooltip label="More">
                  <IconButton
                    color="zlight-grey"
                    size="lg"
                    variant="unstyled"
                    icon={<PiDotsNineBold />}
                    aria-label="More"
                    display="none"
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

      <SettingModal isOpen={isOpenSettingModal} onClose={() => setIsOpenSettingModal(false)} />
    </>
  );
}
