import { readFile } from "node:fs/promises";
import { createServer } from "node:http";

export async function serve(options: {
  port: number;
  outDir: string;
  fileName: string;
}): Promise<void> {
  return new Promise<void>(() => {
    const server = createServer(async (req, res) => {
      if (req.url !== `/${options.fileName}`) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
      }

      const bundle = await readFile(`${options.outDir}/${options.fileName}`);

      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      });

      res.end(bundle);
    });

    server.listen(options.port, () => {
      console.log(`http://localhost:${options.port}/${options.fileName}`);
    });
  });
}
