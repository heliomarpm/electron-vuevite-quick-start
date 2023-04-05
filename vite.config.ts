import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import { rmSync } from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('build/electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    server: {
      port: 3678
    },
    build: {
      outDir: 'build/app',
      emptyOutDir: true,
    },
    plugins: [
      vue(),
      electron([
        {
          entry: 'electron/main.ts',
          onstart(options) {
            process.env.VSCODE_DEBUG
              ? console.log(/* For `.vscode/.debug.script.mjs` */"[startup] Electron App")
              : options.startup();
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'build/electron',
              rollupOptions: {
                //external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        {
          entry: 'electron/preload.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
            // instead of restarting the entire Electron App.
            options.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'build/electron',
              rollupOptions: {
                // external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        }
      ])
    ],
    clearScreen: true,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/styles/variables.scss";'
        }
      }
    }
  }
})
