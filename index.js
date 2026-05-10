import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const { MEMOS_URL, MEMOS_PAT, PORT = 3000 } = process.env;

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: MEMOS_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader("Authorization", `Bearer ${MEMOS_PAT}`);
      },
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
