import { useCallback } from "react";
import debounce from "../utils/debounce";
import waitForElement from "../utils/wait-for-element";

const useAutoTurnVideoOn = () => {
  const handler = useCallback((meetingSDKElement: HTMLElement) => {
    const clickVideoBtnDebounce = debounce(async () => {
      const videoBtn = await waitForElement('[title="Start Video"]');

      if (!videoBtn) return;

      (videoBtn as HTMLButtonElement).click();
      videoObserver.disconnect();
    }, 100);

    const videoObserver = new MutationObserver(clickVideoBtnDebounce);

    videoObserver.observe(meetingSDKElement, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }, []);

  return {
    handler,
  };
};

export default useAutoTurnVideoOn;
