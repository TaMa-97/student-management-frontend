"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useStudentStore } from "@/lib/store";
import type { Student } from "@/lib/store";

/**
 * 生徒情報のバリデーションスキーマ
 * - 必須項目: 名前、保護者名、電話番号
 * - 任意項目: メールアドレス、誕生日、入会日、プロフィール画像
 */
const studentFormSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  parentName: z.string().min(1, "保護者名を入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください").optional().or(z.literal("")),
  amount: z.string(),
  birthday: z.date().optional(),
  joinedAt: z.date().optional(),
  avatar: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

interface StudentFormProps {
  defaultData?: Student;
}

/**
 * フォームラベルに必須/任意のバッジを付与するコンポーネント
 */
function FormLabelWithBadge({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <FormLabel>{children}</FormLabel>
      {required ? (
        <Badge variant="destructive" className="text-[10px] px-1.5 py-0">必須</Badge>
      ) : (
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-muted">任意</Badge>
      )}
    </div>
  );
}

/**
 * 生徒情報の登録・編集フォームコンポーネント
 * - 新規登録と既存データの編集に対応
 * - フォームバリデーション機能付き
 * - 画像アップロード機能付き
 * - カレンダーによる日付選択機能
 */
export function StudentForm({ defaultData }: StudentFormProps) {
  const router = useRouter();
  const addStudent = useStudentStore((state) => state.addStudent);
  const updateStudent = useStudentStore((state) => state.updateStudent);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: defaultData || {
      name: "",
      parentName: "",
      phone: "",
      email: "",
      amount: "5000",
      birthday: undefined,
      joinedAt: new Date(),
      avatar: "",
    },
  });

  /**
   * フォーム送信時の処理
   * - 日付データをフォーマット
   * - 新規登録/更新処理の実行
   */
  const onSubmit = (data: StudentFormValues) => {
    const formattedData = {
      ...data,
      joinedAt: data.joinedAt ? format(data.joinedAt, 'yyyy年M月入会') : undefined,
      birthday: data.birthday ? format(data.birthday, 'yyyy-MM-dd') : undefined,
    };

    if (defaultData) {
      updateStudent(defaultData.id, formattedData);
    } else {
      addStudent(formattedData);
    }
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8 rounded-lg border p-8">
          {/* プロフィール画像アップロード */}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithBadge>プロフィール画像</FormLabelWithBadge>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    className="mx-auto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 基本情報フィールド */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithBadge required>名前</FormLabelWithBadge>
                <FormControl>
                  <Input placeholder="山田 花子" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithBadge required>保護者名</FormLabelWithBadge>
                <FormControl>
                  <Input placeholder="山田 太郎" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithBadge required>電話番号</FormLabelWithBadge>
                <FormControl>
                  <Input placeholder="090-1234-5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithBadge>メールアドレス</FormLabelWithBadge>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithBadge required>月謝</FormLabelWithBadge>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="月謝を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5000">5,000円</SelectItem>
                    <SelectItem value="10000">10,000円</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabelWithBadge>誕生日</FormLabelWithBadge>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy年MM月dd日")
                        ) : (
                          <span>日付を選択</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={ja}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="joinedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabelWithBadge>入会日</FormLabelWithBadge>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy年MM月")
                        ) : (
                          <span>日付を選択</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={ja}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {defaultData ? "更新" : "登録"}
          </Button>
        </div>
      </form>
    </Form>
  );
}