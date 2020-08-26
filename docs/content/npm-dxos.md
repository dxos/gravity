# DXOS Development NPM Registry

To facilitate automated regular builds of experimental/in-development code across multiple git repositories, a private proxying npm registry has been deployed at http://npm.dev.dxos.network:5736/ . This npm registry allows publication of packages privately (they don't appear on npmjs.org), but also allows package fetching for "downstream" package builds, to fetch packages from itself if they exist at a higher semver, or from npmjs if they don't.

## Using the Development NPM Registry to build a package

If using yarn set `YARN_REGISTRY`:
```
export YARN_REGISTRY=http://npm.dev.dxos.network:5736/
```

If using npm set `NPM_CONFIG_REGISTRY`:
```
export NPM_CONFIG_REGISTRY=http://npm.dev.dxos.network:5736/
```

Note that many packages as part of their build process run `npm` so even if you think you're using just `yarn`, you're not and so both environment variables should be set.

Also note that a registry host name is "baked" into the file `yarn.lock` and therefore in order to fetch packages from the development registry it will be necessary to either delete `yarn.lock` prior to running `yarn`, or to ensure that `yarn.lock` already references the intended registry host name.

## Publishing a package to the Development NPM Registry 

BEWARE: It is relatively easy to create a scenario where publication will occur to the public npm registry, for example by having a valid `npm login` token for npmjs.org, and forgetting to set `NPM_CONFIG_REGISTRY` or by using `lerna` which does not honor the environment variable, and forgetting to pass `--registry`.

## Authentication

To publish you need to have previously created a user on npm.dev.dxos.network. Users are automatically created upon first login.

```
$ export NPM_CONFIG_REGISTRY=http://npm.dev.dxos.network:5736/
$ npm login
Username: david
Password:
Email: (this IS public) david@dxos.network
Logged in as david on http://npm.dev.dxos.network:5736/.
$
```

### Publish using Lerna

Add `--registry` to the lerna command line (lerna does not honor `NPM_CONFIG_REGISTRY`, e.g.:

```
$ yarn lerna publish --registry http://npm.dev.dxos.network:5736/ -y prerelease --dist-tag="beta" --force-publish
```

### Publish using npm

Having set `NPM_CONFIG_REGISTRY` as above, run `npm publish` as normal.
