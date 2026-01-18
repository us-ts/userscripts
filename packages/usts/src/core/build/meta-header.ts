import type { UserscriptMetaHeaderConfig } from "~/config/schema";

const headerStart = "// ==UserScript==" as const;
const headerEnd = "// ==/UserScript==" as const;

function getHeaderLine(
  key: string,
  val: string | boolean | readonly [string, string],
) {
  if (typeof val === "boolean") return `// @${key}`;
  const paddedKey = key.padEnd(16);
  if (typeof val === "string") return `// @${paddedKey} ${val}`;
  const paddedSubKey = val[0].padEnd(8);
  return `// @${paddedKey} ${paddedSubKey} ${val[1]}`;
}

function getHeaderLines(
  key: string,
  val: string | string[] | boolean | Record<string, string>,
) {
  if (Array.isArray(val)) return val.map((v) => getHeaderLine(key, v));
  if (typeof val === "string") return [getHeaderLine(key, val)];
  if (typeof val === "boolean") return [getHeaderLine(key, val)];
  if (typeof val === "object") {
    return Object.entries(val).map((v) => getHeaderLine(key, v));
  }
  throw new Error(`Unknown header value type: ${typeof val}`);
}

export function serializeMetaHeader(
  headerConfig: UserscriptMetaHeaderConfig,
): string {
  const headerConfigEntries = Object.entries(headerConfig);
  const headerLines = headerConfigEntries.flatMap(([kwy, val]) =>
    getHeaderLines(kwy, val),
  );
  const serializedHeaderLines = headerLines.join("\n");
  const serializedHeader =
    `${headerStart}\n${serializedHeaderLines}\n${headerEnd}` as const;
  return serializedHeader;
}
