# memos-mcp-proxy

[Memos](https://www.usememos.com/) へのリクエストに対して、Personal Access Token (PAT) による認証ヘッダーを自動付与するリバースプロキシサーバーです。

[claude.ai](https://claude.ai) のリモート MCP 設定では PAT 認証がサポートされていないため、Memos を直接リモート MCP として登録することができません。このプロキシを経由することで、PAT 認証を透過的に処理し、claude.ai から Memos を MCP サーバーとして利用できるようになります。

## 仕組み

```
クライアント → memos-mcp-proxy (ポート 3000) → Memos サーバー
                   ↑
       Authorization: Bearer <MEMOS_PAT> を自動付与
```

## 必要要件

- Node.js

## セットアップ

```bash
npm install
```

## 環境変数

| 変数名      | 必須 | 説明                                       | デフォルト |
| ----------- | ---- | ------------------------------------------ | ---------- |
| `MEMOS_URL` | ✓    | 転送先の Memos サーバー URL                | -          |
| `MEMOS_PAT` | ✓    | Memos の Personal Access Token             | -          |
| `PORT`      |      | プロキシが待ち受けるポート番号             | `3000`     |

## 起動

```bash
MEMOS_URL=https://your-memos-instance.example.com \
MEMOS_PAT=your_personal_access_token \
npm start
```

起動後、`http://localhost:3000` へのリクエストがすべて Memos サーバーへ転送されます。

## claude.ai でのリモート MCP 設定

1. このプロキシをインターネットからアクセス可能なサーバーにデプロイします
2. claude.ai の Settings → Integrations → Add Integration からリモート MCP を追加します
3. URL にプロキシのエンドポイントを指定します

```
https://your-proxy-server.example.com/mcp
```

claude.ai 側では認証設定は不要です。PAT はプロキシ側の環境変数で管理します。
