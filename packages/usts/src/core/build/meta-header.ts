import type { UserscriptMetaHeaderConfig } from "~/schemas";

const headerStart = "// ==UserScript==" as const;
const headerEnd = "// ==/UserScript==" as const;

type HeaderLine = `// @${string}`;

function getHeaderLine(key: string, val: string | boolean): HeaderLine {
  if (typeof val === "boolean") return `// @${key}`;
  const paddedKey = key.padEnd(16);
  return `// @${paddedKey} ${val}`;
}

function getHeaderLines(
  key: string,
  val: string | string[] | boolean,
): HeaderLine[] {
  if (Array.isArray(val)) return val.map((v) => getHeaderLine(key, v));
  if (typeof val === "string") return [getHeaderLine(key, val)];
  if (typeof val === "boolean") return [getHeaderLine(key, val)];
  throw new Error(`Unknown header value type: ${typeof val}`);
}

type SerializeMetaHeader = `// ==UserScript==
${string}
// ==/UserScript==`;

interface SerializeMetaHeaderResult {
  serializedHeader: SerializeMetaHeader;
}

export function serializeMetaHeader(
  headerConfig: UserscriptMetaHeaderConfig,
): SerializeMetaHeaderResult {
  const headerConfigEntries = Object.entries(headerConfig);
  const headerLines = headerConfigEntries.flatMap(([key, val]) =>
    getHeaderLines(key, val),
  );
  const serializedHeaderLines = headerLines.join("\n");
  const serializedHeader =
    `${headerStart}\n${serializedHeaderLines}\n${headerEnd}` as const;
  return { serializedHeader };
}
