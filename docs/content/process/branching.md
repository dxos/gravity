# Branching and Naming Convention Across All Projects

The team has chosen to adopt the resolutions in [DEP0](https://github.com/dxos/gravity/issues/32)

All repos are expected to converge on this standard. 

- Developers **MUST** submit their work via pull requests to the **main** branch.  ((currently named 'master' due to grandfathered convention. duplication and migration of default branch is recommended))
Only pull requests which pass CI and review should be merged. This presumes and requires an established CI system.
The CI will use https://github.com/googleapis/release-please to manage publishing and semver. 
- Commit messages should follow https://www.conventionalcommits.org/en/v1.0.0/
- The channel which will be published via this method shall be considered **release**
- The latest version of the main branch at any time shall be considered **main**
- Channels will follow the convention established of rising fidelity `main` -> `dev` -> `beta` -> `release`
(ex: https://github.com/brave/brave-browser/wiki/Release-Channel-Descriptions)
- Each step in channel layers expectations of quality. 
- For starting projects, a concatenated set of Main -> Release channels is sufficient. 
- Release conditions are managed per-project in their docs/content/process/release.md which will specify any non-automated constraints.
- Publishing to package management systems **MUST** be done via automated processes. No manual builds.


The channel and branch which associates with the unmodified name of the package in the repo is release.
As needed, the channel and branch which associates with the name of the package-beta in the repo is beta.

## Example

For a package named halo, it would exist in the package management system as @dxos/halo.
@dxos/halo would map to the release branch.

When changes are to be made. The developer should create a branch tied to an issue.
The branch name should then follow a convention of username/fix/issuenumber.
When the work is complete, the developer will open a pull request to merge into main.
Developers should not merge directly into dev, beta, or release.

When a sufficient number of feature enhancements or fixes have accumulated in main, the head of main will be merged into dev. 
When a sufficient number of feature enchancements or fixes have accumulated in dev and we are ready to receive feedback from external groups, the head of dev will be merged into beta. Beta may then be published.
When a sufficient number of feature enhancements or fixes have accumulated in Beta and quality standards are met, the head of beta will be merged into release. Release may then be published.
Using conventional commits as mentioned above, versioning will be maintained by the system. 

Versions start at 1.0.0.
