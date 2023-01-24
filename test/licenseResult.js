// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import licenseResult from "../src/licenseResult.js";

test("should ignore if the provided licenseID is not a string primitive", (tape) => {
  const lr = new licenseResult();
  lr.addLicenseID(null, "foobar");

  const result = lr.toJSON();
  tape.strictEqual(result.licenses.length, 0);

  tape.end();
});

test("should add the license to the invalid list if not known", (tape) => {
  const lr = new licenseResult();
  lr.addLicenseID("notalicense", "foobar");

  const result = lr.toJSON();
  tape.same(result.invalidLicenseIds, ["notalicense"]);
  tape.same(result.licenses.length, 0);

  tape.end();
});

test("should add MIT license and hasMultipleLicenses should be false", (tape) => {
  const licenseSource = "LICENSE";
  const lr = new licenseResult();
  lr.addLicenseID("MIT", licenseSource);

  const result = lr.toJSON();
  tape.deepEqual(result, {
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

  tape.end();
});

test("should add MIT and ISC licenses and hasMultipleLicenses should be true", (tape) => {
  const licenseSource = "LICENSE";
  const lr = new licenseResult();
  lr.addLicenseID("ISC", "package.json");
  lr.addLicenseID("MIT", licenseSource);

  const result = lr.toJSON();
  tape.ok(result.hasMultipleLicenses);
  tape.same(result.uniqueLicenseIds, ["ISC", "MIT"]);
  tape.same(result.licenses.length, 2);

  tape.end();
});
