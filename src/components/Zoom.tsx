import { useRef, useState } from "react";
import ZoomMtgEmbedded, { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import { generateSignature } from "../utils";
import useOnlyShowGalleryView from "../hooks/useOnlyShowGalleryView";
import useResizeZoom from "../hooks/useResizeZoom.ts";
import useZoomDebug from "../hooks/useZoomDebug/index.ts";
import { faker } from "@faker-js/faker";
import { Button, FormControl, Input, FormLabel, Select, Container, Grid, GridItem } from "@chakra-ui/react";

enum ROLE {
  HOST = 1,
  PARTICIPANT = 0,
}

interface Form {
  userName: string;
  meetingNumber: string;
  password: string;
}

function App() {
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
  const [hideControl, setHideControl] = useState(false);

  useZoomDebug(zoomClient);
  useOnlyShowGalleryView(zoomClient, {
    enabled: !isMod,
    container: document.getElementById("container") as HTMLElement,
  });
  useResizeZoom(zoomClient, {
    zoomAppId: "zoom-app",
    container: document.getElementById("container") as HTMLElement,
  });

  const loadZoom = async () => {
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
              height: 500,
              width: Math.min(800, window.document.documentElement.clientWidth),
            },
          },
          isResizable: false,
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
        setHideControl(true);
      } else {
        document.body.classList.remove("only-gallery-view");
        ZoomMtgEmbedded.destroyClient();
        clientRef.current = undefined;
        window.zoomClient = null;
        setZoomClient(null);
        setHideControl(false);
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
  };

  return (
    <Container maxW="container.xl">
      <Grid templateRows="auto" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <GridItem colSpan={1} rowSpan={1}>
          <div id="zoom-app" className="zoom-app" ref={meetingSDKElement}></div>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          {!hideControl && (
            <form action="">
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select>
                  <option value={ROLE.PARTICIPANT}>Participant</option>
                  <option value={ROLE.HOST}>Host</option>
                </Select>
              </FormControl>
              <Button size="md" colorScheme="teal" type="button" onClick={loadZoom}>
                load zoom
                <a href="#"></a>
              </Button>
            </form>
          )}
        </GridItem>
      </Grid>

      <pre id="log"></pre>
    </Container>
  );
}

export default App;
