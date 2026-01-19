import { describe, expect, it } from "bun:test";

import { buildUserscript } from "../src/core/build/build";
import { resolveFixture } from "./helpers/resolve";

describe("Basic userscript", () => {
  it("correctly bundles a basic userscript", async () => {
    const fixture = resolveFixture("fixtures/basic/index.ts");
    const result = await buildUserscript(fixture);
    expect(result).toMatchSnapshot();
  });

  it("correctly bundles a basic userscript with more options", async () => {
    const fixture = resolveFixture("fixtures/basic/index.ts", {
      resource: {
        myStyle: "https://example.com/myStyle.css",
      },
    });
    const result = await buildUserscript(fixture);
    expect(result).toMatchSnapshot();
  });
});
