/**
 * サイトヘッダーコンポーネント
 * - ロゴ、ナビゲーション、テーマ切り替え、ユーザーアバターを表示
 * - スティッキーヘッダーで常に画面上部に固定
 * - レスポンシブ対応
 * - 半透明のブラー効果付き背景
 */
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold">
            生徒管理システム
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            生徒一覧
          </Link>
          <Button asChild>
            <Link href="/students/new">登録</Link>
          </Button>
          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </nav>
      </div>
    </header>
  );
}