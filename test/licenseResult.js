// Import Node.js Dependencies
import { test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import licenseResult from "../src/licenseResult.js";

test("should ignore if the provided licenseID is not a string primitive", () => {
  const lr = new licenseResult();
  lr.addLicenseID(null, "foobar");

  const result = lr.toJSON();
  assert.strictEqual(result.licenses.length, 0);
});

test("should add the license to the invalid list if not known", () => {
  const lr = new licenseResult();
  lr.addLicenseID("notalicense", "foobar");

  const result = lr.toJSON();
  assert.deepStrictEqual(result.invalidLicenseIds, ["notalicense"]);
  assert.strictEqual(result.licenses.length, 0);
});

test("should add MIT license and hasMultipleLicenses should be false", () => {
  const licenseSource = "LICENSE";
  const lr = new licenseResult();
  lr.addLicenseID("MIT", licenseSource);

  const result = lr.toJSON();
  assert.deepEqual(result, {
    uniqueLicenseIds: ["MIT"],
    invalidLicenseIds: [],
    hasMultipleLicenses: false,
    licenses: [
      {
        uniqueLicenseIds: ["MIT"],
        from: licenseSource,
        spdx: {
          fsf: true,
          fsfAndOsi: true,
          includesDeprecated: false,
          osi: true
        },
        spdxLicenseLinks: [
          "https://spdx.org/licenses/MIT.html#licenseText"
        ]
      }
    ]
  });
});

test("should add MIT and ISC licenses and hasMultipleLicenses should be true", () => {
  const licenseSource = "LICENSE";
  const lr = new licenseResult();
  lr.addLicenseID("ISC", "package.json");
  lr.addLicenseID("MIT", licenseSource);

  const result = lr.toJSON();
  assert.ok(result.hasMultipleLicenses);
  assert.deepStrictEqual(result.uniqueLicenseIds, ["ISC", "MIT"]);
  assert.strictEqual(result.licenses.length, 2);
});
