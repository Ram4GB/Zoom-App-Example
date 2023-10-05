import { EmbeddedClient, SuspensionViewType } from "@zoomus/websdk/embedded";
import { useCallback, useEffect } from "react";

export default function useOnlyShowGalleryView(
  client: typeof EmbeddedClient | null,
  options: {
    enabled: boolean;
    container?: HTMLElement;
  },
) {
  const { enabled } = options;

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

  const removeOtherViewModeOnModeTabs = () => {
    const viewModeTabs = document.querySelector('[aria-label="view mode tabs"]') as HTMLElement;

    if (!viewModeTabs) return;

    const buttons = viewModeTabs.querySelectorAll("button");

    buttons.forEach((el) => {
      if (el.getAttribute("title") !== "Gallery") el.style.display = "none";
    });
  };

  const peerShareStateHandler = useCallback(function (payload: { action: string; userId: number }) {
    const modeView = getViewMode();

    if (payload.action === "Start") return;

    if (modeView.toLowerCase() === SuspensionViewType.Gallery || modeView.toLowerCase() === SuspensionViewType.Speaker)
      return;

    const firstOptionBtn = document.querySelectorAll(
      ".zmwebsdk-MuiPaper-root > .zmwebsdk-MuiToolbar-root div:nth-child(2) button",
    )[0] as HTMLButtonElement;

    if (!firstOptionBtn) return;

    firstOptionBtn.click();

    setTimeout(() => {
      document.querySelectorAll('[role="menu"] li').forEach((el) => {
        if (!el) return;

        const innerText = (el.querySelector(".zmwebsdk-MuiListItemText-root") as HTMLElement).textContent;

        if (innerText === "Gallery") {
          (el as HTMLElement).click();
        }

        const tabList = document.querySelectorAll("[role=tablist] button") as unknown as HTMLButtonElement[];

        if (tabList.length === 0) return;

        tabList.forEach((el) => {
          if (el.getAttribute("title") !== "Gallery") {
            el.style.display = "none";
          }
        });
      });
    }, 0);
  }, []);

  useEffect(() => {
    if (!client || !enabled) return;

    client.on("peer-share-state-change", peerShareStateHandler);

    const mutationObserver = new MutationObserver(() => removeOtherViewModeOnModeTabs());

    removeOtherViewModeOnModeTabs();

    if (options.container) {
      mutationObserver.observe(options.container, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      if (!client) return;

      client.off("peer-share-state-change", peerShareStateHandler);
    };
  }, [client, enabled, options.container, peerShareStateHandler]);
}
