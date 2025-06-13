export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            About Todo App
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              概要
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              このTodo Appは、日々のタスク管理を効率的に行うためのシンプルで使いやすいアプリケーションです。
              Next.js 15とTypeScriptを使用して開発され、レスポンシブデザインとダークモードをサポートしています。
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              主な機能
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>タスクの追加、編集、削除</li>
              <li>タスクの完了/未完了の切り替え</li>
              <li>フィルター機能（すべて、アクティブ、完了済み）</li>
              <li>完了済みタスクの一括削除</li>
              <li>レスポンシブデザイン対応</li>
              <li>ダークモード対応</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              技術スタック
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li><strong>フレームワーク:</strong> Next.js 15 (App Router)</li>
              <li><strong>言語:</strong> TypeScript</li>
              <li><strong>スタイリング:</strong> Tailwind CSS</li>
              <li><strong>コード品質:</strong> ESLint</li>
              <li><strong>パッケージマネージャー:</strong> npm</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              使い方
            </h2>
            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>入力フィールドに新しいタスクを入力し、「追加」ボタンをクリック</li>
              <li>タスクをクリックして編集モードに切り替え</li>
              <li>チェックボックスをクリックしてタスクの完了状態を切り替え</li>
              <li>フィルターボタンでタスクの表示を切り替え</li>
              <li>「削除」ボタンで個別のタスクを削除</li>
              <li>「完了済みを削除」ボタンで完了済みタスクを一括削除</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}