// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { LicenseResult } from "../src/LicenseResult.class.js";

const kMITSpdxConformance = {
  uniqueLicenseIds: ["MIT"],
  invalidLicenseIds: [],
  hasMultipleLicenses: false,
  licenses: [
    {
      uniqueLicenseIds: ["MIT"],
      from: "LICENSE",
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
};

describe("LicenseResult", () => {
  it("should add the license to the invalid list if not known", () => {
    const lr = new LicenseResult();
    lr.addLicenseID("notalicense", "foobar");

    const result = lr.toJSON();
    assert.deepStrictEqual(
      result.invalidLicenseIds,
      [
        {
          licenseId: "notalicense",
          reason: "Passed license expression 'notalicense' was not a valid license expression."
        }
      ]
    );
    assert.strictEqual(result.licenses.length, 0);
  });

  it("should add MIT using a source", () => {
    const lr = new LicenseResult();
    lr.addLicenseIDFromSource("blabla MIT License yooyo", "LICENSE");

    const result = lr.toJSON();
    assert.deepEqual(result, kMITSpdxConformance);
  });

  it("should add MIT license and hasMultipleLicenses should be false", () => {
    const lr = new LicenseResult();
    lr.addLicenseID("MIT", "LICENSE");

    const result = lr.toJSON();
    assert.deepEqual(result, kMITSpdxConformance);
  });

  it("should add MIT and ISC licenses and hasMultipleLicenses should be true", () => {
    const licenseSource = "LICENSE";
    const lr = new LicenseResult();
    lr.addLicenseID("ISC", "package.json");
    lr.addLicenseID("MIT", licenseSource);

    const result = lr.toJSON();
    assert.ok(result.hasMultipleLicenses);
    assert.deepStrictEqual(result.uniqueLicenseIds, ["ISC", "MIT"]);
    assert.strictEqual(result.licenses.length, 2);
  });
});

