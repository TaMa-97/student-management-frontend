/**
 * 新規生徒登録ページコンポーネント
 * - 新規生徒の情報を入力するフォームを表示
 * - クライアントサイドでのフォーム処理
 */
"use client";

import { StudentForm } from "@/components/student-form";
import { PageHeader } from "@/components/page-header";

export default function NewStudentPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <PageHeader 
        title="New Student" 
        description="新規生徒登録"
      />
      <div className="max-w-2xl">
        <StudentForm />
      </div>
    </div>
  );
}