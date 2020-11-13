# Migration and Deploy Directions

TODO(burdon): Split publishing packages (release please) and publishing apps (wire)

## Pre-requisties
TODO(burdon): Remove and reference other document.
- The repo should conform to the expectations of https://github.com/dxos/gravity/blob/main/docs/content/build/index.md
- Specifically:
  - main, beta, and release branches must exist // TODO(burdon): How? Refernce packages.md?
  - app.yml must exist and be configured in the root of the folder // TODO(burdon): This is incorrect.
  - package.json must include a dist command : "dist": "rm -rf dist && NODE_ENV=production webpack"
  - The 4 Github Actions from the teamwork repo must be copied over and test.yml modified. Copy from https://github.com/dxos/teamwork/tree/main/.github/workflows
  - The repo must contain a scripts folder with deploy_apps_to_wns.sh. See https://github.com/dxos/teamwork/blob/main/scripts/deploy_apps_to_wns.sh to copy.
- Github org level secrets must exist for WNS_BOND_ID and WNS_USER_KEY https://github.com/organizations/dxos/settings/secrets/actions
  
### Migration Conditions
TODO(burdon): Remove and reference other document.
- Main
  - When a sufficient collection of features have accumulated in main to complete a milestone and it passes QA, main must be merged into beta with PM approval.

- Beta
  - When the new features and fixes migrated from main have been properly tested by QA and the tests pass, beta must be merged into release with PM approval.
  - If emergent errors due to the features and fixes are discovered, they must be fixed in main then uplifted to beta. Beta must not migrate new, broken features.

### Deployment Conditions
TODO(burdon): Remove and reference other document.
- Main: Deployment is managed via Github Actions and occurs for every successful merge.
- Beta: Deployment is managed via Github Actions and occurs for every successful merge from main into beta.
- Release: Deployment is managed via Github Actions and occurs for every successful merge from beta into release.

# Manual Deployment Directions
TODO(burdon): Remove and reference other document.
Manual deployments should be avoided at all costs. If you are not @richburdon or @telackey you must ask their permission first.
Before deploying, post an announcement message in #general and mention @RB, @Alex Wykoff 

## Manual Deployment Pre-requisties
Make sure you are using the DXOS CLI v2 or above.

```bash
yarn global add @dxos/cli@beta
```

If you need to upgrade, follow the directions in the CLI repo.

https://github.com/dxos/cli/blob/main/packages/cli/README.md

Activate devnet-moon profile:

```bash
wire profile init --name devnet-moon --template-url https://git.io/JUkhm
export WIRE_PROFILE="devnet-moon"
```

**IMPORTANT!** Make sure you are using the same profile in all terminal windows you are using. It makes sense to put `export WIRE_PROFILE="devnet-moon"` into a bash profile.

Install the required extensions

```bash
wire extension install @dxos/cli-wns
wire extension install @dxos/cli-data
wire extension install @dxos/cli-app
wire extension install @dxos/cli-bot
wire extension install @dxos/cli-ipfs
```

### WNS
Get the values of the WNS_BOND_ID and WNS_USER_KEY secrets from @telackey
Make sure your profile is configured for publishing to WNS. Open `~/.wire/profile/devnet-moon.yml` and edit `services.wns` section so it would look like:

```
wns:
  server: 'https://wns1.kube.moon.dxos.network/api'
  userKey: 'Use quotes and set it equal to the value of WNS_USER_KEY'
  bondId: 'Use quotes and set it equal to the value of WNS_BOND_ID'
  chainId: devnet-2
  gas: '200000'
  fees: '200000uwire'
```

### IPFS
Make sure your profile configured for uploading to IPFS. Open `~/.wire/profile/devnet-moon.yml` and edit `services.ipfs` section so it would look like:

```
ipfs:
  server: 'https://apollo1.kube.moon.dxos.network/dxos/ipfs/api'
  gateway: 'https://apollo1.kube.moon.dxos.network/dxos/ipfs/gateway'
```

### App
Navigate into the app folder then issue the build, publish, and register commands. 'tasks-app' is used in this example:

```bash
cd apps/tasks-app
wire app build
wire app publish
wire app register --name wrn://dxos/application/tasks-app
```

## DXOS KUBE Console
Now that you have published and registered your app, visit https://apollo1.kube.moon.dxos.network/app/wrn:dxos:application:console/#/apps and confirm that the deployment is complete.
Post a deployment complete message on #general and mention @RB, @Alex Wykoff 
