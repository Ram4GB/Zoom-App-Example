import { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useEffect } from "react";
import waitForElement from "../../utils/wait-for-element";
import useZoom from "../useZoom";

const useAutoTurnAudioPermission = (client: typeof EmbeddedClient | null) => {
  const { muteSelf } = useZoom(client);

  useEffect(() => {
    if (!client) return;

    (async function () {
      const audioBtn = await Promise.race([
        waitForElement("[title=Audio]"),
        waitForElement("[title=Mute]"),
        waitForElement("[title=Audio]"),
      ]);

      if (!audioBtn) return;

      (audioBtn as unknown as HTMLButtonElement).click();

      const muteOrUnmute = await Promise.race([waitForElement("[title=Mute]"), waitForElement("[title=Unmute]")]);

      if (!muteOrUnmute) return;

      const title = (muteOrUnmute as HTMLButtonElement).getAttribute("title");

      if (title === "Mute") {
        muteSelf();
      }
    })();
  }, [client, muteSelf]);
};

export default useAutoTurnAudioPermission;
