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

## Publishing a package to the Development NPM Registry 



