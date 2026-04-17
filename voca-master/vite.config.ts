import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite設定ファイル: React + TypeScriptプロジェクト用
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 開発サーバーのポート番号
    proxy: {
      // ローカル開発時: /api/* へのリクエストをjson-serverに転送
      // Dockerの場合はnginxがこの役割を担う
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
