/**
 * 生徒詳細ページコンポーネント
 * - 動的ルーティングによる生徒個別ページ
 * - 静的パラメータの生成
 * - 生徒プロフィールの表示
 */
import { StudentProfile } from "@/components/student-profile";
import { students } from "@/lib/data";

export function generateStaticParams() {
  return students.map((student) => ({
    id: student.id.toString(),
  }));
}

export default function StudentPage({ params }: { params: { id: string } }) {
  const student = students.find(s => s.id === parseInt(params.id));
  
  if (!student) {
    return <div>Student not found</div>;
  }
  
  return <StudentProfile student={student} />;
}