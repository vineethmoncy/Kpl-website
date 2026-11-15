import type { Lang } from "../i18n/utils";

export type L = { en: string; hi: string };

export const loc = (v: L, lang: Lang): string => (lang === "hi" && v.hi ? v.hi : v.en);
