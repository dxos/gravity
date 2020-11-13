# Github Repos

This guide is an overview of structure of each repo and monorepo.

- New repos AND npm packages require a PR with sign-off from the PM/TL.
- The default branch is `main`. 
- The branches beta, and release must exist.
- TODO(burdon): Move to other doc
  - 'beta' branch only accepts merges from main.
  - 'release' branch only accepts merges from beta.
- The initial version for packages must be `1.0.0`.
- Package, folder, and filenames should typically be lowercase and hyphenated.
  (Exceptions for platform/framework specific content: e.g., React components, mobile apps, etc.)
- Use the AGPL3 license (e.g., see `LICENSE` and `package.json` in https://github.com/dxos/gravity)
- TODO(burdon): Ref gravity? Use Github Actions for CI. See https://github.com/dxos/teamwork/tree/main/.github/workflows for examples.
- TODO(burdon): List badges or reference gravity repo: README.md must include badges for the latest test run status and code coverage amount.

- Todo
  - TODO(burdon): Template/set-up? (e.g., LICENSE, README format, etc.)
  - TODO(burdon): Move to react: Every package.json must include `"dist": "rm -rf dist && NODE_ENV=production webpack",` step for deployment.
  - TODO(burdon): Move to DXOS apps: Every package must include app.yml. Use https://github.com/dxos/teamwork/blob/main/apps/teamwork-app/app.yml as an example for now.
  - TODO(burdon): Describe GH actions and pre-commit hooks.
  - TODO(burdon): Describe CI process.
  - TODO(burdon): CHANGELOG process.
