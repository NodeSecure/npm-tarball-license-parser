import { license } from "@nodesecure/licenses-conformance";

declare namespace ntlp {
  interface result {
      licenses: license[];
      hasMultipleLicenses: boolean;
      uniqueLicenseIds: string[];
  }
}

declare function ntlp(tarballDir: string): Promise<ntlp.result>;

export = ntlp;
export as namespace ntlp;
