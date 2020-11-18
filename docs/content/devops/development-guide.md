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
```bash  
   yarn --upgrade-interactive
```
- TODO(wykoff): update when version-check can replace manual update  
- TODO(burdon): Reference `@dxos/version-check`.

## Troubleshooting
- Refer to our [Troubleshooting Guide](troubleshooting.md)
