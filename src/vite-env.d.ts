/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
  readonly VITE_GROQ_MODEL: string;
  readonly VITE_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
