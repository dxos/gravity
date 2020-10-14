# Branching and Naming Convention Across All Projects
The team has chosen to adopt the resolutions in DEP0

All repos are expected to converge on this standard.

Developers **MUST** submit their work via pull requests to the branch named 'main'. 
Only pull requests which pass CI and review should be merged.
Commit messages should follow https://www.conventionalcommits.org/en/v1.0.0/
Channels will follow the convention established of rising fidelity main -> beta -> release.
Each step in channel layers expectations of quality.

## Branch Promotion Conditions
For main to be promoted into beta, the CI **MUST** pass and code coverage **MUST** improve.
If the major version will step with the evenutal release, comms team should be informed.

For beta to be promoted into release, the CI **MUST** pass, documentation **MUST** be updated, and any manual QA test runs **MUST** pass.
Publishing to package management systems MUST be done via automated processes. No manual builds.

The channel and branch which associates with the unmodified name of the package in the repo is named 'release'. As needed, the channel and branch which associates with the name of the package-beta in the repo is named 'beta'.

## Example
For a package named halo, it would exist in the package management system as @dxos/halo. @dxos/halo would map to the branch named 'release'.

When changes are to be made. The developer will create a branch tied to an issue. The branch name should then follow a convention of username/fix/issuenumber. When the work is complete, the developer will open a pull request to merge into main. Developers should not merge directly into beta, or release.

When a sufficient number of feature enhancements or fixes have accumulated in main, the head of main will be merged into beta. Beta may then be published. 

## Versioning 
Versions for new projects start at 1.0.0.
 
## Continuous Integration, Code Coverage, and Automated Testing
An established CI system is required for each project. 
The CI will use https://github.com/googleapis/release-please to manage publishing and semver.
The CI should use automated testing germane to its stack. (ex. Jest for React projects.)
The CI should have a code coverage report. 
Code coverage must improve with each merge, but there is no arbitrary fixed minimum percentage required.`
