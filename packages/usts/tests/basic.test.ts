import { describe, expect, it } from "bun:test";

import { buildUserscript } from "../src/core/build/build";
import { resolveFixture } from "./helpers/resolve";

describe("Basic userscript", () => {
  it("Correctly bundles a basic userscript", async () => {
    const fixture = resolveFixture("fixtures/basic/index.ts");
    const result = await buildUserscript(fixture);
    expect(result).toMatchSnapshot();
  });
});
