// Import Node.js Dependencies
import path from "node:path";
import { fileURLToPath } from "node:url";

// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { searchAndParseLicenses } from "../index.js";
import expectedParsedLicense from "./fixtures/parseLicense.snap.js";

// CONSTANTS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = path.join(__dirname, "fixtures");

test("it should throw a TypeError if destination is not a string", async(tape) => {
  try {
    await searchAndParseLicenses(null);
    tape.fail("parseLicense with null primitive as argument should throw a TypeError");
  }
  catch (error) {
    tape.strictEqual(error.name, "TypeError");
    tape.strictEqual(error.message, "dest must be a string!");
  }

  tape.end();
});

test("it should detect two licenses (ISC, MIT) in project1", async(tape) => {
  const result = await searchAndParseLicenses(path.join(FIXTURE_PATH, "project1"));

  tape.same(result.uniqueLicenseIds, ["ISC", "MIT"]);
  tape.ok(result.hasMultipleLicenses);
  tape.same(result, expectedParsedLicense);
  tape.end();
});

test("it should detect one license (Artistic-2.0) in project2", async(tape) => {
  const result = await searchAndParseLicenses(path.join(FIXTURE_PATH, "project2"));

  tape.same(result.uniqueLicenseIds, ["Artistic-2.0"]);
  tape.strictEqual(result.hasMultipleLicenses, false);

  tape.end();
});
