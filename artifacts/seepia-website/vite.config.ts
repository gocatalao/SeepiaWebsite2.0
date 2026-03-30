import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

const GAME_BASE = "https://extranet.seepia.com/showcase";

const MUTE_SCRIPT = `<script>
(function(){
  var Orig = window.AudioContext || window.webkitAudioContext;
  if(Orig){
    var Muted = function(opts){
      var ctx = new Orig(opts);
      var g = ctx.createGain();
      g.gain.value = 0;
      g.connect(ctx.destination);
      Object.defineProperty(ctx,'destination',{get:function(){return g;}});
      return ctx;
    };
    Muted.prototype = Orig.prototype;
    window.AudioContext = window.webkitAudioContext = Muted;
  }
  var origPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function(){
    this.muted = true;
    this.volume = 0;
    return origPlay ? origPlay.apply(this,arguments) : Promise.resolve();
  };
})();
</script>`;

function gameMuteProxy(): import("vite").Plugin {
  return {
    name: "game-mute-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? "";
        const match = url.match(/\/game-proxy\/([^?#]+)/);
        if (!match) return next();

        const gamePath = match[1];
        const upstreamUrl = `${GAME_BASE}/${gamePath}`;

        try {
          const upstream = await fetch(upstreamUrl);
          const contentType = upstream.headers.get("content-type") ?? "";

          if (contentType.includes("text/html")) {
            let html = await upstream.text();
            html = html.replace(/<head>/i, `<head>${MUTE_SCRIPT}`);
            if (!html.includes(MUTE_SCRIPT)) {
              html = MUTE_SCRIPT + html;
            }
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(html);
          } else {
            const buf = await upstream.arrayBuffer();
            res.setHeader("Content-Type", contentType || "application/octet-stream");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(Buffer.from(buf));
          }
        } catch (err) {
          console.error("[game-mute-proxy] fetch error:", err);
          res.statusCode = 502;
          res.end("Proxy error");
        }
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    gameMuteProxy(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom", "framer-motion"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
