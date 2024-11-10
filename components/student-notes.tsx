"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

/**
 * 生徒メモ機能コンポーネント
 * - メモの追加、表示機能
 * - 各メモに作成者情報と作成日時を表示
 * - 時系列順でメモを表示
 * - 日付は相対表示（例：2日前）
 */
interface Note {
  id: number;
  content: string;
  createdAt: Date;
  author: {
    name: string;
    avatar: string;
  };
}

// 仮のデータ
const notes: Note[] = [
  {
    id: 1,
    content: "教訓メモ1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    author: {
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
  },
  {
    id: 2,
    content: "教訓メモ2",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    author: {
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
  },
];

export function StudentNotes({ studentId }: { studentId: number }) {
  const [newNote, setNewNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API実装後に追加
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button type="submit" disabled={!newNote.trim()}>
          Add Note
        </Button>
      </form>

      <div className="space-y-6">
        {notes.map((note) => (
          <div key={note.id} className="flex gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={note.author.avatar} />
              <AvatarFallback>{note.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{note.author.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(note.createdAt, { locale: ja, addSuffix: true })}
                </span>
              </div>
              <p className="text-sm">{note.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}