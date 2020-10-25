# Build System Guide

## Creating repositories and packages

- New repos AND npm packages require a PR with sign-off from the PM/TL.
- The default branch is `main`.
- The initial version for packages should be `1.0.0`.
- Package, folder, and filenames should typically be lowercase and hyphenated.
  (Exceptions for platform/framework specific content: e.g., React components, mobile apps, etc.)

- TODO(burdon): Template/set-up? (e.g., LICENSE, README format, etc.)
- TODO(burdon): Describe GH actions and pre-commit hooks.
- TODO(burdon): Describe CI process.
- TODO(burdon): CHANGELOG process.


## Development process guidelines

- All work should be initiated via a GH issue in the relevant project kanban.
- Create a new branch: `<username>/<short-feature-name>`.
- Pull request are required prior to merging to `main`. PRs should include the GH issue.
- TODO(burdon): Review https://www.conventionalcommits.org/en/v1.0.0 with team (practical?)


## CI

- TODO(burdon): Describe main > beta > release process.
- TODO(burdon): Release process: https://github.com/googleapis/release-please
- TODO(burdon): Code coverage.


## Lint

- TODO(burdon): Describe lint setup.


## TODO

- TODO(burdon): Copy test-driven development guide here.
- TODO(burdon): Create chart of all tools (git, npm, yarn, jest, verdaccio, CI?) or separate file for each.
