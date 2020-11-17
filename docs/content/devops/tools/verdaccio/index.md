# Verdaccio

Use the private [Verdaccio](https://github.com/verdaccio/verdaccio) server for experimental development.

- Access here: http://npm.dev.dxos.network:5736
- Set both `npm` and `yarn` environment variables:

```
export YARN_REGISTRY=http://npm.dev.dxos.network:5736/
export NPM_CONFIG_REGISTRY=http://npm.dev.dxos.network:5736/
```

TODO(burdon): Why was 5736 chosen and link to registry of used port numbers. The docs reference 4873.

- Delete `yarn.lock` when switching between Verdaccio and production servers.
  (NOTE: The hostname is part of the package definition and is not reset by `yarn --force`.)

## Authentication

Create a local account (matching your public npm username).

```
export NPM_CONFIG_REGISTRY=http://npm.dev.dxos.network:5736
npm login
```

## Publishing

Publish using `npm publish` as normal. Lerna requires the `--registry` option.

```
yarn lerna publish --registry http://npm.dev.dxos.network:5736/ -y prerelease --dist-tag="beta" --force-publish
```
