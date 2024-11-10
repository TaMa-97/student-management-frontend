/**
 * ユーティリティ関数
 * - Tailwind CSSのクラス名を結合するためのヘルパー関数
 * - clsxとtailwind-mergeを組み合わせて使用
 * - 条件付きクラスの適用やクラスの衝突を解決
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}