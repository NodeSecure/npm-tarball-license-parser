// Import Node.js Dependencies
import path from "node:path";
import fs from "node:fs/promises";

// Import Third-party Dependencies
import { searchSpdxLicenseId } from "@nodesecure/licenses-conformance";

// Import Internal Dependencies
import { parsePackageLicense } from "./src/utils.js";
import licenseResult from "./src/licenseResult.js";

export async function searchAndParseLicenses(dest) {
  if (typeof dest !== "string") {
    throw new TypeError("dest must be a string!");
  }
  const licenseData = new licenseResult();

  const packageStr = await fs.readFile(
    path.join(dest, "package.json"), "utf-8"
  );

  const packageJSON = JSON.parse(packageStr);
  const packageLicenseID = parsePackageLicense(packageJSON);
  licenseData.addLicenseID(packageLicenseID, "package.json");

  const licenseFiles = (await fs.readdir(dest, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
    .filter((value) => value.toLowerCase().includes("license"));

  for (const file of licenseFiles) {
    const contentStr = await fs.readFile(path.join(dest, file));

    licenseData.addLicenseID(
      searchSpdxLicenseId(contentStr),
      file
    );
  }

  return licenseData.toJSON();
}
