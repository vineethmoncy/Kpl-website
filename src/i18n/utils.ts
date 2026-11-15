import en from "./en.json";
import hi from "./hi.json";

export type Lang = "en" | "hi";

const dictionaries: Record<Lang, Record<string, unknown>> = { en, hi };

/** Detects the page language from the URL path. Hindi lives under /hi/, everything else is English. */
export function getLang(url: URL): Lang {
  return url.pathname === "/hi" || url.pathname.startsWith("/hi/") ? "hi" : "en";
}

function lookup(dict: Record<string, unknown>, key: string): string | undefined {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null || !(part in node)) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : undefined;
}

/** Dotted-key translation lookup. Falls back to English, then to the key itself. */
export function t(lang: Lang, key: string): string {
  return lookup(dictionaries[lang], key) ?? lookup(dictionaries.en, key) ?? key;
}

/** Builds a locale-aware path. English is unprefixed; Hindi is prefixed with /hi. */
export function localizedPath(lang: Lang, path: string): string {
  const normalised = "/" + path.replace(/^\/+/, "").replace(/\/{2,}/g, "/");
  if (lang === "en") return normalised;
  return normalised === "/" ? "/hi/" : `/hi${normalised}`;
}

/** Returns the current page path in the other language. */
export function switchLangPath(url: URL): string {
  const current = getLang(url);
  const target: Lang = current === "en" ? "hi" : "en";
  const stripped = url.pathname.replace(/^\/hi(?=\/|$)/, "") || "/";
  return localizedPath(target, stripped);
}

/** Raw-value lookup (arrays/objects) with English fallback. Returns undefined-cast if missing. */
export function tx<T = unknown>(lang: Lang, key: string): T {
  const get = (dict: Record<string, unknown>): unknown => {
    let node: unknown = dict;
    for (const part of key.split(".")) {
      if (typeof node !== "object" || node === null || !(part in node)) return undefined;
      node = (node as Record<string, unknown>)[part];
    }
    return node;
  };
  return (get(dictionaries[lang]) ?? get(dictionaries.en)) as T;
}
