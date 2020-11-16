# Github Repos

This guide is an overview of structure of each repo and monorepo.

## Set-up

- New Github repos AND NPM packages require a PR approval from the PM/TL.
- Use the AGPL3 license (e.g., see `LICENSE` and `package.json` in https://github.com/dxos/gravity)
- The default branch should be `main`.
- Package, folder, and filenames should typically be lowercase and hyphenated.
  (Exceptions for platform/framework specific content: e.g., React components, mobile apps, etc.)
- TODO(burdon): Template (or example) repo?
- Configure ESLint using the [DXOS plugin](https://github.com/dxos/eslint-config).


## NPM Packages

- The initial version for published packages should be `1.0.0`.


## Branches

- Repos under full QA should have `beta` and `release` system branches.
- Merging to these branches will trigger Github actions that automatically pulish new NPM packages
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
| [Playright](https://github.com/microsoft/playwright-test)  | Automated React UX tests      |
| gravity       | Integration and stress tests  |

- TODO(burdon): Reference GH workflow assets.


## Github Workflows and Actions

- TODO(burdon): Standarize actions (tests, coverage, release, etc.)
- TODO(burdon): Reference sample project with canonical workflow definitions (e.g., @dxos/echo?)


## Badges

- TODO(burdon): Reference sample project with canonical workflow definitions (e.g., @dxos/echo?)
