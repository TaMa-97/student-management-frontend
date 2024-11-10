/**
 * ホームページコンポーネント
 * - 生徒一覧を表示するメインページ
 * - ページヘッダーと生徒リストで構成
 * - レスポンシブデザイン対応
 */
import { StudentList } from '@/components/student-list';
import { PageHeader } from '@/components/page-header';

export default function Home() {
  return (
    <div className="container mx-auto py-4 space-y-4">
      <PageHeader 
        title="Students" 
        description="生徒一覧"
      />
      <StudentList />
    </div>
  );
}