// Import Node.js Dependencies
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert";
import { test } from "node:test";

// Import Internal Dependencies
import { searchAndParseLicenses } from "../index.js";
import expectedParsedLicense from "./fixtures/parseLicense.snap.js";

// CONSTANTS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = path.join(__dirname, "fixtures");

test("it should throw a TypeError if destination is not a string", async() => {
  await assert.rejects(
    async() => await searchAndParseLicenses(null),
    {
      name: "TypeError",
      message: "dest must be a string!"
    });
});

test("it should detect two licenses (ISC, MIT) in project1", async() => {
  const result = await searchAndParseLicenses(path.join(FIXTURE_PATH, "project1"));

  assert.deepStrictEqual(result.uniqueLicenseIds, ["ISC", "MIT"]);
  assert.ok(result.hasMultipleLicenses);
  assert.deepStrictEqual(result, expectedParsedLicense);
});

test("it should detect one license (Artistic-2.0) in project2", async() => {
  const result = await searchAndParseLicenses(path.join(FIXTURE_PATH, "project2"));

  assert.deepStrictEqual(result.uniqueLicenseIds, ["Artistic-2.0"]);
  assert.strictEqual(result.hasMultipleLicenses, false);
});
