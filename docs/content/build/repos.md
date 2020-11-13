# Github Repos

- TODO(burdon): Move to developer guide.
- New repos AND npm packages require a PR with sign-off from the PM/TL.
- The default branch is `main`. 
- The branches beta, and release must exist.
- 'beta' branch only accepts merges from main.
- 'release' branch only accepts merges from beta.
- The initial version for packages must be `1.0.0`.
- Package, folder, and filenames should typically be lowercase and hyphenated.
  (Exceptions for platform/framework specific content: e.g., React components, mobile apps, etc.)
- Use the AGPL3 license. 
  See https://github.com/dxos/tutorials/blob/main/LICENSE & https://github.com/dxos/tutorials/blob/main/package.json as examples.
- Use Github Actions for CI. See https://github.com/dxos/teamwork/tree/main/.github/workflows for examples.
- README.md must include badges for the latest test run status and code coverage amount.


- TODO(burdon): Every package.json must include `"dist": "rm -rf dist && NODE_ENV=production webpack",` step for deployment.
- TODO(burdon): Every package must include app.yml. Use https://github.com/dxos/teamwork/blob/main/apps/teamwork-app/app.yml as an example for now.
- TODO(burdon): Template/set-up? (e.g., LICENSE, README format, etc.)
- TODO(burdon): Describe GH actions and pre-commit hooks.
- TODO(burdon): Describe CI process.
- TODO(burdon): CHANGELOG process.
