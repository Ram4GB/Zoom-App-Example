import { useCallback, useRef } from "react";
import debounce from "../utils/debounce";
import waitForElement from "../utils/wait-for-element";

const useAutoTurnVideoOn = () => {
  const videoObserver = useRef<MutationObserver>();

  const handler = useCallback((meetingSDKElement: HTMLElement) => {
    const clickVideoBtnDebounce = debounce(async () => {
      const videoBtn = await waitForElement('[title="Start Video"]');

      if (!videoBtn) return;

      (videoBtn as HTMLButtonElement).click();
      if (videoObserver.current) videoObserver.current.disconnect();
    }, 100);

    videoObserver.current = new MutationObserver(clickVideoBtnDebounce);

    videoObserver.current.observe(meetingSDKElement, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }, []);

  const disconnect = () => {
    videoObserver.current?.disconnect();
  };

  return {
    handler,
    disconnect,
  };
};

export default useAutoTurnVideoOn;
