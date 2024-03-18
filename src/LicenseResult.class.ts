// Import Third-party Dependencies
import {
  licenseIdConformance,
  searchSpdxLicenseId,
  spdxLicenseConformance
} from "@nodesecure/licenses-conformance";

export interface SpdxLicenseConformance extends spdxLicenseConformance {
  from: string;
}

export interface InvalidLicense {
  licenseId: string;
  reason: string;
}

export interface SpdxExtractedResult {
  /**
   * List of license (with their SPDX conformance)
   */
  licenses: SpdxLicenseConformance[];
  /**
   * Has multiple unique licenses (MIT, ISC ..)
   */
  hasMultipleLicenses: boolean;
  /**
   * Unique list of license (MIT, ISC). The list cannot contain duplicate.
   */
  uniqueLicenseIds: string[];
  /**
   * List of licenses with no SPDX (or with invalid ids).
   */
  invalidLicenseIds: InvalidLicense[];
}

export class LicenseResult {
  #uniqueLicenseIds: Set<string> = new Set();
  #invalidLicenseIds: Map<string, string> = new Map();
  #licenses: SpdxLicenseConformance[] = [];

  addLicenseIDFromSource(source: string, file: string) {
    const licenseID = searchSpdxLicenseId(source);
    if (licenseID !== null) {
      this.addLicenseID(licenseID, file);
    }

    return this;
  }

  addLicenseID(licenseID: string, source: string) {
    const conformanceResult = licenseIdConformance(licenseID);
    if (!conformanceResult.ok) {
      this.#invalidLicenseIds.set(licenseID, conformanceResult.value.message);

      return this;
    }

    const license = { ...conformanceResult.value, from: source };
    license.uniqueLicenseIds
      .forEach((id) => this.#uniqueLicenseIds.add(id));

    this.#licenses.push(license);

    return this;
  }

  toJSON(): SpdxExtractedResult {
    return {
      uniqueLicenseIds: [...this.#uniqueLicenseIds],
      invalidLicenseIds: [...this.#invalidLicenseIds.entries()]
        .map(([licenseId, reason]) => {
          return { licenseId, reason };
        }),
      hasMultipleLicenses: this.#uniqueLicenseIds.size > 1,
      licenses: this.#licenses
    };
  }
}
