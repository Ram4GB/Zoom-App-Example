import { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useEffect } from "react";

export default function useOnlyShowBlurBackground(
  client: typeof EmbeddedClient | null,
  options: {
    enabled: boolean;
    container?: HTMLElement;
  },
) {
  useEffect(() => {
    if (!client || !options.enabled) return;

    setTimeout(() => client.updateVirtualBackgroundList([]));
  }, [client, options.enabled]);

  useEffect(() => {
    const mutationObserver = new MutationObserver(() => {
      const virtualBackgroundOptions = document.querySelectorAll(
        "[class^=zmwebsdk-makeStyles-virtualBackgroundOptionsImage]",
      );

      if (virtualBackgroundOptions.length > 1) {
        for (let i = 1; i < virtualBackgroundOptions.length; i++) {
          (virtualBackgroundOptions[i] as HTMLElement).style.display = "none";
        }
      }
    });

    mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);
}
