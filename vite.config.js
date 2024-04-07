/**
 * This is the base config for vite.
 * When building, the adapter config is used which loads this file and extends it.
 */
import { defineConfig, } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import pkg from "./package.json";

const { dependencies = {}, devDependencies = {} } = pkg;

/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */
export default defineConfig(({ command, mode }) => {
  return {
    clearScreen: false,
    plugins: [
      qwikCity(),
      qwikVite({
        // fix: Error: Qwik input "src/entry.ssr.tsx" not found.
        //input: "src/entry.ssr.tsx", // default
        // https://github.com/BuilderIO/qwik/issues/6100
        // npm run build
        client: {
          input: "src/root.jsx",
        },
        // npm run dev
        ssr: {
          input: "src/entry.ssr.jsx",
        },
        dev: {
          input: "src/entry.dev.jsx",
        },
        // npm run build.preview
        preview: {
          input: "src/entry.preview.jsx",
        },
      }),
    ],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: [],
    },
    // This tells Vite how to bundle the server code.
    ssr:
      command === "build" && mode === "production"
        ? {
            // All dev dependencies should be bundled in the server build
            noExternal: Object.keys(devDependencies),
            // Anything marked as a dependency will not be bundled
            // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
            // If a dep-of-dep needs to be external, add it here
            // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
            // external: [...Object.keys(dependencies), 'bcrypt']
            external: Object.keys(dependencies),
          }
        : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
