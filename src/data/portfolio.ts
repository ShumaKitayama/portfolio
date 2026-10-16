export const personalInfo = {
  name: "北山秀磨",
  nameEn: "Kitayama Shuma",
  age: 21,
  location: "徳島",
  title: "エンジニア",
  motto: "明日は明日の風が吹く",
  description:
    "徳島生まれ徳島育ち、阿南高専でプログラミングや情報通信などを学んでいます。学外活動もいろいろやってます。",
};

export type RoleSection = { heading?: string; items: string[] };

export type Role = {
  title: string;
  team?: string;
  type: string;
  period: string;
  summary?: string;
  sections?: RoleSection[];
};

export type Career = {
  company: string;
  period: string;
  current?: boolean;
  roles: Role[];
  tech?: string[];
};

// 新しい順
export const careers: Career[] = [
  {
    company: "株式会社ZOZO",
    period: "2026 年 5 月〜現在",
    current: true,
    roles: [
      {
        title: "サービス信頼性エンジニア（SRE）",
        team: "SRE ブロック",
        type: "アルバイト",
        period: "2026 年 5 月〜現在",
        summary:
          "複数の既存サービスおよび新規サービスを対象に、AWS インフラの設計・構築、CI/CD パイプラインの整備、セキュリティ強化、データベースの性能改善、障害原因調査を担当。IaC による環境構築からリリース自動化、性能検証、本番環境の運用改善まで幅広く従事。",
        sections: [
          {
            heading: "AWS インフラ設計・構築",
            items: [
              "新規サービスの DB 選定で負荷特性・接続数・運用負荷・拡張性を比較検討し、Aurora MySQL Serverless v2 と RDS Proxy を第一候補とする技術選定資料（ADR）を作成",
              "CloudFormation で開発・ステージング・本番環境向けの AWS 基盤をコード化",
              "GitHub Actions と AWS 間の OIDC 認証に対応した IAM ロールを設計・構築",
              "S3 バケットの暗号化・バージョニング・公開アクセス制限などを設定し、セキュリティと運用性を考慮した構成を整備",
            ],
          },
          {
            heading: "CI/CD・デプロイ基盤の構築",
            items: [
              "GitHub Actions と AWS CodeDeploy で、4 つの CodeDeploy Application・計 7 つの Lambda 関数を対象とするデプロイ基盤を構築",
              "CloudWatch アラームと連携した自動ロールバック機構を実装し、デプロイ失敗時の影響を抑制",
              "IAM ポリシーを設計し、アプリケーション開発側が操作できるリソースを必要最小限に制限",
              "GitHub Actions の matrix 構成で、Go アプリのビルド・S3 への成果物保存・Lambda への並列デプロイを自動化",
              "複数リポジトリの GitHub Actions を更新し、非推奨 Actions への対応や依存バージョンの固定を実施",
              "Go 製 SRE ツール向けに GitHub Copilot のコードレビュー指針や設定検証スクリプトを整備し、レビュー品質を標準化",
            ],
          },
          {
            heading: "セキュリティ強化・本番運用改善",
            items: [
              "AWS Athena で約 3,965 万件の本番アクセスログを分析し、TLS 1.0／1.1 無効化による既存クライアントへの影響を調査",
              "CloudFormation で ALB のセキュリティポリシーを変更し、TLS 1.2 以上への移行を推進",
              "検証環境での事前確認・切り戻し手順の準備・本番反映・事後監視までを実施",
              "本番反映後約 13 日間の監視で、外形監視アラート 0 件・CloudFront 502 エラー率 0%・ALB 5xx エラー 0 件を確認",
            ],
          },
          {
            heading: "データベース性能改善・負荷試験",
            items: [
              "Datadog DBM と SQL 実行計画で、約 6,350 万行を読み込む在庫検索 SQL のボトルネックを調査",
              "約 1.27 億行の合成データで性能検証し、複数の改善案を比較した上で複合インデックスを設計・実装",
              "SQL 条件の追加とインデックス最適化により、ステージングでの SQL 実行時間を約 27 分 46 秒から約 34〜51 秒へ短縮",
              "k6 と Amazon SQS で発注処理を対象とした段階的な負荷試験シナリオを実装し、再現性のある負荷試験基盤を構築",
            ],
          },
          {
            heading: "障害調査・開発基盤の改善",
            items: [
              "DB マイグレーション時に CI が失敗判定となる事象を、ECS・Flyway・GitHub Actions のログから横断的に調査",
              "GuardDuty の追加コンテナによる終了コードの誤判定と、待機時間の上限超過という複数の原因を特定",
              "調査結果・影響範囲・修正方針を Issue に整理し、修正担当者へ引き継ぎ",
            ],
          },
        ],
      },
    ],
    tech: [
      "AWS",
      "Lambda",
      "CodeDeploy",
      "CloudFormation",
      "IAM",
      "S3",
      "CloudWatch",
      "ALB",
      "SQS",
      "Athena",
      "ECS",
      "RDS",
      "GitHub Actions",
      "Datadog",
      "MySQL",
      "Flyway",
      "k6",
      "Go",
      "SQL",
      "Shell",
    ],
  },
  {
    company: "サイファー・テック株式会社",
    period: "2024 年 8 月〜2026 年 3 月",
    roles: [
      {
        title: "セキュリティエンジニア",
        team: "セキュリティ診断",
        type: "インターン",
        period: "2026 年 3 月",
        summary:
          "Burp Suite を用いて自社アプリの脆弱性診断を担当。タスク管理ツール上の診断項目を 1 件ずつ検証し、診断レポートの提出から改善方法の提案まで行った。",
        sections: [
          {
            items: [
              "「自力で診断 → レポート作成 → 上長の確認」のサイクルで診断を実施",
              "問題がある場合は改善方法の提案までをレポートにまとめた",
            ],
          },
        ],
      },
      {
        title: "バックエンドエンジニア",
        team: "プロダクト開発チーム",
        type: "インターン",
        period: "2025 年 3 月",
        summary:
          "Python と AWS Lambda を用いて AWS 利用料金の自動通知機能を開発。DynamoDB との連携や Slack Webhook を扱い、イベント駆動で動く小さなバックエンドを構築した。",
        sections: [
          {
            items: [
              "Python（Flask）での API 実装と DB マイグレーションを担当",
              "設計書を読み解き、API の振る舞いとデータモデルの整合性を確保",
              "OJT 担当の社員とペアで開発し、上長の承認を得て merge まで実施",
            ],
          },
        ],
      },
      {
        title: "フロントエンドエンジニア",
        team: "プロダクト開発チーム",
        type: "インターン",
        period: "2024 年 8 月〜9 月",
        summary:
          "TypeScript と React を用いたフロントエンド開発。レスポンシブ対応やデータテーブルからの抽出・集計表示など、UI 改善と新規機能の実装を担当した。初めての企業実務・チーム開発。",
        sections: [
          {
            items: [
              "OJT 担当の社員とペアプロ形式で開発に参加",
              "実装完了後は上長の承認を得て merge まで実施",
            ],
          },
        ],
      },
    ],
    tech: ["TypeScript", "React", "Python", "Flask", "AWS Lambda", "DynamoDB", "Slack API", "Burp Suite"],
  },
  {
    company: "株式会社ドワンゴ",
    period: "2025 年 9 月〜12 月",
    roles: [
      {
        title: "バックエンドエンジニア・システムエンジニア",
        team: "ニコニコ開発部",
        type: "インターン",
        period: "2025 年 9 月〜12 月",
        summary:
          "Go（Gin）を用いて、ニコニコの「お知らせBOX」を管理する社内ツールの新規機能開発を担当。要件に基づくシステム設計から DB 設計、実装、テスト、本番環境へのデプロイまで一連の工程に従事。",
        sections: [
          {
            heading: "システム設計・データベース設計",
            items: [
              "運用チームの要件をもとに、新規機能のシステムフロー・状態遷移・DB 構造を設計",
              "ER 図の作成や新規テーブル設計を通じて、既存システムとの整合性を考慮したデータモデルを構築",
              "Jira 上で設計資料を作成し、メンターやチームとのレビューを重ねて仕様を具体化",
              "状態ごとのデータ更新処理や保持条件を明確化し、データのライフサイクルを考慮した設計を実施",
            ],
          },
          {
            heading: "バックエンド開発・状態管理の実装",
            items: [
              "Go で「テスト送信・本番予約・取り消し」など、複数の状態遷移を伴う新規機能を実装",
              "状態変更時に送信対象件数が不整合を起こす問題に対し、データの確定タイミングと更新責務を見直し",
              "テスト送信時に送信対象件数を確定・保存し、本番予約時には確定値を再利用する仕組みを実装",
              "予約取り消し時は必要な確定情報を保持しつつ履歴を削除し、状態遷移に伴うデータの整合性を確保",
            ],
          },
          {
            heading: "アーキテクチャ・コード品質の改善",
            items: [
              "クリーンアーキテクチャに基づき、ユースケース層・ドメイン層・インフラ層の責務と依存関係を考慮して実装",
              "既存コードの構造や設計意図を調査し、既存アーキテクチャとの一貫性を維持した機能追加を実施",
              "社内コーディング規約に準拠し、命名・責務の分離・副作用の明確化を意識した実装を推進",
            ],
          },
          {
            heading: "テスト・本番リリース",
            items: [
              "状態遷移やデータ更新処理の動作確認およびテストを実施",
              "設計レビューから実装・テストまでの工程を経て、新規機能の本番デプロイを完了",
            ],
          },
        ],
      },
    ],
    tech: ["Go", "Gin", "クリーンアーキテクチャ", "Jira"],
  },
  {
    company: "合同会社Towhy",
    period: "2025 年 3 月〜6 月",
    roles: [
      {
        title: "フロントエンド・バックエンドエンジニア",
        team: "プロダクト開発チーム",
        type: "アルバイト",
        period: "2025 年 5 月〜6 月",
        summary: "既存システムの改善・リファクタリングを担当。",
        sections: [
          {
            items: [
              "API レスポンス構造の整理やデータ受け渡し処理の修正により、フロントとバックエンド間の整合性を改善",
              "郵便番号・銀行口座種別などのデータ不整合、バリデーション不足、例外処理の不備を修正",
              "データ更新処理の不具合や UI の重複表示、同時編集時の問題を修正し、既存機能の安定性を向上",
              "影響範囲を調査しながら段階的にリファクタリングし、可読性・保守性を改善",
              "変更単位を小さく分割し、Pull Request でのレビューや差分確認を容易にして安全な改修を推進",
            ],
          },
        ],
      },
      {
        title: "バックエンド・QA エンジニア",
        team: "プロダクト開発",
        type: "アルバイト",
        period: "2025 年 4 月〜5 月",
        summary: "Playwright による E2E テストの新規実装と既存テストの改修を担当。",
        sections: [
          {
            heading: "テスト自動化",
            items: [
              "Playwright で E2E テストを新規実装・改修し、合計約 20 件のテストシナリオを構築・改善",
              "既存テストや仕様を調査し、ユーザー操作・前提条件・期待結果を整理してテストケースを設計",
              "表示状態や通信完了に基づく待機処理と適切なアサーションで、テストの安定性と再現性を向上",
              "Claude Code でのテストコード生成とプロンプト改善を行い、生成コードの検証を通じて実装を効率化",
              "共通処理の整理や記述ルールの統一により、テストコードの可読性・保守性を改善",
            ],
          },
        ],
      },
      {
        title: "フロントエンド・バックエンドエンジニア",
        team: "プロダクト開発チーム",
        type: "アルバイト",
        period: "2025 年 3 月〜4 月",
        summary: "自社決済サービスの機能開発を担当。",
        sections: [
          {
            items: [
              "ユーザー情報編集フォームの新規開発と関連 API の設計・実装",
              "Worldpay との決済連携機能の追加",
              "既存コードと DB 構造を調査し、データフローや API の入出力仕様を整理した上で実装",
              "フロントとバックエンド間のデータ不整合や、更新内容が画面に反映されない問題を調査・修正",
            ],
          },
        ],
      },
    ],
    tech: ["TypeScript", "Playwright", "Worldpay", "Claude Code"],
  },
  {
    company: "株式会社GoFer",
    period: "2024 年 12 月〜2025 年 2 月",
    roles: [
      {
        title: "システム開発",
        type: "業務委託",
        period: "2024 年 12 月〜2025 年 2 月",
        summary: "システム開発を受託。",
      },
    ],
  },
];

export const education = [
  { date: "2005 年 4 月", event: "徳島で産声をあげる。" },
  { date: "2021 年 4 月", event: "阿南工業高等専門学校 創造技術工学科 入学" },
  { date: "2022 年 4 月", event: "情報コースに配属、プログラミングを本格的に学び始める。" },
  { date: "現在", event: "平山研究室にて、マルチエージェント深層 Q 学習の研究に取り組む。" },
];

export const research = {
  cover: { title: "MADQN", bg: "#111111", fg: "#3dff7a", pattern: "rings" } as Cover,
  title: "マルチエージェント深層 Q 学習による原子配置の自律的な安定構造の探索",
  lab: "阿南高専 平山研究室・卒業研究",
  status: "研究中",
  background:
    "表面の原子配置は実験だけでは決まらず、「実験で周期性を測る → 人がモデルを組む → 第一原理計算で安定性を確かめる」という往復を繰り返して決められている。この候補構造の検討を DQN による探索に置き換え、精密測定の前に「このあたりに必ずある」と言えるレベルまで安定構造の候補を絞り込むことを目指している。",
  steps: [
    {
      label: "STEP 1",
      title: "Lennard-Jones 粒子系で手法を確立",
      status: "完了",
      items: [
        "粒子 1 個につき DQN を 1 つ持たせる独立型マルチエージェント DQN を実装（Double DQN 形式のターゲット・Replay Buffer）",
        "力の式は与えず、報酬は「エネルギーが下がれば＋、衝突すれば−」のみ",
        "1 次元 2 粒子から 3 次元 4 粒子まで段階的に拡張し、分子動力学（MD）・理論値と比較",
        "学習済み方策は、初期配置を 1.5 倍に拡大・平行移動しても再学習なしで正四面体に到達",
      ],
    },
    {
      label: "STEP 2",
      title: "第一原理計算で Si(111) 表面を探索",
      status: "進行中",
      items: [
        "第一原理計算（xTAPP）で Si(111) 表面を自動で積み上げ・構造緩和するパイプラインを構築",
        "cutoff・k 点の収束試験を行い、軽い計算条件でも構造の順位が崩れないことを確認（計算量 4〜8 分の 1）",
        "全エネルギーを報酬とし、評価回数を抑える報酬設計を決定。DQN との接続を実装中",
      ],
    },
  ],
  metrics: [
    { value: "0.48%", label: "エネルギー誤差", note: "3 次元 4 粒子（正四面体）" },
    { value: "52", label: "到達ステップ数", note: "MD は約 7,000 ステップ" },
    { value: "4〜8×", label: "計算の軽量化", note: "Si(111) 候補構造の順位付け" },
  ],
  tech: ["Python", "PyTorch", "NumPy", "matplotlib", "xTAPP", "MPI / OpenMP"],
};

export type Skill = {
  name: string;
  // 1〜10 のメーター表示（10 が最大）
  level: number;
  // どこで使ったか
  used?: string;
};

export type SkillGroup = { channel: string; label: string; items: Skill[] };

// 職歴・制作物での使用実績をもとにしたスキル
export const skillGroups: SkillGroup[] = [
  {
    channel: "CH.1",
    label: "言語",
    items: [
      { name: "Go", level: 9, used: "ドワンゴ・ZOZO・Juice 学園・InterviewHack" },
      { name: "TypeScript", level: 9, used: "サイファー・テック・Towhy・HADAL ほか多数" },
      { name: "Python", level: 7, used: "サイファー・テック・研究・BuildUp" },
      { name: "SQL", level: 7, used: "ZOZO（性能改善）・ドワンゴ" },
      { name: "Java", level: 5, used: "資格・Spring Boot" },
      { name: "Shell", level: 4, used: "ZOZO" },
      { name: "C", level: 3, used: "資格" },
    ],
  },
  {
    channel: "CH.2",
    label: "フロントエンド",
    items: [
      { name: "React", level: 9, used: "サイファー・テック・Towhy・制作物多数" },
      { name: "Tailwind CSS", level: 6, used: "Juice 学園・InterviewHack・このサイト" },
      { name: "Next.js", level: 5, used: "このサイト" },
      { name: "Three.js", level: 5, used: "Project HADAL" },
      { name: "React Native / Expo", level: 3, used: "Ren-Kei" },
    ],
  },
  {
    channel: "CH.3",
    label: "バックエンド",
    items: [
      { name: "Gin", level: 9, used: "ドワンゴ・Juice 学園・動画共有システム" },
      { name: "クリーンアーキテクチャ / DDD", level: 7, used: "ドワンゴ・InterviewHack" },
      { name: "FastAPI", level: 5, used: "BuildUp" },
      { name: "Flask", level: 4, used: "サイファー・テック" },
      { name: "Express", level: 4, used: "Kikasete" },
      { name: "Spring Boot", level: 4, used: "個人学習" },
    ],
  },
  {
    channel: "CH.4",
    label: "インフラ・SRE",
    items: [
      { name: "AWS", level: 8, used: "ZOZO・サイファー・テック" },
      { name: "GitHub Actions", level: 8, used: "ZOZO・HADAL・動画共有システム" },
      { name: "Docker", level: 8, used: "Juice 学園・BuildUp ほか" },
      { name: "CloudFormation", level: 7, used: "ZOZO" },
      { name: "Cloudflare", level: 6, used: "HADAL（Workers）・Juice 学園" },
      { name: "Datadog", level: 5, used: "ZOZO（DBM）" },
      { name: "Vercel", level: 5, used: "動画共有システム・ぼきゃぶらりんぐ" },
      { name: "nginx", level: 4, used: "BuildUp" },
    ],
  },
  {
    channel: "CH.5",
    label: "データベース",
    items: [
      { name: "MySQL", level: 7, used: "ZOZO（インデックス設計）" },
      { name: "PostgreSQL", level: 7, used: "動画共有システム・BuildUp" },
      { name: "MongoDB", level: 7, used: "Juice 学園" },
      { name: "Redis", level: 6, used: "Juice 学園" },
      { name: "Supabase", level: 6, used: "InterviewHack・ぼきゃぶらりんぐ" },
      { name: "Firebase", level: 3, used: "Ren-Kei" },
    ],
  },
  {
    channel: "CH.6",
    label: "テスト・セキュリティ",
    items: [
      { name: "Playwright", level: 7, used: "Towhy（E2E 約 20 件）・HADAL" },
      { name: "k6", level: 5, used: "ZOZO（負荷試験）" },
      { name: "Vitest", level: 5, used: "Project HADAL" },
      { name: "Burp Suite", level: 4, used: "サイファー・テック（脆弱性診断）" },
    ],
  },
  {
    channel: "CH.7",
    label: "AI・機械学習",
    items: [
      { name: "強化学習（DQN）", level: 7, used: "卒業研究" },
      { name: "PyTorch", level: 6, used: "卒業研究" },
      { name: "LLM API（Gemini / OpenAI）", level: 6, used: "ぼきゃぶらりんぐ・Kikasete・InterviewHack" },
      { name: "Claude Code", level: 8, used: "Towhy・制作物" },
    ],
  },
];

export const certifications = [
  "サーティファイ Java(TM)プログラミング能力認定試験 2 級",
  "サーティファイ C 言語プログラミング能力認定試験 2 級",
];

export const achievements = [
  {
    year: "2026 年",
    title: "全国高等専門学校プログラミングコンテスト 敢闘賞",
    project: "Ren-Kei（連契）",
  },
  {
    year: "2024 年",
    title: "全国高等専門学校プログラミングコンテスト 課題部門 敢闘賞",
    project: "節電だヨ！教室集合",
  },
];

export type CoverPattern = "sonar" | "stripes" | "dots" | "grid" | "rings" | "wave";

// CD ジャケットのデザイン
export type Cover = {
  title: string;
  bg: string;
  fg: string;
  pattern: CoverPattern;
};

export type Work = {
  title: string;
  cover: Cover;
  period?: string;
  team?: string;
  tech: string[];
  description: string;
  highlights?: string[];
  status: string;
  url?: string;
  repo?: string;
};

export const works: Work[] = [
  {
    title: "Project HADAL",
    cover: { title: "HADAL", bg: "#0b1d3a", fg: "#3dff7a", pattern: "sonar" },
    period: "2026 年 9 月〜10 月",
    team: "個人開発",
    tech: ["TypeScript", "React", "Three.js", "Zustand", "Zod", "Vitest", "Playwright", "Cloudflare Workers"],
    description:
      "ブラウザで遊べる一人称視点の 3D 潜水艦アクション。敵の音をソナーで聞き分けて位置を割り出し、魚雷で仕留めるソナー戦が中心。ストーリー全 20 話・レース・サバイバルなどのモードを搭載。",
    highlights: [
      "30Hz 固定ステップの決定的シミュレーションと、描画・UI を分離した構造",
      "敵 AI は 7 状態のステートマシン。自艦のソナー情報だけで判断することをテストで担保",
      "3D モデル・効果音・BGM はすべてオリジナル。CI から Cloudflare Workers へ自動デプロイ",
    ],
    status: "公開中",
    url: "https://project-hadal.shin-deployment.workers.dev",
  },
  {
    title: "動画共有システム（中学生向け教材）",
    cover: { title: "VIDEO LAB", bg: "#ff4f9a", fg: "#111111", pattern: "grid" },
    period: "2026 年 5 月〜10 月",
    team: "チーム開発（2 名）・バックエンド担当",
    tech: ["TypeScript", "React", "Go", "Gin", "PostgreSQL", "Vercel", "GitHub Actions"],
    description:
      "中学生向け体験会で「動画投稿サイトの裏側」を学ぶ教育用システム。学校の Chrome だけで、穴埋めステップから自由改造、動画投稿まで完結する Lab モードを搭載。",
    highlights: [
      "生徒が触ってよい層と、通信・認証・ファイル処理の保護層を分離し、UI を壊してもシステムは止まらない設計",
      "生徒のコードをブラウザ内でトランスパイルし、本物のサイトの部品だけを差し替えてライブプレビュー",
      "Go API・認証・動画ストリーミング・CI・Vercel へのデプロイを担当",
    ],
    status: "体験会で運用中",
    repo: "https://github.com/ShumaKitayama/video-sharing-system",
  },
  {
    title: "Ren-Kei（連契）",
    cover: { title: "連契", bg: "#ff7a1a", fg: "#111111", pattern: "wave" },
    period: "2026 年 7 月〜9 月",
    team: "チーム開発（5〜6 名）・開発メンバー",
    tech: ["TypeScript", "React Native", "Expo", "Firebase", "MediaPipe", "Python"],
    description:
      "阿波踊りの練習を支援するスマートフォン向けアプリ。姿勢推定で基本動作をリアルタイムに採点し、練習動画の共有や自分に合った「連」の検索・参加ができる。全国高専プロコンで敢闘賞を受賞。",
    highlights: [
      "開発メンバーとして、AI 解析まわりと Cloud Functions の実装を手伝った",
    ],
    status: "敢闘賞",
    repo: "https://github.com/rn40Rext/Ren-kei_procon",
  },
  {
    title: "Juice 学園 ポータルサイト",
    cover: { title: "JUICE", bg: "#ffd400", fg: "#111111", pattern: "dots" },
    period: "2025 年 2 月〜2026 年 1 月",
    team: "個人開発",
    tech: ["TypeScript", "React", "Go", "Gin", "MongoDB", "Redis", "Docker", "Cloudflare", "Stripe"],
    description:
      "大学内ドリンクバーサービスのポータルサイト。友人の起業を技術面からフルサポート。低スペック環境での運用を前提に、JOIN 排除・非同期処理・Redis キャッシュで負荷を徹底的に分散。",
    highlights: [
      "JWT と Gmail API による 2 要素認証（OTP）、CSRF トークン検証、IDOR 対策、個人情報のマスキングログ",
      "Stripe 連携：Webhook の署名検証・冪等性管理・ワーカープールでの非同期処理、顧客の重複作成防止",
      "プロモーションコード、解約済みサブスクの再開・プラン変更に対応",
      "Docker の非 root・読み取り専用実行、MongoDB のコネクションプール、モバイル対応・アクセシビリティを含む UI 全面改修",
    ],
    status: "運用中 (Demo)",
    url: "https://juiceacademydemo.win",
  },
  {
    title: "InterviewHack",
    cover: { title: "INTERVIEW HACK", bg: "#2f6bff", fg: "#ffffff", pattern: "stripes" },
    period: "2026 年 2 月〜",
    team: "個人開発",
    tech: ["TypeScript", "React", "Go", "Gin", "Supabase", "Stripe", "OpenAI", "Gemini"],
    description:
      "AI を活用した就活・面接対策 PWA。ガクチカや強みなどの自己分析と企業研究を管理し、ES 作成支援・想定 Q&A 生成・回答添削・面接の振り返りまでを 1 つのアプリでつなぐ。",
    highlights: [
      "バックエンドは DDD ＋ クリーンアーキテクチャ。依存ルールをスクリプトで検査",
      "要件・ドメイン・LLM・セキュリティ・テストなど 15 本の設計書を作成",
      "Supabase の RLS と、クレジット制による AI 利用量の制御",
    ],
    status: "開発中",
  },
  {
    title: "BuildUp",
    cover: { title: "BUILD UP", bg: "#3dff7a", fg: "#111111", pattern: "grid" },
    period: "2025 年 11 月〜12 月",
    team: "チーム開発・バックエンド／インフラ担当",
    tech: ["Python", "FastAPI", "PostgreSQL", "WebSocket", "WebRTC", "Docker", "nginx"],
    description:
      "開発者とプロジェクトをマッチングする Web サービス。プロジェクトの募集・応募・オファー管理に加え、リアルタイムチャットや音声・ビデオ通話ができる。",
    highlights: [
      "FastAPI バックエンド、GitHub OAuth ログイン、WebSocket による個別・グループチャットを実装",
      "WebRTC による音声・ビデオ通話、nginx・SSL・Cloudflare Tunnel のインフラを担当",
    ],
    status: "開発完了",
    repo: "https://github.com/tamago4976/BuildUp",
  },
  {
    title: "ぼきゃぶらりんぐ",
    cover: { title: "ぼきゃぶらりんぐ", bg: "#8b5cf6", fg: "#ffffff", pattern: "rings" },
    period: "2025 年 5 月〜7 月",
    team: "チーム開発",
    tech: ["TypeScript", "React", "Supabase", "Gemini", "Vercel"],
    description:
      "英単語超自動生成アプリ。画像から Gemini で単語データを自動生成し、単語帳ごとに保存・学習できる。無料で利用可能。",
    highlights: [
      "Supabase Edge Functions から Gemini を呼び出して画像を解析",
      "単語帳ごとの管理、穴埋め問題の作成、音声読み上げと発音記号",
      "復習・除外学習・学習記録など暗記カード機能をフル搭載",
    ],
    status: "公開中",
    url: "https://ring-vocabulary.vercel.app",
  },
  {
    title: "音声アシスタント Kikasete",
    cover: { title: "KIKASETE", bg: "#ff3b30", fg: "#ffffff", pattern: "sonar" },
    tech: ["TypeScript", "React", "Express", "Vercel"],
    description:
      "地元飲食店向けに開発した多言語対応の対話型 AI アシスタント。Gemini 2.0 Flash を使用し、メニュー認識・リアルタイム音声再生・字幕表示に対応。実店舗導入済み。",
    url: "https://kikasete-public.vercel.app",
    status: "実店舗導入済み",
  },
];

export const socialLinks = {
  twitter: "https://x.com/2005_helloworld",
  github: "https://github.com/Shumakitayama",
  qiita: "https://qiita.com/baningugozira",
};
