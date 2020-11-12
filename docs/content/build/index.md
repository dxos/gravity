# Build System Guide

## Creating repositories and packages

- New repos AND npm packages require a PR with sign-off from the PM/TL.
- The default branch is `main`. 
- The branches beta, and release must exist.
- 'beta' branch only accepts merges from main.
- 'release' branch only accepts merges from beta.
- The initial version for packages must be `1.0.0`.
- Package, folder, and filenames should typically be lowercase and hyphenated.
  (Exceptions for platform/framework specific content: e.g., React components, mobile apps, etc.)
- Every package.json must include `"dist": "rm -rf dist && NODE_ENV=production webpack",` step for deployment.
- Every package must include app.yml. Use https://github.com/dxos/teamwork/blob/main/apps/teamwork-app/app.yml as an example for now.
- Use the AGPL3 license. See https://github.com/dxos/tutorials/blob/main/LICENSE & https://github.com/dxos/tutorials/blob/main/package.json as examples.
- README.md must include badges for the latest test run status and code coverage amount.
- Use Github Actions for CI. See https://github.com/dxos/teamwork/tree/main/.github/workflows for examples.


- TODO(burdon): Template/set-up? (e.g., LICENSE, README format, etc.)
- TODO(burdon): Describe GH actions and pre-commit hooks.
- TODO(burdon): Describe CI process.
- TODO(burdon): CHANGELOG process.


## Development process guidelines

- All work should be initiated via a GH issue in the relevant project kanban.
- Create a new branch: `<username>/<short-feature-name>`.
- Pull request are required prior to merging to `main`. PRs should include the GH issue.
- Do not use 'feat:' as the commit message. Any PRs which would otherwise step the major version must have approval from @richburdon
- TODO(burdon): Review https://www.conventionalcommits.org/en/v1.0.0 with team (practical?)


## CI
- Every repo must have the following Github Actions:
  - Copy from https://github.com/dxos/teamwork/tree/main/.github/workflows
  - Update test.yml to use the name of the app being deployed
- Every repo must contain a scripts folder with deploy_apps_to_wns.sh. See https://github.com/dxos/teamwork/blob/main/scripts/deploy_apps_to_wns.sh to copy.
- TODO(burdon): Describe main > beta > release process.
- TODO(burdon): Release process: https://github.com/googleapis/release-please
- TODO(burdon): Code coverage.


## Lint

- There is a DXOS univeral eslint plugin [here](https://github.com/dxos/eslint-config), providing setup for react application as well.


## TODO

- TODO(burdon): Copy test-driven development guide here.
- TODO(burdon): Create chart of all tools (git, npm, yarn, jest, verdaccio, CI?) or separate file for each.
