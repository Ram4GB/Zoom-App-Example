import { useCallback, useEffect, useRef, useState } from "react";
import ZoomMtgEmbedded, { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import useOnlyShowGalleryView from "../../hooks/useOnlyShowGalleryView/index.ts";
import useZoomDebug from "../../hooks/useZoomDebug/index.ts";
import { Box, Flex } from "@chakra-ui/layout";
import "./index.scss";
import CustomToolbar from "./CustomToolbar.tsx";
import useResizeZoom from "../../hooks/useResizeZoom.ts/index.ts";
import axios from "axios";
import Modal from "../Modal.tsx";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { generateSignature } from "../../utils/generate-signature.ts";
import { faker } from "@faker-js/faker";

interface Form {
  meetingNumber: string;
  password: string;
}

interface Props {
  userName?: string;
  widthPercent: number;
  onEnded?: () => void;
}

const meetingNumber = "8561292498";
const password = "Hh9z3T";

function Zoom(props: Props) {
  const { onClose } = useDisclosure();
  const navigate = useNavigate();
  const { onEnded } = props;
  const meetingSDKElement = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<typeof EmbeddedClient>();
  const [value] = useState<Form>({
    meetingNumber,
    password,
  });
  const [isMod] = useState(true);
  const [zoomClient, setZoomClient] = useState<typeof EmbeddedClient | null>(null);
  const [loading, setLoading] = useState(true);
  const fitWidth = (window.document.documentElement.clientWidth * props.widthPercent) / 100;

  useZoomDebug(zoomClient);
  useOnlyShowGalleryView(zoomClient, {
    enabled: !isMod,
    container: document.getElementById("container") as HTMLElement,
  });
  useResizeZoom(zoomClient, {
    zoomAppId: "zoom-app",
    container: document.getElementById("container") as HTMLElement,
    fitWidth,
  });

  const loadZoom = useCallback(async () => {
    if (!props.userName && import.meta.env.MODE !== "goat") return navigate("/");

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
              width: fitWidth,
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
        setLoading(false);
        onEnded?.();
      }
    });

    let signature = "";

    if (import.meta.env.MODE === "goat") {
      signature = generateSignature(
        import.meta.env.VITE_ZOOM_SDK_KEY,
        import.meta.env.VITE_ZOOM_CLIENT_SECRET,
        meetingNumber,
        1,
      );
    } else {
      signature = (await axios.get<{ signature: string }>("https://upbeat-insidious-archeology.glitch.me/token")).data
        .signature;
    }

    await client.join({
      sdkKey: import.meta.env.VITE_ZOOM_SDK_KEY,
      signature,
      meetingNumber: value.meetingNumber,
      password: value.password,
      userName: import.meta.env.MODE === "goat" ? faker.person.fullName() : props.userName!,
    });

    (
      document.querySelector('#zoom-app [id^="suspension-view-tabpanel"]:not([hidden])') as HTMLElement
    )?.style.setProperty("--width-screen", `${props.widthPercent}vw`);

    (
      document.querySelector(
        "#zoom-app .react-draggable > .zmwebsdk-MuiPaper-rounded > .zmwebsdk-MuiPaper-rounded ",
      ) as HTMLElement
    )?.style.setProperty("--width-screen", `${props.widthPercent}vw`);

    (
      document.querySelector(
        "#zoom-app .react-draggable > .zmwebsdk-MuiPaper-rounded > .zmwebsdk-MuiPaper-rounded:nth-child(2)",
      ) as HTMLElement
    )?.style.setProperty("--width-screen", `${props.widthPercent}vw`);

    setZoomClient(client);
    setLoading(false);

    return () => {};
  }, [isMod, value.meetingNumber, value.password, props.userName, props.widthPercent, fitWidth, navigate, onEnded]);

  useEffect(() => {
    loadZoom();
  }, [loadZoom]);

  return (
    <>
      <Flex>
        <Box id="container" flex="6" bgColor="black">
          <div
            id="zoom-app"
            className="zoom-app min-h-screen min-w-full h-screen w-screen flex items-center"
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
