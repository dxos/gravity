# DXOS Development NPM Registry

To facilitate automated regular builds of experimental/in-development code across multiple git repositories, a private proxying npm registry has been deployed at http://npm.dev.dxos.network:5736/ . This npm registry allows publication of packages privately (they don't appear on npmjs.org), but also allows package fetching for "downstream" package builds, to fetch packages from itself if they exist at a higher semver, or from npmjs if they don't.
