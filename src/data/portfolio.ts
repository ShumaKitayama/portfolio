export const personalInfo = {
  name: "北山秀磨",
  nameEn: "Kitayama Shuma",
  age: 20,
  location: "徳島",
  title: "エンジニア",
  motto: "明日は明日の風が吹く",
  description:
    "徳島生まれ徳島育ち、阿南高専でプログラミングや情報通信などを学んでいます。学外活動もいろいろやってます。",
};

export const timeline = [
  { date: "2005 年 4 月", event: "徳島で産声をあげる。" },
  { date: "2021 年 4 月〜", event: "阿南工業高等専門学校 創造技術工学科 入学" },
  { date: "2022 年 4 月〜", event: "情報コースに配属、プログラミングを本格的に学び始める。" },
  {
    date: "2024 年 8 月〜9 月",
    event: "【インターン】サイファーテック株式会社",
    description: "初めての企業実務。日報週報の重要性、モダン言語の使い方を学ぶ。初チーム開発。",
  },
  { date: "2024 年 12 月〜2025 年 2 月", event: "【業務委託】株式会社GoFerにてシステム開発受託" },
  {
    date: "2025 年 3 月",
    event: "【インターン】サイファーテック株式会社",
    description: "Python & TypeScript でのフルスタック開発。API 開発に本格的に取り組む。",
  },
  {
    date: "2025 年 3 月〜6 月",
    event: "【インターン】合同会社 Towhy",
    description:
      "決済サービスの利用登録フォームのリファクタ・機能追加。AI 開発と自動テスト（Playwright）を経験。",
  },
  {
    date: "2025 年 9 月〜現在",
    event: "【インターン】株式会社ドワンゴ",
    description:
      "Golang・Gin を使用し、社内ツールの新機能開発を担当。要件定義〜設計〜実装まで一貫して担当。",
  },
];

export const skills = {
  level1: ["Node.js", "Express", "nginx", "Cloud Run", "AWS EC2", "Cloudflare"],
  level2: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "PostgreSQL",
    "Compute Engine",
    "C言語",
    "Redis",
    "Git",
    "GitHub",
    "Supabase",
  ],
  level3: ["Golang", "Gin", "Docker", "MongoDB", "Java", "Spring Boot 3"],
};

export const certifications = [
  "サーティファイ Java(TM)プログラミング能力認定試験 2 級",
  "サーティファイ C 言語プログラミング能力認定試験 2 級",
];

export const achievements = [
  {
    year: "2024 年",
    title: "全国高等専門学校プログラミングコンテスト 課題部門 敢闘賞",
    project: "節電だヨ！教室集合",
  },
];

export const works = [
  {
    title: "Juice 学園 ポータルサイト",
    tech: ["TypeScript", "React", "Go", "Gin", "MongoDB", "Cloudflare", "Docker"],
    description:
      "大学の友人からの依頼で学内ドリンクバーサービスのポータルサイトを開発。サブスク決済実装に苦労し、Stripe との安全な連携を実現。「Stripe 上にユーザー作成 → フロントから直接カード登録 → バックエンドで紐付け」という安全なフローで対応。2025 年 12 月より学内運用予定。Cloudflare 設定調整中。",
    status: "運用中 (Demo)",
    url: "https://juiceacademydemo.win",
  },
  {
    title: "ぼきゃぶらりんぐ",
    tech: ["TypeScript", "React", "Supabase", "Vercel"],
    description:
      "英単語超自動生成アプリ。画像を Gemini 2.0 Flash に送信し、単語データを自動生成・保存・学習できる。復習・除外学習・履歴管理など暗記カード機能をフル搭載。無料で利用可能。",
    url: "https://ring-vocabulary.vercel.app",
    status: "公開中",
  },
  {
    title: "音声アシスタント Kikasete",
    tech: ["TypeScript", "React", "Express", "Vercel"],
    description:
      "地元飲食店向けに開発した多言語対応の対話型 AI アシスタント。Gemini 2.0 Flash を使用し、メニュー認識・リアルタイム音声再生・字幕表示に対応。実店舗導入済み。",
    url: "https://kikasete-public.vercel.app",
    status: "実店舗導入済み",
  },
  {
    title: "Report Maker",
    tech: ["TypeScript", "React", "Go", "Gin", "PostgreSQL", "Docker"],
    description: "開発中。AI で日報・週報を自動生成・整理するシステムを構築予定。",
    status: "開発中",
  },
];

export const socialLinks = {
  twitter: "https://x.com/2005_helloworld",
  instagram: "https://www.instagram.com/kittyan_0411",
  github: "https://github.com/Shumakitayama",
  qiita: "https://qiita.com/baningugozira",
};
