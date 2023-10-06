import { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import { useCallback, useEffect, useRef } from "react";
import "./index.css";
import waitForElement from "../../utils/wait-for-element";

export default function useOnlyShowGalleryView(
  client: typeof EmbeddedClient | null,
  options: {
    enabled: boolean;
    container?: HTMLElement;
  },
) {
  const { enabled } = options;
  const mutationObserverRef = useRef<MutationObserver>();

  const getViewMode = () => {
    const optionModeEl: HTMLButtonElement | null =
      document?.querySelector('[role="tablist"] button.zmwebsdk-MuiTab-selected') ??
      document.querySelector(".zmwebsdk-MuiToolbar-root div:nth-child(2) button");

    let viewMode = optionModeEl?.getAttribute("title") ?? "Gallery";

    if (document.getElementById("suspension-view-tabpanel-minimized")) {
      viewMode = "Minimized";
    } else if (document.getElementById("suspension-view-tabpanel-active")) {
      viewMode = "Active";
    } else if (document.getElementById("suspension-view-tabpanel-ribbon")) {
      viewMode = "Ribbon";
    } else if (document.getElementById("suspension-view-tabpanel-speaker")) {
      viewMode = "Speaker";
    } else if (document.getElementById("suspension-view-tabpanel-gallery")) {
      viewMode = "Gallery";
    }

    return viewMode as SuspensionViewType;
  };

  const switchToGalleryView = useCallback(async () => {
    const modeView = getViewMode();

    if (modeView.toLowerCase() === "gallery" || modeView.toLowerCase() === "speaker") return;

    const firstOptionBtn = await waitForElement(
      ".zmwebsdk-MuiPaper-root > .zmwebsdk-MuiToolbar-root div:nth-child(2) button",
    );

    if (!firstOptionBtn) return;

    (firstOptionBtn as HTMLButtonElement).click();

    await waitForElement('[role="menu"][id^=menu-list-icon]').then(() => {});

    await waitForElement('[role="menu"][id^=menu-list-icon] li').then(() => {
      document.querySelectorAll('[role="menu"] li').forEach((el) => {
        if (!el) return;

        const innerText = (el.querySelector(".zmwebsdk-MuiListItemText-root") as HTMLElement).textContent;

        if (innerText === "Gallery") {
          (el as HTMLElement).click();
        }
      });
    });
  }, []);

  const peerShareStateHandler = useCallback(
    function (payload: { action: string; userId: number }) {
      mutationObserverRef.current?.disconnect();

      if (payload.action === "Start") return;

      mutationObserverRef.current = new MutationObserver(() => {
        switchToGalleryView();
      });

      if (options.container)
        mutationObserverRef.current.observe(options.container, { subtree: true, childList: true, attributes: false });
    },
    [switchToGalleryView, options.container],
  );

  useEffect(() => {
    if (!client || !enabled) return;

    document.body.classList.add("only-gallery-view");

    client.on("peer-share-state-change", peerShareStateHandler);

    return () => {
      if (!client) return;
      document.body.classList.remove("only-gallery-view");
      client.off("peer-share-state-change", peerShareStateHandler);
      mutationObserverRef.current?.disconnect();
    };
  }, [client, enabled, options.container, peerShareStateHandler]);
}
