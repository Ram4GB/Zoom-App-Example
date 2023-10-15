import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineEmergencyRecording } from "react-icons/md";
import { FaRegKeyboard } from "react-icons/fa";
import { AddIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon, LinkIcon } from "@chakra-ui/icons";

import image1 from "@/assets/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg";
import image2 from "@/assets/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg";
import image3 from "@/assets/user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg";
import image4 from "@/assets/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg";

import JoinMeetingConfirmation from "../sections/LandingPage/JoinMeetingConfirmation";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

interface Image {
  title: string;
  content: string;
  imgSrc: string;
}

type Images = Image[];

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const images: Images = useMemo(
    () => [
      {
        title: "Unlock premium Meet features",
        content: "Enjoy longer group video calls, noise cancellation, and more with a Google One Premium plan. ",
        imgSrc: image1,
      },
      {
        title: "Get a link you can share",
        content: "Click New meeting to get a link you can send to people you want to meet with",
        imgSrc: image2,
      },
      {
        title: "Get a link you can share",
        content: "Click New meeting to schedule meetings in Google Calendar and send invites to participants",
        imgSrc: image3,
      },
      {
        title: "Your meeting is safe",
        content: "No one can join a meeting unless invited or admitted by the host",
        imgSrc: image4,
      },
    ],
    [],
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [userName, setUsername] = useState(faker.person.fullName({ firstName: "Lee" }));
  const navigate = useNavigate();

  const next = useCallback(() => {
    setIndex((prev) => {
      if (prev + 1 === images.length) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }, [setIndex, images.length]);

  const prev = () => {
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const setImageAtPosition = (index: number) => {
    setIndex(index);
  };

  const confirmJoinMeeting = () => {
    onOpen();
  };

  const navigateToMeeting = () => {
    setLoading(true);

    setTimeout(() => {
      onClose();
      navigate("/meeting", { state: { userName } });
    }, 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 2000);

    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <Container h={{ base: "auto", lg: "calc(100vh - 64px)" }} maxW="container.xl" pb={{ base: 8, lg: 0 }}>
        <Flex alignItems="center" h="100%" flexDir={{ base: "column", lg: "row" }}>
          <Box w={{ base: "100%", lg: "50%" }}>
            <Heading pb="22px">
              Premium video meetings.
              <br /> Now free for everyone.
            </Heading>
            <Box as="p" color="#5f6368" pb={14} fontSize="1rem">
              We re-engineered the service we built for secure business meetings, Google Meet, to make it free and
              available for all.
            </Box>
            <Stack direction="row" flexWrap="wrap">
              <Menu>
                <MenuButton
                  as={Button}
                  size="lg"
                  flexShrink={0}
                  leftIcon={<MdOutlineEmergencyRecording />}
                  colorScheme="teal"
                  variant="solid"
                >
                  New meeting
                </MenuButton>
                <MenuList>
                  <MenuItem py={3} icon={<LinkIcon />}>
                    Create a meeting for later
                  </MenuItem>
                  <MenuItem py={3} icon={<AddIcon />}>
                    Start an instant meeting
                  </MenuItem>
                  <MenuItem py={3} icon={<CalendarIcon />}>
                    Schedule in Google Calendar
                  </MenuItem>
                </MenuList>
              </Menu>

              <InputGroup flexGrow={1} maxW="231px">
                <InputLeftElement h="full" pointerEvents="none">
                  <FaRegKeyboard />
                </InputLeftElement>
                <Input
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  size="lg"
                  placeholder="Enter a code or link"
                />
              </InputGroup>

              <Button onClick={confirmJoinMeeting} size="lg">
                Join
              </Button>
            </Stack>

            <Divider pt="24px" />

            <Box as="p" pt="24px">
              <Link>Learn more</Link> <span color="zlight-grey">about Google Meet</span>
            </Box>
          </Box>

          <Box
            w={{ base: "100%", lg: "50%" }}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            pl={{ base: 0, lg: 8 }}
            mt={{ base: 4, lg: 0 }}
          >
            <Flex alignItems="center" justifyContent="center">
              <IconButton
                disabled={index === 0 ? true : false}
                onClick={prev}
                size="lg"
                variant="unstyled"
                aria-label=""
                icon={<ChevronLeftIcon />}
              />
              <Image
                src={images[index].imgSrc}
                w={{ base: "calc(100vw - 111px)", lg: 330 }}
                h={{ base: "auto", lg: 330 }}
              />
              <IconButton
                disabled={index === images.length - 1 ? true : false}
                onClick={next}
                size="lg"
                variant="unstyled"
                aria-label=""
                icon={<ChevronRightIcon />}
              />
            </Flex>

            <Box mt="3">
              <Heading as="h2" textAlign="center" fontSize="1.5rem">
                {images[index].title}
              </Heading>
              <Box as="p" textAlign="center" pt={4} fontSize="0.875rem" maxW="380px" mx="auto">
                {images[index].content}
              </Box>

              <Stack justifyContent="center" mt={4} direction="row">
                {images.map((_item, i) =>
                  i === index ? (
                    <Box key={`dot-${i}`} cursor="pointer" w={2} h={2} bg="teal.500" borderRadius="50%"></Box>
                  ) : (
                    <Box
                      key={`dot-${i}`}
                      onClick={() => setImageAtPosition(i)}
                      cursor="pointer"
                      w={2}
                      h={2}
                      border="1px solid #ddd"
                      borderRadius="50%"
                    ></Box>
                  ),
                )}
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Container>

      <JoinMeetingConfirmation
        loading={loading}
        onOk={navigateToMeeting}
        isOpen={isOpen}
        onClose={() => {
          if (!loading) {
            onClose();
          }
        }}
      />
    </>
  );
}
