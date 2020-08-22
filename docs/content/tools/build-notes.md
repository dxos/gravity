# Build Notes

## Yarn

`yarn install` may fail with:

```
error An unexpected error occurred: "expected workspace package to exist for \"@babel/template\"".
```

Workaround: revert to `yarn` version 1.18. This can be done on a per-project basis using:

```
$ yarn policies set-version 1.18.0
```

See [this bug report](https://github.com/yarnpkg/yarn/issues/7807) for more details and latest status.
