import { EmbeddedClient } from "@zoomus/websdk/embedded";
import { useCallback } from "react";

export default function useZoom(client: typeof EmbeddedClient | null) {
  const muteSelf = useCallback(() => {
    const curUser = client?.getCurrentUser();
    client?.mute(true, curUser?.userId);
  }, [client]);

  const unmuteSelf = useCallback(() => {
    const curUser = client?.getCurrentUser();
    client?.mute(false, curUser?.userId);
  }, [client]);

  const getMuteStatus = useCallback(() => {
    const curUser = client?.getCurrentUser();

    if (typeof curUser?.muted === "undefined") return "User does not join audio";

    if (curUser.muted) return "audio is muted";

    return "audio is unmuted";
  }, [client]);

  const getCurrentUser = useCallback(() => {
    const curUser = client?.getCurrentUser();

    return curUser;
  }, [client]);

  const endMeeting = useCallback(() => {
    if (!client) return;

    return client.endMeeting();
  }, [client]);

  const rename = useCallback(
    (newName: string, userId: number) => {
      if (!client) return;

      return client.rename(newName, userId);
    },
    [client],
  );

  return {
    muteSelf,
    unmuteSelf,
    getMuteStatus,
    getCurrentUser,
    endMeeting,
    rename,
  };
}
