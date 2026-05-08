# Memoria カスタマイズ機能 — 引き継ぎメモ

**作成日**: 2026-05-07
**状況**: 大規模実装完了、動作確認は未実施(コンテキスト残量切れのため)

---

## 1. このセッションでやったこと

### 完了

1. **`Memoria.html` を全面書き換え** (1059 → 2108 行)
   - 全文言・写真・アルバムを `DEFAULT_MEMORIA_CONFIG` に集約
   - `ConfigContext` + `localStorage` で編集状態を永続化
   - `AdminContext` + `localStorage` で管理者ログイン状態管理
   - 既存 7 アルバム(kyoto/okinawa/family/hokkaido/paris/hawaii/daily)を `buildSeedPhotos()` でプリベイクし、ビジュアルデモを温存
   - 既存 SVG プレースホルダの参照は `imgUrl()` ヘルパで透過的に解決

2. **管理者向け編集 UI 追加**
   - ロック画面: 本物の合言葉認証(`<input type="password">` + 失敗時シェイク + sessionStorage で開錠状態維持)
   - プロフィール画面: 「管理者でログイン」行 → AdminLoginModal
   - 管理モード時、編集可能テキストの右に ✏️ アイコン → インライン編集
   - 上部に管理バー(ログアウトボタン)
   - アルバム/写真の長押しメニュー(編集/削除/表紙にする)
   - FAB(右下 +)でアルバム新規作成 / 写真追加

3. **Cloudinary 連携**
   - `CloudinarySettingsModal` で cloudName + uploadPreset を入力
   - `PhotoUploaderModal` でローカルファイル選択 → `XMLHttpRequest` で multipart POST → 進捗表示
   - 写真サムネ/フルサイズは URL 変換で自動最適化(`w_400/800/1400,q_auto,f_auto`)

4. **公開フロー**
   - `PublishModal` の「公開用 HTML をダウンロード」
   - 自身を `fetch(location.href)` → `// MEMORIA_CONFIG_BEGIN`〜`MEMORIA_CONFIG_END` 間を `JSON.stringify` した現状 config に置換 → Blob ダウンロード
   - JSON エクスポート/インポート、初期化機能も同モーダル内
   - `file://` プロトコル時は警告(GitHub Pages か Live Server 必須)

5. **合言葉・管理者パスワード変更**
   - `PassphraseChangeModal` で現行→新→確認の3欄
   - 家族用合言葉変更時は `auth.passphraseUpdatedAt` を `todayShort()` で更新

6. **`MEMORIA-SETUP.md` 作成** — 管理者向け運用手順書

### 動作未確認(次セッションで実施推奨)

プランの「動作確認ステップ」24 項目すべて未実施。最優先は:

- ブラウザで Memoria.html が **エラーなく描画される** ことを確認(Babel パースエラーが出ていないか)
- ロック画面で初期合言葉を入れて開錠 → ホーム表示
- プロフィール → 管理者でログイン (初期管理者パスワード) → 各画面に編集アイコン表示確認
- アルバム新規作成 → 表示確認 → 削除確認
- 「公開用 HTML をダウンロード」が `file://` 警告 or 正常書き出しすること

---

## 2. アーキテクチャ要点(次の担当者向け)

### ファイル構成

| ファイル | 行数 | 役割 |
|---|---|---|
| `Memoria.html` | 2108 | 単一 SPA(全機能含む) |
| `MEMORIA-SETUP.md` | 143 | みらいさん向け運用ガイド |
| `HANDOFF.md` | このファイル | 開発引き継ぎメモ |
| `README.md` | 26 | (既存)Claude Design ハンドオフ用、変更なし |
| `project/Memoria.html` | — | (既存)デザイン参照版、変更なし |
| `project/placeholders/*.svg` | — | (既存)シードアルバム用画像 |

### `Memoria.html` の主要セクション

| 行 | 内容 |
|---|---|
| 1-220 | HTML head + CSS(既存トークン+新規 .fab/.modal-/.editable-pen/.shake 等) |
| 222-249 | `buildSeedPhotos()` (シード写真生成、初期 config だけが使う) |
| 256-349 | `// MEMORIA_CONFIG_BEGIN 〜 END` ブロック — 公開時に置換される |
| 354-486 | ヘルパー(deepClone/mergeConfig/loadStoredConfig/imgUrl/coverUrl/uploadToCloudinary/replaceConfigInSource/publishHTML 等) |
| 491-575 | Context/Hooks (ConfigProvider, AdminProvider, useShake, useLongPress) |
| 580-620 | Icons(元の14個 + 新規 Plus/Pen/Trash/Logout/Upload/Camera/Star/Check) |
| 625-770 | 共通コンポーネント(RoundBtn, TabBar, EditableText, FAB, AdminBar) |
| 775-950 | モーダル群(Modal, ConfirmModal, AdminLoginModal, PassphraseChangeModal, CloudinarySettingsModal, AlbumEditorModal, PhotoUploaderModal, PublishModal, LongPressMenu) |
| 952-1060 | ScreenLock |
| 1062-1230 | ScreenHome |
| 1232-1320 | ScreenAlbumsList |
| 1322-1490 | ScreenAlbum (PhotoTile, DateGroup 含む) |
| 1492-1600 | ScreenLightbox |
| 1602-1690 | ScreenYears |
| 1692-1790 | ScreenSearch |
| 1792-2050 | ScreenProfile (SettingRow, SettingsGroup 含む) |
| 2055-2107 | AppRouter, App, render |

### 設定スキーマ

```js
{
  site: { metaTitle, brandName, brandNameLatin, footer },
  auth: { passphrase, adminPassphrase, passphraseUpdatedAt: 'YYYY.MM.DD' },
  cloudinary: { cloudName, uploadPreset },
  lock: { badge, headline1, headline2, headline3, tagline, note1, note2, invite },
  home: { eyebrow, name, newPhotoCount, sectionAlbumsLabel, sectionYearsLabel },
  profile: { userName, userInitial, userRole },
  albums: [{
    id, title, subtitle,
    date: 'YYYY.MM' | '通年',
    year: number,
    desc, coverPhotoId,
    photos: [{ id, src, date: 'YYYY.MM.DD', caption }]
  }]
}
```

### ストレージキー

- `MEMORIA_USER_DATA` (localStorage): 編集後 config の JSON
- `MEMORIA_ADMIN` (localStorage): `'1'` で管理者ログイン中
- `MEMORIA_UNLOCKED` (sessionStorage): `'1'` で家族認証済み

### 初期パスワード

初期合言葉と初期管理者パスワードは `.claude/gen-auth.mjs` (gitignore 配下、ローカルのみ) に書かれています。リポジトリ内には平文で残っていません。`MEMORIA-SETUP.md` §2-3 で「初回設定で必ず強い値に変更」と案内済み。

---

## 3. 既知の懸念点・残作業

### 動作確認が必要

- **Babel parse**: 7 個のモーダルが入れ子のまま正しくパースされるか未検証
- **`useLongPress` の React Hooks ルール**: 元コードで `.map()` 内で呼んでいた懸念があり、`AlbumListRow` と `PhotoTile` を独立コンポーネントに切り出して回避済み。念のためレビュー要
- **Cloudinary 未設定状態**: `cloud.cloudName` が空のとき UI が壊れないか
- **アルバム削除時**: featured(`albums[0]`)が消えたときのフォールバック表示

### プランから削った/変更した点

- **動画ライトボックス (`ScreenVideoLightbox`)**: 元コードでは「3,5枚目を動画扱い」していた装飾だったが、新実装では純粋な静止画ライトボックスに統一。動画機能自体が見せかけだったため、admin 編集ワークフローに不要と判断して削除
- **`'video-lightbox'` ルート**: 削除。`PhotoTile` から `lightbox` のみ呼ぶ
- **`SettingsGroup` の API**: rows 配列 → children 形式に変更(管理者メニューの動的表示のため)
- **`README.md` 編集**: せず。`MEMORIA-SETUP.md` を新規作成

### 既知の制約(プラン記載通り)

- 平文パスワード(クライアント側のみの認証)
- Cloudinary 上の物理ファイル削除は手動
- `file://` で開くと公開ボタンが動かない
- GitHub Pages 反映に数分かかる

---

## 4. 次セッションでやるべき順序

1. **ブラウザで `Memoria.html` を Live Server 等で開く** → コンソールエラー確認
   - 出ていれば Babel/JSX パースエラーが第一容疑。エラー行番号で fix
2. **ロック画面 → 初期合言葉で開錠 → ホーム表示**
3. **管理者ログイン → 各画面に ✏️ が出るか確認**
4. **テキスト編集 → リロード → 永続化されているか確認**(localStorage 経由)
5. **アルバム新規作成 → リスト追加 → 編集 → 削除**
6. **Cloudinary 設定入力 → 写真アップロード**(本物のアカウント要)
7. **公開用 HTML ダウンロード** → 別タブ/シークレットウィンドウで開いて反映確認
8. **GitHub Pages に push** → スマホからアクセス確認

---

## 5. コミット候補メッセージ

```
feat: add admin customization, Cloudinary upload, GitHub Pages publish flow

- Replace hardcoded ALBUMS with DEFAULT_MEMORIA_CONFIG (centralized text/photos/auth)
- ConfigContext + localStorage for live editing, AdminContext for admin mode
- Real passphrase auth on lock screen with shake-on-fail and session persistence
- Inline editable text via pen icons (admin-only)
- AlbumEditorModal + FAB for album CRUD
- PhotoUploaderModal — multipart upload to Cloudinary unsigned preset
- PassphraseChangeModal for family + admin password changes
- LongPressMenu for delete/set-cover actions
- PublishModal: fetch(self) + sentinel-based config replacement -> download
- JSON import/export + reset-to-defaults
- New MEMORIA-SETUP.md with full operator runbook (Cloudinary, Pages, daily flow)

Storage keys: MEMORIA_USER_DATA / MEMORIA_ADMIN / MEMORIA_UNLOCKED
Initial credentials are hashed only; plaintext defaults live in .claude/gen-auth.mjs (gitignored)
```

---

## 6. 関連ファイルへの参照

- 承認済みプラン: `C:\Users\pt3u7\.claude\plans\hashed-sauteeing-ullman.md`
- 元コードのトランスクリプト: `C:\Users\pt3u7\.claude\projects\c--mirai-portfolio-portfolio-pc\bc93c6b0-e0b8-47b7-8ad5-69b6ee0cdf35.jsonl`
