# Branching and Naming Convention Across All Projects

All repos are expected to converge on this standard.

Developers **MUST** submit their work via pull requests to the branch named 'main'. 
Only pull requests which pass CI and review should be merged.
Commit messages should follow https://www.conventionalcommits.org/en/v1.0.0/
Channels will follow the convention established of rising fidelity main -> beta -> release.
Each step in channel layers expectations of quality.

## Branch Promotion Conditions
For main to be promoted into beta, the CI **MUST** pass and code coverage **MUST** improve.
If the major version will step with the evenutal release, comms team should be informed and @richburdon must approve the PR.
Main is never published to an external package system.

For beta to be promoted into release, the CI **MUST** pass, documentation **MUST** be updated, and any manual QA test runs **MUST** pass.
Publishing to package management systems MUST be done via automated processes. No manual builds.

The channel and branch which associates with the unmodified name of the package in the repo is named 'release'. As needed, the channel and branch which associates with the name of the package-beta in the repo is named 'beta'.

## Example
For a package named halo, it would exist in the package management system as @dxos/halo. @dxos/halo would map to the branch named 'release'.
When changes are to be made. The developer will create a branch tied to an issue. The branch name should then follow a convention of username/fix/issuenumber. When the work is complete, the developer will open a pull request to merge into main. Developers should not merge directly into beta, or release.
When a sufficient number of feature enhancements or fixes have accumulated in main, the head of main will be merged into beta. Beta may then be published. 

## Versioning 
Versions for new projects start at 1.0.0.

To reiterate: **If a PR will result in stepping the major version, @richburdon must approve the PR.**
 
## Continuous Integration, Code Coverage, and Automated Testing
An established CI system is required for each project. 
The CI will use https://github.com/googleapis/release-please to manage publishing and semver.
The CI should use automated testing germane to its stack. (ex. Jest for React projects.)
The CI should have a code coverage report. 
Code coverage must improve with each merge, but there is no arbitrary fixed minimum percentage required.`


## Checklist
* Did you create a new repo?
  - Is the default branch 'main'?
  - Is the version of the package set to 1.0.0?
  - Are you enforcing (Conventional Commits)[https://www.conventionalcommits.org/en/v1.0.0/] via a Github Action?
  - Are you enforcing code coverage via a pre-commit hook?
  - Are the beta and release branches protected from direct commits and set to PR-only?
  - Is there a manual test plan for parts that automation does not cover?
* Are you submitting new work?
  - Is it in a PR with a target of main?
  - Did you follow the Conventional Commit standard?
  - Will the major version step as a result?
    - If so, set @richburdon as the required reviewer.
  - Did the tests pass locally?
  - Did you add sufficient tests so that the coverage percent is maintained or improved?
  - Did you update the documentation to explain changes to consuming projects?
  - Did you execute the manual test plan locally?
    - Are there any changes necessary for the manual test plan?
  
