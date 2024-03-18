// Import Node.js Dependencies
import { Dirent } from "node:fs";

// CONSTANTS
const kInvalidLicense = "invalid license";

export interface PackageJSONLicense {
  type?: string | undefined | null;
}

export interface PackageJSON {
  license?: string | PackageJSONLicense;
  licenses?: PackageJSONLicense[] | PackageJSONLicense;
}

// code from https://github.com/cutenode/liblice/blob/master/lib/parseLicense.js
export function parsePackageLicense(
  packageJSON: PackageJSON
): string {
  if (packageJSON.license !== undefined) {
    if (typeof packageJSON.license === "string") {
      return handleUndefinedAndNull(packageJSON.license);
    }

    if (typeof packageJSON.license === "object") {
      return handleUndefinedAndNull(packageJSON.license.type);
    }
  }

  if (packageJSON.licenses !== undefined) {
    if (Array.isArray(packageJSON.licenses)) {
      return handleUndefinedAndNull(packageJSON.licenses[0].type);
    }

    if (typeof packageJSON.licenses === "object") {
      return handleUndefinedAndNull(packageJSON.licenses.type);
    }
  }

  return kInvalidLicense;
}

export function handleUndefinedAndNull(
  licenseString?: string | null | undefined
): string {
  // eslint-disable-next-line no-eq-null
  return licenseString == null ? kInvalidLicense : licenseString;
}

export function extractDirentLicenses(
  dirents: Dirent[]
): string[] {
  return dirents
    .flatMap((dirent) => (dirent.isFile() && dirent.name.toLowerCase().includes("license") ? [dirent.name] : []));
}
