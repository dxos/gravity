# Development Guide

## Development process

- Development work should typically be initiated from a GH issue in the relevant project kanban.
- Create a new branch: `<username>/<short-feature-name>`.
- Pull requests should ideally reference the associated Github issue(s).


## Branches, merging and publishing

- Repos should contain the necessary [tests](./git-repos.md) that must pass (triggered by Github actions)
  before merging to `main` is allowed.
- NPM packages are automatically published via [Release Please](https://github.com/googleapis/release-please).
  This automatically updates the repo's `CHANGELOG` file.
- Release Please uses [Coventional Commits](https://www.conventionalcommits.org/en/v1.0.0) to trigger publishing.
- Typically before submitting a feature PR, the repo's dependencies should be updated:
  - Use https://github.com/dxos/lint-version. It is our internal tool for updating dependencies and should be used instead of `yarn --upgrade-interactive`
- When upgrading a dependency, be certain to uplift through consuming libraries and apps. See Process Example and Scenario as an example.

## Process Example
![](https://raw.githubusercontent.com/dxos/gravity/main/docs/content/images/packages.svg?token=AA24GGY2K5JTUCZBLQA2ML27XVRJE)
- ECHO - Current version : 2.6.4
- sdk/client - Current version : 2.7.7-alpha.0
- sdk/client - Current @dxos/echo-db target : ^2.6.4-alpha.0
- sdk/react-client - Current version : 2.7.7-alpha.0
- sdk/react-client - Current @dxos/echo-db target : ^2.6.4-alpha.0
- Tasks App - Current version : 1.0.0
- Tasks App - Current @dxos/react-client target : ^2.7.6-alpha.0


### Scenario - Upgrade ECHO and have Tasks App use the latest version

- ECHO version updates to 2.6.5-alpha.0 in main branch due to the use of release-please with a conventional commit tag.
- If CI passes and merge into main is complete, @dxos/echo-db 2.6.5-alpha.0 is published to NPM via Github Action `main-release-please`
- To consume the change and test with it, a manual effort is made to update the dependencies in SDK/Client and SDK/React-Client.
- When the dependency update is pushed to main, CI will run. If it is successful, SDK/Client and SDK/React-Client will update their version to 2.7.8-alpha.0
- A manual effort is made to update the dependencies in Tasks App.
- When the dependency update is pushed to main, CI will run. If it is successful, Tasks App version will update to 1.0.1

- TODO(wykoff): update when version-check can replace manual update  
- TODO(burdon): Reference `@dxos/version-check`.
