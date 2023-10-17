import { EmbeddedClient } from "@zoomus/websdk/embedded";
import waitForElement from "../../utils/wait-for-element";
import { useCallback, useRef } from "react";
import useToast from "../useToast";
import debounce from "../../utils/debounce";

const useAutoTurnAudioPermission = () => {
  const mutationObserver = useRef<MutationObserver>();
  const toast = useToast();

  const handler = useCallback(
    async (client: typeof EmbeddedClient | null, mute: boolean) => {
      const debounceFunc = debounce(async () => {
        const audioBtn = await waitForElement("[title=Audio]");

        if (!audioBtn || !client) return;

        (audioBtn as unknown as HTMLButtonElement).click();

        const muteOrUnmute = await Promise.race([waitForElement("[title=Mute]"), waitForElement("[title=Unmute]")]);

        if (!muteOrUnmute) return;

        const title = (muteOrUnmute as HTMLButtonElement).getAttribute("title");

        console.log("mute", mute, title);

        if (mute) {
          if (title === "Unmute") {
            if (mutationObserver.current) {
              return mutationObserver.current.disconnect();
            }
          }

          client.mute(true, client.getCurrentUser()?.userId).then(() => {
            if (mutationObserver.current) {
              mutationObserver.current.disconnect();
            }
          });

          return;
        }

        // mute = false -> unmute

        if (title === "Mute") {
          if (mutationObserver.current) {
            return mutationObserver.current.disconnect();
          }
        }

        if (title === "UnMute") {
          client.mute(false, client.getCurrentUser()?.userId).then(() => {
            if (mutationObserver.current) {
              mutationObserver.current.disconnect();
            }
          });
        }
      }, 200);

      mutationObserver.current = new MutationObserver(debounceFunc);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const disconnect = useCallback(() => {
    mutationObserver.current?.disconnect();
  }, []);

  return {
    handler,
    disconnect,
  };
};

export default useAutoTurnAudioPermission;
