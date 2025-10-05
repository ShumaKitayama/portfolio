# Kitayama Lab - Portfolio

北山秀磨のポートフォリオサイトです。

## 🚀 技術スタック

- **Next.js 14** - React フレームワーク（App Router）
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS
- **React Icons** - アイコンライブラリ

## 📦 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 3. 本番ビルド（静的エクスポート）

```bash
npm run build
```

静的ファイルが `out/` ディレクトリに生成されます。

## 📝 コンテンツの更新方法

### 基本情報の更新

`src/data/portfolio.ts` ファイルを編集してください。

```typescript
// 個人情報
export const personalInfo = {
  name: "北山秀磨",
  age: 20,
  location: "徳島",
  // ...
};

// 経歴の追加
export const timeline = [
  { date: "2025 年 10 月", event: "新しいイベント" },
  // ...
];

// スキルの追加
export const skills = {
  level3: ["Golang", "Gin", ...],
  // ...
};

// 制作物の追加
export const works = [
  {
    title: "新しいプロジェクト",
    tech: ["React", "TypeScript"],
    description: "説明文",
    url: "https://example.com",
    status: "公開中",
  },
  // ...
];
```

### スタイルのカスタマイズ

- **グローバルスタイル**: `src/app/globals.css`
- **Tailwind設定**: `tailwind.config.ts`
- **カラーテーマ**: `tailwind.config.ts` の `colors` セクション

## 🎨 デザインの特徴

- **ダークモード**: モダンなダークテーマ
- **グラスモーフィズム**: 半透明のガラス風エフェクト
- **グラデーション**: 美しいカラーグラデーション
- **アニメーション**: スムーズなフェードイン・スライドアップ効果
- **レスポンシブ**: モバイルからデスクトップまで対応

## 📁 ディレクトリ構造

```
portfolio/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # ルートレイアウト
│   │   ├── page.tsx          # トップページ
│   │   └── globals.css       # グローバルスタイル
│   ├── components/           # Reactコンポーネント
│   │   ├── Hero.tsx          # ヒーローセクション
│   │   ├── About.tsx         # 自己紹介セクション
│   │   ├── Profile.tsx       # 経歴セクション
│   │   ├── Skills.tsx        # スキルセクション
│   │   ├── Works.tsx         # 制作物セクション
│   │   ├── Contact.tsx       # 連絡先セクション
│   │   └── Navigation.tsx    # ナビゲーション
│   └── data/
│       └── portfolio.ts      # ポートフォリオデータ
├── public/                   # 静的ファイル
├── next.config.mjs           # Next.js設定
├── tailwind.config.ts        # Tailwind CSS設定
├── tsconfig.json             # TypeScript設定
└── package.json              # 依存関係
```

## 🚀 デプロイ

### Vercel（推奨）

1. Vercel アカウントを作成
2. GitHub リポジトリを接続
3. 自動的にデプロイされます

### Netlify

1. `npm run build` を実行
2. `out/` ディレクトリをアップロード

### GitHub Pages

1. `npm run build` を実行
2. `out/` ディレクトリの内容を `gh-pages` ブランチにプッシュ

## 📄 ライセンス

© 2025 Kitayama Shuma. All rights reserved.

## 🤝 お問い合わせ

- **X (Twitter)**: [@2005_helloworld](https://x.com/2005_helloworld)
- **GitHub**: [@Shumakitayama](https://github.com/Shumakitayama)
- **Instagram**: [@kittyan_0411](https://www.instagram.com/kittyan_0411)
- **Qiita**: [@baningugozira](https://qiita.com/baningugozira)

