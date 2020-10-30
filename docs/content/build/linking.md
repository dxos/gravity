# Linking

Linking node modules is useful for testing integration of SDK with Teamwork.
You can make changes in SDK and have the changes available in Teamwork (or Arena) without needing to publish to npm/verdaccio.

Linking react libraries is not straightforward, because you have to make sure there is only one instance of react module. Otherwise hooks and other things do not work properly.
The following snippets are proven to work:

## Link SDK into teamwork

1. Source links in SDK

```bash
cd sdk
yarn install && yarn build
cd node_modules && cd react && yarn link && cd ../react-dom && yarn link && cd ../react-router-dom && yarn link && cd ../@material-ui/core && yarn link && cd ../../../packages/client && yarn link && cd ../react-appkit && yarn link && cd ../react-client && yarn link && cd ../react-router && yarn link && cd ../react-ux && yarn link && cd ../../
```

2. Target links in Teamwork

```bash
cd teamwork
yarn install && yarn build
yarn link "@material-ui/core" && yarn link "react" && yarn link "react-dom" && yarn link "react-router-dom" && yarn link "@dxos/react-ux" && yarn link "@dxos/react-router" && yarn link "@dxos/react-client" && yarn link "@dxos/react-appkit" && yarn link "@dxos/client"
```

## Undo linking

1. Remove source links

```bash
cd ~/.config/yarn/link
rm -rf ./@dxos @material-ui react*
```

2. Remove links in Teamwork

```bash
git clean -fdx # Make sure you have no uncomitted changes you want to keep
yarn install && yarn build
```
