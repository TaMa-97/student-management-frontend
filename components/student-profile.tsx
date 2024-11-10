"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StudentNotes } from "@/components/student-notes";
import { StudentDetails } from "@/components/student-details";
import { PageHeader } from "@/components/page-header";
import { useRouter } from "next/navigation";

/**
 * 生徒プロフィールコンポーネント
 * - 生徒の詳細情報を表示
 * - プロフィール画像、基本情報、メモを含む
 * - 編集ページへの遷移機能
 * - レスポンシブデザイン（2カラムレイアウト）
 */
interface StudentProfileProps {
  student: {
    id: number;
    name: string;
    joinedAt: string;
    avatar: string;
    parentName: string;
    phone: string;
    email: string;
    amount: string;
  };
}

export function StudentProfile({ student }: StudentProfileProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-4 space-y-4">
      <div className="flex justify-between items-start">
        <PageHeader 
          title="Student profile" 
          description="生徒プロフィール"
        />
        <Button 
          variant="outline"
          onClick={() => router.push(`/students/${student.id}/edit`)}
        >
          編集
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="space-y-6">
            <div className="flex gap-4 items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={student.avatar} />
                <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.joinedAt}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <StudentDetails student={student} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Notes</h3>
          </CardHeader>
          <CardContent>
            <StudentNotes studentId={student.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}