import type { Plugin } from "rolldown";

export function userscriptPlugin(options?: { dev?: boolean }): Plugin {
  const id = "usts:runtime";
  const resolvedId = `\0${id}`;
  return {
    name: "userscript-plugin",
    resolveId(source) {
      if (source === id) {
        return resolvedId;
      }
      return null;
    },
    load(id) {
      if (id === resolvedId) {
        return `const IS_DEV = ${options?.dev ?? false};
        export { IS_DEV };`;
      }
      return null;
    },
  } satisfies Plugin;
}
