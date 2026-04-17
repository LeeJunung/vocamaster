# -----------------------------------------------
# ステージ1: ビルドステージ
# Node.js 22を使用してViteプロジェクトをビルドする
# -----------------------------------------------
FROM node:22-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のインストール（package.jsonのみ先にコピーしてキャッシュを活用）
COPY package.json ./
RUN npm install

# ソースコードをコピーしてビルド実行
COPY . .
RUN npm run build

# -----------------------------------------------
# ステージ2: 本番ステージ
# nginxを使用してビルド済みの静的ファイルをホスティングする
# -----------------------------------------------
FROM nginx:1.25-alpine

# ビルド済みの静的ファイルをnginxのホスティングディレクトリにコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ポート80を公開
EXPOSE 80

# nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
