# Publishing to DXNS

This guide explains how to publish applications to DXNS.

## Pre-requisites

Install the DXOS CLI.

```bash
yarn global add @dxos/cli@beta
```

Then install the required extensions:

```bash
wire extension install @dxos/cli-wns
wire extension install @dxos/cli-data
wire extension install @dxos/cli-app
wire extension install @dxos/cli-bot
wire extension install @dxos/cli-ipfs
```

For more information (including instructions for updating the CLI) see the 
[@dxos/cli](https://github.com/dxos/cli/blob/main/packages/cli/README.md) repo.

## Create a profile

To use the DXNS devnet, run the following commands to import the `devnet-moon` profile:

```bash
wire profile init --name devnet-moon --template-url https://git.io/JUkhm
export WIRE_PROFILE="devnet-moon"
```

Optionally add the profile environment variable to your shell profile.

## Credentials

Publishing apps within the `dxos` domain require shared credentials.
Get the values of the `WNS_BOND_ID` and `WNS_USER_KEY` secrets from @telackey.

Make sure your profile is configured for publishing to WNS. 
Edit `~/.wire/profile/devnet-moon.yml`, updating the `services.wns` section with the following settings:

```
wns:
  server: 'https://wns1.kube.moon.dxos.network/api'
  userKey: 'Use quotes and set it equal to the value of WNS_USER_KEY'
  bondId: 'Use quotes and set it equal to the value of WNS_BOND_ID'
  chainId: devnet-2
  gas: '200000'
  fees: '200000uwire'
```

## Configure IPFS

Applicaiton assets are published to and IPFS node on the devnet.
Edit `~/.wire/profile/devnet-moon.yml`, updating the `services.wns` section with the following settings:

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
wire app build
wire app publish
wire app register --name wrn://dxos/application/tasks-app
```

Once registered, the application record should be visible via the CLI and the 
[DXNS Console](https://apollo1.kube.moon.dxos.network/app/wrn:dxos:application:console/#/apps).

```bash
wire app query
```
