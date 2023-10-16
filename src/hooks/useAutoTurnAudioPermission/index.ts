import { EmbeddedClient } from "@zoomus/websdk/embedded";
import waitForElement from "../../utils/wait-for-element";
import { useCallback, useRef } from "react";
import useToast from "../useToast";

const useAutoTurnAudioPermission = () => {
  const mutationObserver = useRef<MutationObserver>();
  const toast = useToast();

  const autoTurnAudioPermissionHandler = useCallback(
    async (client: typeof EmbeddedClient | null) => {
      mutationObserver.current = new MutationObserver(async () => {
        const audioBtn = await waitForElement("[title=Audio]");

        if (!audioBtn || !client) return;

        (audioBtn as unknown as HTMLButtonElement).click();

        const muteOrUnmute = await Promise.race([waitForElement("[title=Mute]"), waitForElement("[title=Unmute]")]);

        if (!muteOrUnmute) return;

        const title = (muteOrUnmute as HTMLButtonElement).getAttribute("title");

        if (title === "Mute") {
          client.mute(true, client.getCurrentUser()?.userId).then(() => {
            if (mutationObserver.current) {
              mutationObserver.current.disconnect();
            }
          });
        }
      });

      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        mutationObserver.current.observe(document.body, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      } catch (error) {
        toast.warning({
          title: "Microphone is disabled",
          description: "Please turn your microphone permission on!",
          duration: null,
        });
        return;
      }
    },
    [toast],
  );

  const disconnect = useCallback(() => {
    mutationObserver.current?.disconnect();
  }, []);

  return {
    autoTurnAudioPermissionHandler,
    disconnect,
  };
};

export default useAutoTurnAudioPermission;
