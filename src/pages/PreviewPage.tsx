import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

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

  const grantMediaPermission = () => {
    const customNavigator = navigator as unknown as Navigator;

    if (window.localMediaStream) {
      window.localMediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    customNavigator.getUserMedia(
      {
        video: {
          mandatory: {
            minWidth: 1280,
            minHeight: 720,
          },
        },
        audio: true,
      },
      (localMediaStream) => {
        console.log("localMediaStream", localMediaStream);
        const videoEl = document.querySelector("video");

        if (!videoEl) return;

        videoEl.srcObject = localMediaStream;

        videoEl.onloadedmetadata = function (e) {
          console.log("e", e);
        };

        window.localMediaStream = localMediaStream;
      },
      (error) => {
        console.log("error", error);
      },
    );
  };

  // const requestMediaPermission = () => {
  //   return navigator.mediaDevices.getUserMedia({
  //     audio: { deviceId: undefined },
  //     video: { deviceId: undefined },
  //   });
  // };

  // const getDevices = () => {
  //   console.log("getDevices");
  //   return navigator.mediaDevices
  //     .enumerateDevices()
  //     .then((deviceInfos) => {
  //       console.log("!deviceInfos.length || !audioSelectEl.current || !videoSelectEl.current", !audioSelectEl.current);
  //       if (!deviceInfos.length || !audioSelectEl.current || !videoSelectEl.current) return;

  //       audioSelectEl.current.innerHTML = "";
  //       videoSelectEl.current.innerHTML = "";

  //       deviceInfos.forEach((deviceInfo) => {
  //         const el = document.createElement("option");
  //         el.value = deviceInfo.deviceId;
  //         el.label = deviceInfo.label;

  //         if (deviceInfo.kind === "audioinput") {
  //           audioSelectEl.current!.appendChild(el);
  //         } else if (deviceInfo.kind === "videoinput") {
  //           videoSelectEl.current!.appendChild(el);
  //         } else {
  //           console.log("Unvalidated option", deviceInfo.kind);
  //         }
  //       });
  //     })
  //     .catch(handleError);
  // };

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

  // const handleError = (e: unknown) => {
  //   if (e instanceof Error) {
  //     return console.log(e.message);
  //   }
  // };

  const toggleVideo = () => {
    if (video) {
      window.localMediaStream.getTracks().forEach((track) => track.stop());
      setVideo(false);
    } else {
      grantMediaPermission();
      setVideo(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("mute", String(mute));
    localStorage.setItem("video", String(video));
  }, [mute, video]);

  return (
    <Flex className="h-screen" alignItems="center">
      <Flex alignItems="center" className="w-screen">
        <Box flex={1} p={4}>
          <video
            ref={videoEl as unknown as LegacyRef<HTMLVideoElement>}
            autoPlay
            width={100}
            height={100}
            style={{ transform: "rotateY(180deg)" }}
            muted={mute}
            className="bg-[#242424] w-full"
          />
        </Box>
        <Box flex={1} p={4}>
          <Stack>
            <Button
              leftIcon={mute ? <BiMicrophoneOff /> : <BiMicrophone />}
              flexGrow={0}
              onClick={() => setMute((prev) => !prev)}
              colorScheme="teal"
              size="lg"
            >
              {/* {mute ? "Enable" : "Disable"} Audio */}
            </Button>
            <Button leftIcon={!video ? <FiVideoOff /> : <FiVideo />} onClick={toggleVideo} colorScheme="teal" size="lg">
              {/* {video ? "Hide" : "Show"} Video */}
            </Button>
            <Button colorScheme="teal" variant="outline" onClick={() => navigate("/meeting")} size="lg">
              Navigate to meeting
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default PreviewPage;
