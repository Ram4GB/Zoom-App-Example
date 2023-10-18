export {};

import { EmbeddedClient } from "@zoomus/websdk/embedded";

declare global {
  interface Window {
    zoomClient: typeof EmbeddedClient | null;
    navigator: Navigator;
    localMediaStream: MediaStream;
  }
}
