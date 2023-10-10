import { EmbeddedClient } from "@zoomus/websdk/embedded";
import waitForElement from "../../utils/wait-for-element";
import { useCallback, useRef } from "react";

const useAutoTurnAudioPermission = () => {
  const mutationObserver = useRef<MutationObserver>();

  const autoTurnAudioPermissionHandler = useCallback((client: typeof EmbeddedClient | null) => {
    const mutationObserver = new MutationObserver(async () => {
      const audioBtn = await waitForElement("[title=Audio]");

      if (!audioBtn || !client) return;

      (audioBtn as unknown as HTMLButtonElement).click();

      const muteOrUnmute = await Promise.race([waitForElement("[title=Mute]"), waitForElement("[title=Unmute]")]);

      if (!muteOrUnmute) return;

      const title = (muteOrUnmute as HTMLButtonElement).getAttribute("title");

      if (title === "Mute") {
        client.mute(true, client.getCurrentUser()?.userId);
      }
    });

    mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  }, []);

  const disconnect = useCallback(() => {
    mutationObserver.current?.disconnect();
  }, []);

  return {
    autoTurnAudioPermissionHandler,
    disconnect,
  };
};

export default useAutoTurnAudioPermission;
