/**
 * 生徒詳細情報コンポーネント
 * - 生徒の基本情報を表示
 * - 保護者名、連絡先情報、月謝などを整理して表示
 * - ラベルと値のペアで情報を構造化
 * - 任意項目（誕生日）は存在する場合のみ表示
 */

import { Label } from "@/components/ui/label";

interface StudentDetailsProps {
  student: {
    parentName: string;
    phone: string;
    email: string;
    amount: string;
    birthday?: string;
  };
}

export function StudentDetails({ student }: StudentDetailsProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label>Parent name</Label>
        <div>{student.parentName}</div>
      </div>
      
      <div className="grid gap-2">
        <Label>Phone number</Label>
        <div>{student.phone}</div>
      </div>
      
      <div className="grid gap-2">
        <Label>Email</Label>
        <div>{student.email}</div>
      </div>
      
      <div className="grid gap-2">
        <Label>Amount</Label>
        <div>{student.amount}</div>
      </div>

      {student.birthday && (
        <div className="grid gap-2">
          <Label>Birthday</Label>
          <div>{student.birthday}</div>
        </div>
      )}
    </div>
  );
}