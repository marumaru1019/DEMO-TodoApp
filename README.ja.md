# DevOps Demo - Next.js プロジェクト

*他の言語で読む: [English](README.md)*

これは TypeScript と Tailwind CSS で構築された [Next.js](https://nextjs.org) プロジェクトで、[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) でブートストラップされています。

## 🚀 技術スタック

- **フレームワーク**: Next.js 15 with App Router
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **コード品質**: ESLint
- **パッケージマネージャー**: npm

## 🛠️ はじめに

### 前提条件
- Node.js 20.0.0以上
- npm 10.0.0以上

### インストール手順
プロジェクトのクローン後、以下のコマンドで依存パッケージをインストールします：

```bash
npm install
# または
npm ci
```

### 開発サーバー起動
以下のコマンドで開発サーバーを起動できます：

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとアプリケーションが表示されます。

`src/app/page.tsx` を編集することでページの内容を変更できます。ファイルを編集すると、ページが自動的に更新されます。

このプロジェクトは [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) を使用して、Vercel の新しいフォントファミリー [Geist](https://vercel.com/font) を自動的に最適化・読み込みします。

### テスト実行
現在、このプロジェクトにはテストスクリプトが設定されていません。テスト環境の構築が必要です。

### ビルド
本番環境用のビルドは以下のコマンドで実行できます：

```bash
npm run build
```

ビルド後、`npm start`で本番モードでアプリケーションを起動できます。

## 📁 プロジェクト構成

```
devops-demo/
├── public/           # 静的アセット
├── src/
│   ├── app/         # App Routerのページとレイアウト
│   ├── components/  # 再利用可能なコンポーネント
│   └── lib/         # ユーティリティ関数
├── .github/         # GitHub設定
└── package.json     # 依存関係とスクリプト
```

## 詳細情報

Next.js についてより詳しく学ぶには、以下のリソースをご確認ください：

- [Next.js Documentation](https://nextjs.org/docs) - Next.js の機能と API について学習
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル

[Next.js GitHub リポジトリ](https://github.com/vercel/next.js)もチェックしてみてください。フィードバックや貢献を歓迎しています！

## Vercel でのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の作成者による [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細については、[Next.js デプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)をご確認ください。