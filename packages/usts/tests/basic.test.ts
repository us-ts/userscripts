import { describe, expect, it } from "bun:test";

import { buildUserscript } from "usts/core";
import { resolveFixture } from "./helpers/resolve";

describe("Basic userscript", () => {
  it("correctly bundles a basic userscript", async () => {
    const fixture = resolveFixture("fixtures/basic/index.ts");
    const result = await buildUserscript(fixture);
    expect(result).toMatchInlineSnapshot(`
      "// ==UserScript==
      // @name             Userscript name
      // @namespace        fixtures
      // @match            https://example.com/*
      // @version          1.0.0
      // @description      Userscript description
      // ==/UserScript==

      (function() {
      	console.log("Hello world!");
      })();
      "
    `);
  });

  it("correctly bundles a basic userscript with more options", async () => {
    const fixture = resolveFixture("fixtures/basic/index.ts", {
      resource: {
        myStyle: "https://example.com/myStyle.css",
      },
    });
    const result = await buildUserscript(fixture);
    expect(result).toMatchInlineSnapshot(`
      "// ==UserScript==
      // @name             Userscript name
      // @namespace        fixtures
      // @match            https://example.com/*
      // @version          1.0.0
      // @description      Userscript description
      // @resource         myStyle  https://example.com/myStyle.css
      // ==/UserScript==

      (function() {
      	console.log("Hello world!");
      })();
      "
    `);
  });

  it("correctly bundles a basic userscript when using IS_DEV variable", async () => {
    const fixture = resolveFixture("fixtures/virtual/index.ts");
    const result = await buildUserscript(fixture);
    expect(result).toMatchInlineSnapshot(`
      "// ==UserScript==
      // @name             Userscript name
      // @namespace        fixtures
      // @match            https://example.com/*
      // @version          1.0.0
      // @description      Userscript description
      // ==/UserScript==

      (function() {
      	console.log("[PROD] Hello world!");
      })();
      "
    `);
  });
});
