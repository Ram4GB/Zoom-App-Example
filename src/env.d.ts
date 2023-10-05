/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_ZOOM_CLIENT_ID: string;
  readonly VITE_ZOOM_SDK_KEY: string;
  readonly VITE_ZOOM_CLIENT_SECRET: string;
  readonly VITE_ZOOM_SECRET_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
