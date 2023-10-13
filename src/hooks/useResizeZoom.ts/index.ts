import { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useEffect, useMemo } from "react";
import debounce from "../../utils/debounce";

const HEIGHT = 500;

export default function useResizeZoom(
  client: typeof EmbeddedClient | null,
  options: {
    container?: HTMLElement;
    zoomAppId: string;
    fitWidth: number;
  },
) {
  const updateZoomSize = useMemo(
    () =>
      debounce((width: number) => {
        client?.updateVideoOptions({
          viewSizes: {
            default: {
              width,
              height: HEIGHT,
            },
          },
        });
      }),
    [client],
  );

  useEffect(() => {
    const zoomAppEl = document.getElementById(options.zoomAppId);

    if (!client || !zoomAppEl || !options.container) return;

    const resizeObserver = new ResizeObserver(function () {
      if (!zoomAppEl) return;

      updateZoomSize(options.fitWidth);
    });

    resizeObserver.observe(zoomAppEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [client, options.container, options.zoomAppId, options.fitWidth, updateZoomSize]);
}
