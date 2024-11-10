/**
 * 生徒情報編集ページコンポーネント
 * - 既存の生徒情報を編集するフォームを表示
 * - クライアントサイドでのルーティング
 * - 生徒データの取得と表示
 */
"use client";

import { StudentForm } from "@/components/student-form";
import { PageHeader } from "@/components/page-header";
import { students } from "@/lib/data";
import { useParams } from "next/navigation";

export default function EditStudentPage() {
  const params = useParams();
  const student = students.find(s => s.id === parseInt(params.id as string));

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <PageHeader 
        title="Edit Student" 
        description="生徒情報編集"
      />
      <div className="max-w-2xl">
        <StudentForm defaultData={student} />
      </div>
    </div>
  );
}