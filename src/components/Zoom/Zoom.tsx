import { Box, Flex } from "@chakra-ui/layout";
import { faker } from "@faker-js/faker";
import ZoomMtgEmbedded, { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useResizeZoom from "../../hooks/useResizeZoom.ts/index.ts";
import CustomToolbar from "./CustomToolbar.tsx";
import "./index.scss";
import useZoomDebug from "../../hooks/useZoomDebug/index.ts";

interface Form {
  userName: string;
  meetingNumber: string;
  password: string;
}

const meetingNumber = "8561292498";
const password = "Hh9z3T";

function Zoom() {
  const meetingSDKElement = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<typeof EmbeddedClient>();
  const [value] = useState<Form>({
    userName: faker.person.fullName(),
    meetingNumber,
    password,
  });
  const [zoomClient, setZoomClient] = useState<typeof EmbeddedClient | null>(null);

  useResizeZoom(zoomClient, {
    zoomAppId: "zoom-app",
    container: document.getElementById("container") as HTMLElement,
  });

  useZoomDebug(zoomClient);

  const loadZoom = async () => {
    try {
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
        if (payload.state !== "Connected") {
          ZoomMtgEmbedded.destroyClient();
          clientRef.current = undefined;
          window.zoomClient = null;
          setZoomClient(null);
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

      setZoomClient(client);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    loadZoom();
  }, []);

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
    </>
  );
}

export default Zoom;
