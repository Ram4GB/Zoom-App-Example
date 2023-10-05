import { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useEffect } from "react";
import delay from "../../utils/delay";
import useZoom from "../useZoom";

export default function useAutoJoinAudio(
  client: typeof EmbeddedClient | null,
  options: {
    container?: HTMLElement;
    autoGrantPermission?: boolean;
  },
) {
  const { muteSelf } = useZoom(client);
  useEffect(() => {
    if (!client || !options.container) return;

    const mutationObserver = new MutationObserver(async () => {
      const button = document.querySelector("button[title=Audio]") as HTMLButtonElement;

      if (!button || !options.autoGrantPermission) return;

      // immediately click on join audio without handling any actions
      // but browser also show confirm to request user's permission again
      // user cannot stop audio again when they use this hook
      button.click();

      await delay(600);

      muteSelf();
    });

    mutationObserver.observe(options.container, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [client, options.container, options.autoGrantPermission, muteSelf]);
}
