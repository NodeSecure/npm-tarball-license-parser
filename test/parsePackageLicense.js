// Import Node.js Dependencies
import { test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { parsePackageLicense } from "../src/utils.js";

test("should return 'MIT' for parsePackageLicense license MIT", () => {
  const result = parsePackageLicense({
    license: "MIT"
  });
  assert.strictEqual(result, "MIT");
});

test("should return 'MIT AND (CC0-1.0 OR ISC)' for parsePackageLicense of Object", () => {
  const result = parsePackageLicense({
    license: {
      type: "MIT AND (CC0-1.0 OR ISC)"
    }
  });
  assert.strictEqual(result, "MIT AND (CC0-1.0 OR ISC)");
});

test("parsePackageLicense of payload with licenses property", () => {
  const result = parsePackageLicense({
    licenses: {
      type: "MIT AND (CC0-1.0 OR ISC)"
    }
  });
  assert.strictEqual(result, "MIT AND (CC0-1.0 OR ISC)");
});

test("parsePackageLicense of payload with licenses property as Array", () => {
  const result = parsePackageLicense({
    licenses: [
      {
        type: "ISC"
      }
    ]
  });
  assert.strictEqual(result, "ISC");
});

test("parsePackageLicense with empty payload", () => {
  const result = parsePackageLicense({});
  assert.strictEqual(result, "invalid license");
});
