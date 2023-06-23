# npm tarball license parser

![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/NodeSecure/npm-tarball-license-parser/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/NodeSecure/npm-tarball-license-parser/graphs/commit-activity)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/NodeSecure/npm-tarball-license-parser/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/NodeSecure/npm-tarball-license-parser)
[![mit](https://img.shields.io/github/license/NodeSecure/npm-tarball-license-parser.svg?style=for-the-badge)](https://github.com/NodeSecure/npm-tarball-license-parser/blob/master/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/NodeSecure/npm-tarball-license-parser/node.js.yml?style=for-the-badge)

Fetch all licenses and their SPDX conformance from a given npm tarball.

## Requirements
- [Node.js](https://nodejs.org/en/) v16 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/ntlp
# or
$ yarn add @nodesecure/ntlp
```

## Usage example

```js
import * as ntlp from "@nodesecure/ntlp";

const licenses = await ntlp.searchAndParseLicenses(
  process.cwd()
);
console.log(licenses);
```

## API

### searchAndParseLicenses(location: string): Promise< NtlpResult >
Search and parse all licenses at the given location. Return all licenses with their SPDX conformance.

```ts
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

// see: https://github.com/NodeSecure/licenses-conformance
interface license extends spdxLicenseConformance {
  from: string;
}
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-tarball-license-parser/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/npm-tarball-license-parser/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/npm-tarball-license-parser/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/npm-tarball-license-parser/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://tonygo.dev"><img src="https://avatars.githubusercontent.com/u/22824417?v=4?s=100" width="100px;" alt="Tony Gorez"/><br /><sub><b>Tony Gorez</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-tarball-license-parser/commits?author=tony-go" title="Code">💻</a> <a href="https://github.com/NodeSecure/npm-tarball-license-parser/commits?author=tony-go" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/npm-tarball-license-parser/pulls?q=is%3Apr+reviewed-by%3Atony-go" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/QuentinLpy"><img src="https://avatars.githubusercontent.com/u/31780359?v=4?s=100" width="100px;" alt="Quentin Lepateley"/><br /><sub><b>Quentin Lepateley</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-tarball-license-parser/commits?author=QuentinLpy" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Rossb0b"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt="Nicolas Hallaert"/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-tarball-license-parser/commits?author=Rossb0b" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kawacrepe"><img src="https://avatars.githubusercontent.com/u/40260517?v=4?s=100" width="100px;" alt="Vincent Dhennin"/><br /><sub><b>Vincent Dhennin</b></sub></a><br /><a href="https://github.com/NodeSecure/npm-tarball-license-parser/commits?author=Kawacrepe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fabnguess"><img src="https://avatars.githubusercontent.com/u/72697416?v=4?s=100" width="100px;" alt="Kouadio Fabrice Nguessan"/><br /><sub><b>Kouadio Fabrice Nguessan</b></sub></a><br /><a href="#maintenance-fabnguess" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
