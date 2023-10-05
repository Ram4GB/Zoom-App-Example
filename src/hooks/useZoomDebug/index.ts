import { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useEffect } from "react";

export default function useZoomDebug(client: typeof EmbeddedClient | null) {
  useEffect(() => {
    if (!client) return;

    console.log("[SPECIFICATION] SharedArrayBuffer", typeof SharedArrayBuffer === "function");
    console.log("[SPECIFICATION] isSupportVirtualBackground", client.isSupportVirtualBackground());
    console.log("[SPECIFICATION] userAgent", window.navigator.userAgent);
  }, [client]);
}
