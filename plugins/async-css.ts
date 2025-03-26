import type { Plugin } from "vite";

export default function asyncCSSLoader(): Plugin {
  return {
    name: "async-css-loader",
    enforce: "post",

    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (
          file.type === "asset" &&
          file.fileName.endsWith(".html") &&
          typeof file.source === "string"
        ) {
          file.source = file.source.replace(
            /<link\s+rel="stylesheet"([^>]+href="[^"]+\.css"[^>]*)>/g,
            (_, attrs) => `
<link rel="preload" as="style"${attrs} onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet"${attrs}></noscript>`
          );
        }
      }
    },
  };
}
