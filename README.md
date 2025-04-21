# マガジンリスト

シンプルなマガジンリスト表示とページネーション機能を提供する JavaScript アプリケーション。
デザインは適宜カスタマイズしてください。

## 機能

- マガジンリストの表示
- ページネーション機能（10 件ごとに表示）
- 最初のページ/最終ページへの直接移動
- PDF ファイルへのリンク

## 使い方

1. リポジトリをクローン

```bash
git clone [リポジトリURL]
```

2. ブラウザで`index.html`を開く

## カスタマイズ

### マガジンデータの編集

`index.html`内の`magazines`配列を編集することで、表示するマガジンを変更できます：

```javascript
const magazines = [
  { date: "2001-01-01", title: "テスト1", path: "test1.pdf" },
  // ... 他のマガジンデータ
];
```

### 表示設定の変更

`MagazineList`クラスのインスタンス化時にオプションを指定可：

```javascript
const magazineLists = new MagazineList(magazines, {
  itemsPerPage: 10, // 1ページあたりの表示件数
  pdfPath: "./images/magazine", // PDFファイルのパス
  listId: "js-magazine-list" //一覧表示用リストID
  paginationId: "js-pagination" //一覧表示用リストID
  listClass: "magazine-item", // リスト項目のクラス名
  linkClass: "link", // リンクのクラス名
  dateClass: "date", // 日付のクラス名
});
```

## ファイル構成

- `index.html` - メインの HTML ファイル
- `magazines.js` - マガジンリストの機能を提供する JavaScript ファイル
- `magazine.css` - スタイルシート
