export {};

declare global {
  interface Window {
    zoomClient: typeof EmbeddedClient;
    navigator: Navigator;
    localMediaStream: MediaStream;
  }
}
