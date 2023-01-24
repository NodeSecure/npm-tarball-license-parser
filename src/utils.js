const kInvalidLicense = "invalid license";

// code from https://github.com/cutenode/liblice/blob/master/lib/parseLicense.js
export function parsePackageLicense(file) {
  if (file.license !== undefined) {
    if (typeof file.license === "string") {
      return handleUndefinedAndNull(file.license);
    }

    if (typeof file.license === "object") {
      return handleUndefinedAndNull(file.license.type);
    }
  }

  if (file.licenses !== undefined) {
    if (Array.isArray(file.licenses)) {
      return handleUndefinedAndNull(file.licenses[0].type);
    }

    if (typeof file.licenses === "object") {
      return handleUndefinedAndNull(file.licenses.type);
    }
  }

  return kInvalidLicense;
}

export function handleUndefinedAndNull(licenseString) {
  return licenseString === undefined ? kInvalidLicense : licenseString;
}
