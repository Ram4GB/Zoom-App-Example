export {};

declare global {
  interface Window {
    zoomClient: typeof EmbeddedClient;
  }
}
