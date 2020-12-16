# Publishing to WNS

This guide explains how to publish applications to WNS.

## Pre-requisites

Install the DXOS CLI with the `cli-machine` extension.

```bash
yarn global add @dxos/cli
```

Then install the required extensions:

```bash
wire extension install @dxos/cli-machine
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

Creating Kubes using `wire machine` requires a Digital Ocean API token for creating the droplets, and a GitHub token for checking out the Kube
code. If the Kubes are to be registered, DXNS credentials for the `dxos` domain are also required.

These may be added to your `wire` profile, or set in your environment.  The environment variables for these are:

```bash
WIRE_MACHINE_DO_TOKEN
WIRE_MACHINE_GITHUB_TOKEN
WIRE_WNS_USER_KEY
WIRE_WNS_BOND_ID
```

Make sure your profile is configured for publishing to DXNS. 
Edit `~/.wire/profile/devnet-moon.yml`, updating the `services.wns` and `services.machine` sections with the following settings:

```
wns:
  server: 'https://wns1.kube.moon.dxos.network/api'
  userKey: 'Use quotes and set it equal to the value of WIRE_WNS_USER_KEY'
  bondId: 'Use quotes and set it equal to the value of WIRE_WNS_BOND_ID'
  chainId: devnet-2
  gas: '200000'
  fees: '200000uwire'
machine:
  doAccessToken: 'Use quotes and set it equal to WIRE_MACHINE_DO_TOKEN'
  githubAccessToken: 'Use quotes and set it equal to WIRE_MACHINE_GITHUB_TOKEN'
  dnsDomain: 'kube.moon.dxos.network'
```

## Listing and Inspecting Kubes

```bash
$ wire machine list | jq '.machines[].name'
"alpha"
"egor"
"apollo1"
"apollo2"
"apollo3"
"radicle"
"blockexplorer"
"ipfs"

$ wire machine info --name ipfs
{
  "machine": {
    "name": "ipfs",
    "created_at": "2020-11-25T06:33:28Z",
    "memory": 8192,
    "vcpus": 4,
    "ip_address": "167.71.191.105",
    "fqdn": "ipfs.kube.moon.dxos.network"
  }
}
```

## Creating a Kube
```
$ wire machine create
{
  "machine": {
    "name": "kube557cb42a",
    "created_at": "2020-12-16T17:01:49Z",
    "memory": 4096,
    "vcpus": 2,
    "ip_address": "104.236.25.164",
    "fqdn": "kube557cb42a.kube.moon.dxos.network"
  }
}
```

## Removing a Kube
```
$ wire machine delete --name kube557cb42a
$ wire machine info --name kube557cb42a
{
  "machine": {}
}
```

## Registering in DXNS
To have the Kube register itself in DXNS, add the `--register` option when creating it.
This will create a DXNS entry for the Kube itself, as well as for the IPFS, signal, and bot-factory services.

```
$ wire machine create --name mykube --register
```

## Other CLI versions

You can install a Kube using `alpha` or `beta` versions of the CLI with the `--cliver` option:

```
$ wire machine create --name alpha --cliver '@alpha'
```

## Registered Kubes

The main public Kubes in use are `apollo1`, `apollo2`, and `apollo3`.
These nodes have proper SSL certificates from Let's Encrypt, run Radicle, automatically pin all apps, bots, and files registered in DXNS,
have registered IPFS, signal, and bot-factory services, etc.

The command to create a Kube in this configuration is:

> NOTE: You _must_ provide a legitimate e-mail address for Let's Encrypt.

```bash
$ wire machine create \
  --name apollo4 \
  --pin \
  --letsencrypt \
  --email your_real_email@goes.here \
  --extension "dxos/radicle-seed-node" \
  --register
```

The issuance of Let's Encrypt certificates has tight throttling, so it is best not to recreate machines which use
them more than absolutely necessary.

When it is necessary, after deleting the existing Kube, you will have to wait for the DNS registration TTL to lapse
before recreating one with the same name, else Let's Encrypt may attempt to use the old IP address during verification and fail.

For example, if you must recreate `apollo2` from scratch, do this:

```
$ wire machine delete --name apollo2

# Wait 30 minutes (to be safe).
$ sleep 1800 

$ wire machine create --name apollo2 --extension dxos/radicle-seed-node --pin --letsencrypt --email your_real_email@goes.here --register
```
