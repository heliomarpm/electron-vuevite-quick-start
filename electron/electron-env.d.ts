/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    BUILD_APP: string
    /** /dist/ or /public/ */
    PUBLIC: string
  }
}
