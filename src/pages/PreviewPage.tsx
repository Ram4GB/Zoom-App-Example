import { Box, Flex, IconButton, Stack } from "@chakra-ui/react";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";

// https://web.dev/articles/getusermedia-intro#round_3_webrtc

interface Navigator {
  getUserMedia(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: { video?: any; audio?: boolean },
    success: (stream: MediaStream) => void,
    error: (error: string) => void,
  ): void;
  webkitGetUserMedia: unknown;
  mozGetUserMedia: unknown;
  msGetUserMedia: unknown;
}

const PreviewPage = () => {
  const videoEl = useRef<HTMLVideoElement>();
  // const audioSelectEl = useRef<HTMLSelectElement>();
  // const videoSelectEl = useRef<HTMLSelectElement>();
  const [mute, setMute] = useState(true);
  const [video, setVideo] = useState(false);
  const navigate = useNavigate();

  const hasGetUserMedia = () => {
    const customNavigator = navigator as unknown as Navigator;

    return !!(
      customNavigator.getUserMedia ||
      customNavigator.webkitGetUserMedia ||
      customNavigator.mozGetUserMedia ||
      customNavigator.msGetUserMedia
    );
  };

  const handleCheckUserMedia = () => {
    if (hasGetUserMedia()) {
      console.log("supported");
    } else {
      console.log("getUserMedia() is not supported in your browser");
    }
  };

  const grantMediaPermission = async () => {
    const customNavigator = navigator;

    if (window.localMediaStream) {
      window.localMediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    try {
      const localMediaStream = await customNavigator.mediaDevices.getUserMedia({
        video: {
          deviceId: undefined,
          height: 1080,
          width: 1920,
          facingMode: "environment",
        },
        audio: {
          deviceId: undefined,
        },
      });

      console.log("localMediaStream", localMediaStream);
      const videoEl = document.querySelector("video");

      if (!videoEl) return;

      videoEl.srcObject = localMediaStream;

      videoEl.onloadedmetadata = function () {
        console.log("video loaded");
      };

      window.localMediaStream = localMediaStream;
    } catch (error) {
      console.log("error", error);
    }
  };

  // const requestMediaPermission = () => {
  //   return navigator.mediaDevices.getUserMedia({
  //     audio: { deviceId: undefined },
  //     video: { deviceId: undefined },
  //   });
  // };

  const getDevices = () => {
    console.log("getDevices");
    return navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfos) => {
        console.log("deviceInfos", deviceInfos);
      })
      .catch(handleError);
  };

  useEffect(() => {
    handleCheckUserMedia();

    // requestMediaPermission().then(() => {
    //   console.log("1. media permission works");
    //   console.log("2. get list of devices");
    //   return getDevices();
    // });

    // const changeMedia = () => {
    //   if (!audioSelectEl.current || !videoSelectEl.current) return;

    //   const audioId = audioSelectEl.current.value;
    //   const videoId = videoSelectEl.current.value;

    //   navigator.mediaDevices
    //     .getUserMedia({
    //       audio: {
    //         deviceId: audioId ? { exact: audioId } : undefined,
    //       },
    //       video: {
    //         deviceId: videoId ? { exact: videoId } : undefined,
    //       },
    //     })
    //     .then((localMediaStream) => {
    //       if (!videoEl.current) return;

    //       videoEl.current.srcObject = localMediaStream;
    //     })
    //     .catch(handleError);
    // };

    // if (!audioSelectEl.current || !videoSelectEl.current) return;

    // if (audioSelectEl.current) audioSelectEl.current.onchange = changeMedia;
    // if (videoSelectEl.current) videoSelectEl.current.onchange = changeMedia;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleError = (e: unknown) => {
    if (e instanceof Error) {
      return console.log(e.message);
    }
  };

  const toggleVideo = () => {
    if (video) {
      window.localMediaStream.getTracks().forEach((track) => track.stop());
      setVideo(false);
    } else {
      grantMediaPermission();
      setVideo(true);
    }
  };

  const toggleAudio = () => {
    if (mute) {
      setMute(false);
    } else {
      setMute(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("mute", String(mute));
    localStorage.setItem("video", String(video));
    getDevices();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mute, video]);

  return (
    <Flex className="h-screen" alignItems="center">
      <Flex direction={{ base: "column", lg: "row" }} alignItems="center" className="w-screen">
        <Box flex={1} m={4} pos="relative">
          <video
            ref={videoEl as unknown as LegacyRef<HTMLVideoElement>}
            autoPlay
            style={{ transform: "rotateY(180deg)" }}
            muted={mute}
            className="bg-[#242424] w-full h-[300px] lg:h-[600px]"
            playsInline
          ></video>
          <Box pos="absolute" bottom={1} left={0} zIndex={10000} w="full">
            <Stack w="full" direction="row" justifyContent="center">
              <IconButton
                aria-label=""
                icon={mute ? <BiMicrophoneOff /> : <BiMicrophone />}
                onClick={toggleAudio}
                size="lg"
                variant="solid"
                // colorScheme="whatsapp"
              ></IconButton>{" "}
              <IconButton
                aria-label=""
                icon={!video ? <FiVideoOff /> : <FiVideo />}
                onClick={toggleVideo}
                size="lg"
                variant="solid"
                // colorScheme="whatsapp"
              ></IconButton>
              <IconButton
                onClick={() => navigate("/meeting")}
                aria-label=""
                icon={<SiGoogleclassroom />}
                size="lg"
                variant="solid"
                // colorScheme="whatsapp"
              ></IconButton>
            </Stack>
          </Box>
        </Box>
        {/* <Box flex={1} p={4}>
          <Stack alignItems="center">
            <Button colorScheme="teal" variant="solid"  size="lg">
              Navigate to meeting
            </Button>
          </Stack>
        </Box> */}
      </Flex>
    </Flex>
  );
};

export default PreviewPage;
