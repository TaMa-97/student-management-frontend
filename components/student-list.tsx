"use client";

import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useStudentStore } from '@/lib/store';

/**
 * 生徒一覧コンポーネント
 * - 生徒の検索機能
 * - 生徒一覧の表示
 * - 各生徒の基本情報（名前、電話番号）と画像を表示
 * - 生徒をクリックすると詳細ページに遷移
 * - レスポンシブデザイン対応
 */
export function StudentList() {
  const router = useRouter();
  const students = useStudentStore((state) => state.students);

  return (
    <div className="space-y-4">
      <div className="sm:max-w-md">
        <Input
          type="search"
          placeholder="生徒を検索..."
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => router.push(`/students/${student.id}`)}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src={student.avatar} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{student.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{student.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}