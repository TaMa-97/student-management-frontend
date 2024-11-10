/**
 * テーマプロバイダーコンポーネント
 * - アプリケーション全体のテーマ管理
 * - next-themesを使用したテーマの切り替え機能
 */
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}