// Import Third-party Dependencies
import { licenseIdConformance } from "@nodesecure/licenses-conformance";

export default class licenseResult {
  /** @type {Set<string>} */
  #uniqueLicenseIds = new Set();
  #invalidLicenseIds = new Set();
  #licenses = [];

  /**
   * @param {!string} licenseID
   * @param {!string} source
   * @returns {void}
   */
  addLicenseID(licenseID, source) {
    if (typeof licenseID !== "string") {
      return;
    }

    const conformanceResult = licenseIdConformance(licenseID);
    if (!conformanceResult.ok) {
      this.#invalidLicenseIds.add(licenseID);

      return;
    }

    const license = conformanceResult.value;
    license.from = source;
    license.uniqueLicenseIds
      .forEach((id) => this.#uniqueLicenseIds.add(id));

    this.#licenses.push(license);
  }

  toJSON() {
    return {
      uniqueLicenseIds: [...this.#uniqueLicenseIds],
      invalidLicenseIds: [...this.#invalidLicenseIds],
      hasMultipleLicenses: this.#uniqueLicenseIds.size > 1,
      licenses: this.#licenses
    };
  }
}
