import { useCallback, useEffect, useRef, useState } from "react";
import ZoomMtgEmbedded, { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import useOnlyShowGalleryView from "../../hooks/useOnlyShowGalleryView/index.ts";
import useZoomDebug from "../../hooks/useZoomDebug/index.ts";
import { faker } from "@faker-js/faker";
import { Box, Flex } from "@chakra-ui/layout";
import "./index.scss";
import useAutoTurnAudioPermission from "../../hooks/useAutoTurnAudioPermission/index.ts";
import CustomToolbar from "./CustomToolbar.tsx";
import useResizeZoom from "../../hooks/useResizeZoom.ts/index.ts";
import axios from "axios";
import Modal from "../Modal.tsx";
import { useDisclosure } from "@chakra-ui/react";

interface Form {
  userName: string;
  meetingNumber: string;
  password: string;
}

interface Props {
  onEnded?: () => void;
}

const meetingNumber = "8561292498";
const password = "Hh9z3T";

function Zoom(props: Props) {
  const { onEnded } = props;
  const meetingSDKElement = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<typeof EmbeddedClient>();
  const [value] = useState<Form>({
    userName: faker.person.fullName(),
    meetingNumber,
    password,
  });
  const [isMod] = useState(true);
  const [zoomClient, setZoomClient] = useState<typeof EmbeddedClient | null>(null);
  const [loading, setLoading] = useState(true);
  const { onClose } = useDisclosure();

  useZoomDebug(zoomClient);
  useOnlyShowGalleryView(zoomClient, {
    enabled: !isMod,
    container: document.getElementById("container") as HTMLElement,
  });
  const { autoTurnAudioPermissionHandler, disconnect } = useAutoTurnAudioPermission();
  useResizeZoom(zoomClient, {
    zoomAppId: "zoom-app",
    container: document.getElementById("container") as HTMLElement,
  });

  const loadZoom = useCallback(async () => {
    const client = ZoomMtgEmbedded.createClient();

    clientRef.current = client;

    // expose zoom client to window
    window.zoomClient = client;

    await client.init({
      debug: true,
      maximumVideosInGalleryView: 5,
      zoomAppRoot: meetingSDKElement.current as unknown as HTMLElement,
      language: "en-US",
      customize: {
        meetingInfo: ["topic", "host", "mn", "pwd", "participant", "dc", "enctype"],
        video: {
          viewSizes: {
            default: {
              width: Math.min(1300, window.document.documentElement.clientWidth),
              height: 700,
            },
            ribbon: {
              width: 300,
              height: 700,
            },
          },
          isResizable: true,
          defaultViewType: "gallery" as SuspensionViewType,
        },
        toolbar: {
          buttons: [],
        },
        activeApps: {
          popper: {
            placement: "top-start",
          },
        },
      },
    });

    client.on("connection-change", (payload) => {
      if (payload.state === "Connected") {
        if (!isMod) document.body.classList.add("only-gallery-view");
      } else {
        document.body.classList.remove("only-gallery-view");
        ZoomMtgEmbedded.destroyClient();
        clientRef.current = undefined;
        window.zoomClient = null;
        setZoomClient(null);
        onEnded?.();
      }
    });

    const payload = await axios.get<{ token: string }>("https://upbeat-insidious-archeology.glitch.me/token");

    await client.join({
      sdkKey: import.meta.env.VITE_ZOOM_SDK_KEY,
      signature: payload.data.token,
      meetingNumber: value.meetingNumber,
      password: value.password,
      userName: value.userName,
    });

    // https://devforum.zoom.us/t/microphone-turn-on-problem/88569
    autoTurnAudioPermissionHandler(client);

    setZoomClient(client);
    setLoading(false);

    return () => {};
  }, [isMod, value.meetingNumber, value.password, value.userName, onEnded, autoTurnAudioPermissionHandler]);

  useEffect(() => {
    loadZoom();

    return () => {
      disconnect();
    };
  }, [loadZoom, disconnect]);

  return (
    <>
      <Flex>
        <Box id="container" flex="6" bgColor="black">
          <div
            id="zoom-app"
            className="zoom-app min-h-screen min-w-full h-screen w-screen flex justify-center items-center"
            ref={meetingSDKElement}
          ></div>
        </Box>
        <CustomToolbar />
      </Flex>

      <Modal
        title="Notification"
        description="Please wait! We are initializing your meeting. This will take a minute."
        isOpen={loading}
        onClose={onClose}
        hideCancelBtn
        hideCloseIcon
      />
    </>
  );
}

export default Zoom;
