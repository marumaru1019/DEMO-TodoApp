# DevOps Demo - Next.js Project

This is a [Next.js](https://nextjs.org) project built with TypeScript and Tailwind CSS, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Quality**: ESLint
- **Package Manager**: npm

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🇯🇵 はじめに

### 前提条件
- Node.js 18.17.0以上
- npm 10.2.3以上

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
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとアプリケーションが表示されます。

### テスト実行
以下のコマンドでテストを実行できます：

```bash
npm test
```

### ビルド
本番環境用のビルドは以下のコマンドで実行できます：

```bash
npm run build
```

ビルド後、`npm start`で本番モードでアプリケーションを起動できます。

### プロジェクト構成
```
devops-demo/
├── public/           # 静的アセット
├── src/
│   ├── app/         # Appルーターのページとレイアウト
│   ├── components/  # 再利用可能なコンポーネント
│   └── lib/         # ユーティリティ関数
├── .github/         # GitHub設定
└── package.json     # 依存関係とスクリプト
```

## 📁 Project Structure

```
devops-demo/
├── public/           # Static assets
├── src/
│   ├── app/         # App Router pages and layouts
│   ├── components/  # Reusable components
│   └── lib/         # Utility functions
├── .github/         # GitHub configurations
└── package.json     # Dependencies and scripts
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
