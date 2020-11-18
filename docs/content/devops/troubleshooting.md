# Build System Troubleshooting

## Yarn errors

`yarn install` may fail with:

```
error An unexpected error occurred: "expected workspace package to exist for \"@babel/template\"".
```

Workaround: revert to `yarn` version 1.18. This can be done on a per-project basis using:

```
$ yarn policies set-version 1.18.0
```

See [this bug report](https://github.com/yarnpkg/yarn/issues/7807) for more details and latest status.

## Local development errors
Workspaces may become corrupt.
- First check that you have pulled the latest code
- Do the cleanup steps in the [yarn doc](tools/yarn.md)
- Attempt a clean clone in another folder
- Check the behavior on the deployed app, inspect the 
- If you can still reproduce the issue with a clean clone, file an issue in the repo. Include the SHA, steps to reproduce, relevant logs, and if possible a screenshot or gif.
