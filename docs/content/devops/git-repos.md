# Github Repos

This guide is an overview of structure of each repo and monorepo.

## Set-up

- New Github repos AND NPM packages require a PR approval from the PM/TL.
- Use the AGPL3 license (e.g., see `LICENSE` and `package.json` in https://github.com/dxos/gravity)
- The default branch should be `main`.
- Package, folder, and filenames should typically be lowercase and hyphenated.
  (Exceptions for platform/framework specific content: e.g., React components, mobile apps, etc.)
- For NPM published packages, use ECHO(https://github.com/dxos/echo) as an example.
- For WNS published apps, use the Tasks App in the Tutorials(https://github.com/dxos/tutorials/) repo as an example.
- Configure ESLint using the [DXOS plugin](https://github.com/dxos/eslint-config).


## NPM Packages

- The initial version for published packages should be `1.0.0`.


## Branches

- Repos under full QA should have `beta` and `release` system branches.
- Merging to these branches will trigger Github actions that automatically publish new NPM packages
with the associated tag suffix.

| Branch      | NPM Tag suffix |
| ----------- | -------------- |
| `main`      | `-alpha`       |
| `beta`      | `-beta`        |
| `release`   | None           |

- TODO(burdon): Add example flow (echo, client, react-client, tasks-app, gravity).


## Tests

- All repos should have tests that are required to pass before PRs can be merged.
- These tests include:

| Test          | Purpose                       |
| ------------- | ----------------------------- |
| jest          | Unit and integration tests    |
| nyc           | Code Coverage                 |
| storybooks    | Manual React UX tets          |
| [Playwright](https://github.com/microsoft/playwright-test)  | Automated React UX tests      |
| gravity       | Integration and stress tests  |

- TODO(burdon): Reference GH workflow assets.


## Github Workflows and Actions

- TODO(burdon): Standardize actions (tests, coverage, release, etc.)
- TODO(burdon): Reference sample project with canonical workflow definitions (e.g., @dxos/echo?)
- TODO(wykoff): Rename workflows
- TODO(wykoff): Missing workflows for published apps

| Workflow   | Purpose   | Trigger    |
| --------   |  -------- | ---------  |
| all-lint-build-test    | Run yarn lint, build, & coverage | Every push    |
| beta-publish           | Run yarn lint, build, test & then publish to NPM `-beta` tag or WNS app@beta  | Only on push to `beta` branch |
| main-release-please    | Run [release-please](https://github.com/googleapis/release-please), then yarn lint, build, test     | Only on push to `main` branch |
| release-publish        | Run yarn lint, build, test & then publish to NPM or WNS `app@beta`    | Only on push to `release` branch |


## Badges

- TODO(burdon): Reference sample project with canonical workflow definitions (e.g., @dxos/echo?)
