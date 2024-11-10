"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { students as initialStudents } from './data';

/**
 * 生徒データの型定義
 */
export interface Student {
  id: number;
  name: string;
  joinedAt: string;
  birthday?: string;
  avatar: string;
  parentName: string;
  phone: string;
  email: string;
  amount: string;
}

/**
 * 生徒データを管理するストア
 * - Zustandを使用した状態管理
 * - LocalStorageによるデータの永続化
 * - CRUD操作の実装
 */
interface StudentStore {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: number, student: Partial<Student>) => void;
  deleteStudent: (id: number) => void;
}

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      students: initialStudents,
      addStudent: (student) =>
        set((state) => ({
          students: [
            ...state.students,
            {
              ...student,
              id: Math.max(...state.students.map((s) => s.id)) + 1,
            },
          ],
        })),
      updateStudent: (id, student) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id ? { ...s, ...student } : s
          ),
        })),
      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'student-storage',
    }
  )
);