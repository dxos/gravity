# Yarn

## Performing a clean install

Sometimes installed dependencies get corrupted and it's necessary to perform a clean install. This will also re-run postinstall scripts such as installing git hooks. Use this command to do a clean install:

```bash
yarn install --force
```

In certain cases the above command is not enough: for example there are multiple conflicting versions of same package in a single repo. In this case you can clean your repo and install from scratch.

**IMPORTANT: This will also delete any uncommited files**

```base
# Run in repo root
git clean -fdx
yarn
```

## Lockfile linting

We use [lockfile-lint](https://www.npmjs.com/package/lockfile-lint) to validate lockfile. This ensures that url from private NPM registries don't get into lockfiles. The following command is used in our repos:

```bash
lockfile-lint --path yarn.lock --allowed-hosts yarn npm codeload.github.com --validate-https
```

## Pre-commit hook

We use [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged) to run linter automatically before every commit. They will run the linter on every file that's staged for the commit.

### Disabling per-commit hook

Pre-commit hook can also be disabled locally by adding following env variable to your `.profile`.

```bash
HUSKY_SKIP_INSTALL=1
```

This is safe to do because the linter is run again in the CI, so as long as no PRs with failing CI get merged, no lint errors should appear on main. 

## Running batch jobs in monorepos 

It is recommended to use [wsrun](https://www.npmjs.com/package/wsrun) to orchestrate jobs in monorepo. In contrast to lerna it forwards CLI arguments properly.
This way running `yarn lint --fix` in monorepo root will result in same arguments passed to linters in individual packages.

A typical setup might look like this:

```json
{
  "scripts": {
    "build": "wsrun -t build",
    "lint": "wsrun lint",
    "test": "wsrun test"
  }
}
```

Notice `-t` flag in build command specifying that jobs should be performed in stages, ensuring that all of the dependencies of given packages are build before attempting to build the dependant package.

It is also discouraged to stack multiple lint commands in a lint job as this prevents arguments from being forwarded properly. Example:

```json
{
  // Don't do this
  "lint": "wsrun lint && lockfile-lint",
}
```

## Typescript

### Project references

Specifying references to other typescript packages in the same monorepo significantly improves developer experience. For example this is `tsconfig.json` from `@dxos/echo-db` package:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": [
    "src",
  ],
  "references": [
    { "path": "../echo-protocol" },
    { "path": "../model-factory" },
    { "path": "../object-model" },
    { "path": "../util" }
  ]
}
```

Project references ensure that the compiler will inspect package source instead of compiled artifacts which might be stale.
For example: a new export added in `echo-protocol` is immediately available to be imported in `echo-db` without having to recompile `echo-protocol` first.

## Linter

We have a general linter config for typescript and react projects available at https://github.com/dxos/eslint-config.
