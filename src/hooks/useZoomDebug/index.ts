import { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useEffect } from "react";

export default function useZoomDebug(client: typeof EmbeddedClient | null) {
  useEffect(() => {
    if (!client) return;

    console.log("[SPECIFICATION] SharedArrayBuffer", typeof SharedArrayBuffer === "function");
    console.log("[SPECIFICATION] isSupportVirtualBackground", client.isSupportVirtualBackground());
    console.log("[SPECIFICATION] userAgent", window.navigator.userAgent);
    console.log("[SPECIFICATION] current user", client.getCurrentUser());

    const userAddedHandler = (payload: unknown) => {
      console.log("userAddedHandler", payload);
    };

    client.on("user-added", userAddedHandler);

    const userUpdatedHandler = (payload: [{ bInFailover?: boolean; userId: string }]) => {
      console.log("userUpdatedHandler", payload);
      if (payload[0].bInFailover) {
        console.log("userId fail over", payload[0].userId);
      }
    };

    client.on("user-updated", userUpdatedHandler as any);

    const userRemovedHandler = (payload: unknown) => {
      console.log("userRemovedHandler", payload);
    };

    client.on("user-removed", userRemovedHandler);

    const connectionChangeHandler = (payload: unknown) => {
      console.log("connectionChangeHandler", payload);
    };

    client.on("connection-change", connectionChangeHandler);

    return () => {
      client.off("user-added", userAddedHandler);
      client.off("user-updated", userUpdatedHandler);
      client.off("user-removed", userRemovedHandler);
      client.off("connection-change", connectionChangeHandler);
    };
  }, [client]);
}
