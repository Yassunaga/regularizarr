/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the INSS calculator API (e.g. https://inss-calculator.onrender.com). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
