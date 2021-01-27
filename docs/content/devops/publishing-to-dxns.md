# Publishing to DXNS

This guide explains how to publish applications to DXNS.

## Pre-requisites

Install the DXOS CLI.

```bash
yarn global add @dxos/cli@beta
```

Then install the required extensions:

```bash
dx extension install @dxos/cli-registry
dx extension install @dxos/cli-data
dx extension install @dxos/cli-app
dx extension install @dxos/cli-bot
dx extension install @dxos/cli-ipfs
```

For more information (including instructions for updating the CLI) see the 
[@dxos/cli](https://github.com/dxos/cli/blob/main/packages/cli/README.md) repo.

## Create a profile

To use the DXNS devnet, run the following commands to import the `devnet-moon` profile:

```bash
dx profile init --name devnet-moon --template-url https://git.io/JUkhm
export DX_PROFILE="devnet-moon"
```

Optionally add the profile environment variable to your shell profile.

## Credentials

Publishing apps within the `dxos` domain require shared credentials.
Get the values of the `REGISTRY_BOND_ID` and `REGISTRY_USER_KEY` secrets from @telackey.

Make sure your profile is configured for publishing to Registry. 
Edit `~/.dx/profile/devnet-moon.yml`, updating the `services.registry` section with the following settings:

```
registry:
  server: 'https://registry1.kube.moon.dxos.network/api'
  userKey: 'Use quotes and set it equal to the value of REGISTRY_USER_KEY'
  bondId: 'Use quotes and set it equal to the value of REGISTRY_BOND_ID'
  chainId: devnet-2
  gas: '200000'
  fees: '200000udxt'
```

## Configure IPFS

Applicaiton assets are published to and IPFS node on the devnet.
Edit `~/.dx/profile/devnet-moon.yml`, updating the `services.registry` section with the following settings:

```
ipfs:
  server: 'https://apollo1.kube.moon.dxos.network/dxos/ipfs/api'
  gateway: 'https://apollo1.kube.moon.dxos.network/dxos/ipfs/gateway'
```

## Publishing applications

Application packages should contain an `app.yml` config file 
(see the example [Tasks App](https://github.com/dxos/tutorials/tree/main/apps/tasks-app)).

To deploy an application, the build assets are first published to a devnet IPFS node,
then the application metadata is registered with the DXNS blockchain.

```bash
cd apps/tasks-app
dx app build
dx app publish
dx app register --name dxn://dxos/application/tasks-app
```

Once registered, the application record should be visible via the CLI and the 
[DXNS Console](https://apollo1.kube.moon.dxos.network/app/dxn:dxos:application:console/#/apps).

```bash
dx app query
```
