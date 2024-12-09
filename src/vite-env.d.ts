/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENCRYPT_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
