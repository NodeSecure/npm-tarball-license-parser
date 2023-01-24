// Import Third-party Dependencies
import { spdxLicenseConformance } from "@nodesecure/licenses-conformance";

interface license extends spdxLicenseConformance {
  from: string;
}

interface NtlpResult {
  /**
   * List of license (with their SPDX conformance)
   */
  licenses: license[];
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
  invalidLicenseIds: string[];
}

declare function searchAndParseLicenses(location: string): Promise<NtlpResult>;

export { searchAndParseLicenses, license, NtlpResult };
