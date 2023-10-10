import { useCallback, useEffect, useRef, useState } from "react";
import ZoomMtgEmbedded, { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import { generateSignature } from "../../utils/index.ts";
import useOnlyShowGalleryView from "../../hooks/useOnlyShowGalleryView/index.ts";
import useZoomDebug from "../../hooks/useZoomDebug/index.ts";
import { faker } from "@faker-js/faker";
import { Box, Flex } from "@chakra-ui/layout";
import "./index.scss";
import useResizeZoom from "../../hooks/useResizeZoom.ts/index.ts";

enum ROLE {
  HOST = 1,
  PARTICIPANT = 0,
}

interface Form {
  userName: string;
  meetingNumber: string;
  password: string;
}

interface Props {
  onEnd?: () => void;
}

function Zoom(props: Props) {
  const meetingSDKElement = useRef<HTMLDivElement | null>(null);
  const meetingNumber = "8561292498";
  const password = "Hh9z3T";
  const [value] = useState<Form>({
    userName: faker.person.fullName(),
    meetingNumber,
    password,
  });
  const [isMod] = useState(true);
  const clientRef = useRef<typeof EmbeddedClient>();
  const [zoomClient, setZoomClient] = useState<typeof EmbeddedClient | null>(null);
  const { onEnd } = props;

  useZoomDebug(zoomClient);
  useOnlyShowGalleryView(zoomClient, {
    enabled: !isMod,
    container: document.getElementById("container") as HTMLElement,
  });
  useResizeZoom(zoomClient, {
    container: document.getElementById("container") as HTMLElement,
    zoomAppId: "zoom-app",
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
        meetingInfo: ["topic", "host", "mn", "pwd", "telPwd", "invite", "participant", "dc", "enctype"],
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
        onEnd?.();
      }
    });

    await client.join({
      sdkKey: import.meta.env.VITE_ZOOM_SDK_KEY,
      signature: generateSignature(
        import.meta.env.VITE_ZOOM_SDK_KEY,
        import.meta.env.VITE_ZOOM_CLIENT_SECRET,
        value.meetingNumber,
        isMod ? ROLE.HOST : ROLE.PARTICIPANT,
      ),
      meetingNumber: value.meetingNumber,
      password: value.password,
      userName: value.userName,
    });

    setZoomClient(client);
  }, [isMod, value.meetingNumber, value.password, value.userName, onEnd]);

  useEffect(() => {
    loadZoom();
  }, [loadZoom]);

  return (
    <Flex>
      <Box flex="6" bgColor="black">
        <div id="zoom-app" className="zoom-app min-h-screen min-w-full h-screen w-screen" ref={meetingSDKElement}></div>
      </Box>
    </Flex>
  );
}

export default Zoom;
