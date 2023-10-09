import { ChangeEvent, useRef, useState } from "react";
import "./App.css";
import ZoomMtgEmbedded, { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import { generateSignature } from "./utils";
import useOnlyShowGalleryView from "./hooks/useOnlyShowGalleryView";
import useResizeZoom from "./hooks/useResizeZoom.ts";
import useZoomDebug from "./hooks/useZoomDebug/index.ts";
import { faker } from "@faker-js/faker";
import useOnlyShowBlurBackground from "./hooks/useOnlyShowBlurBackground/index.ts";

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
  const [value, setValue] = useState<Form>({
    userName: faker.person.fullName(),
    meetingNumber,
    password,
  });
  const [isMod, setIsMod] = useState(true);
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
  useOnlyShowBlurBackground(zoomClient, {
    enabled: !isMod,
  });

  const loadZoom = async () => {
    // sessionStorage.clear();
    // localStorage.clear();

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

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="container">
      <div id="zoom-app" className="zoom-app" ref={meetingSDKElement}></div>

      {!hideControl && (
        <form action="">
          <div className="form-item">
            <label htmlFor="userName">Username</label>
            <input
              name="userName"
              id="userName"
              placeholder="Username"
              type="text"
              value={value.userName}
              onChange={handleChangeValue}
            />
          </div>
          <div className="form-item">
            <label htmlFor="userName">Is Moderator</label>
            <input checked={isMod} onChange={() => setIsMod((pre) => !pre)} type="checkbox" />
          </div>
          <button type="button" onClick={loadZoom}>
            load zoom
            <a href="#"></a>
          </button>
        </form>
      )}

      <div className="controls">
        <button onClick={() => zoomClient?.stopAudio()}>stop audio</button>
        <button onClick={() => console.log(zoomClient?.getCurrentUser())}>log current user</button>
      </div>

      <pre id="log"></pre>
    </div>
  );
}

export default App;
