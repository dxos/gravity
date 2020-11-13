#WIP - DO NOT DELETE OR MOVE

# QA Process

## Apps
- [Teamwork Manual Test Plan](https://github.com/dxos/teamwork/blob/main/docs/content/testing-plan.md)                              
- [Teamwork Latest Manual Test Run](https://github.com/dxos/teamwork/issues/450)
- [Teamwork Issue Query for QA Label](https://github.com/dxos/teamwork/issues?q=is%3Aissue+is%3Aopen+label%3AQA)
- [Teamwork Latest Automated Run](https://github.com/dxos/teamwork/actions?query=workflow%3A%22Build+and+test%22) (use the top of the list)
  - [Deployed Teamwork App](https://apollo1.kube.moon.dxos.network/app/wrn%3A%2F%2Fdxos%2Fapplication%2Fteamwork%40alpha/)
  - [Deployed Arena App](https://apollo1.kube.moon.dxos.network/app/wrn%3A%2F%2Fdxos%2Fapplication%2Farena%40alpha/)

# Test Details:

TODO: move this somewhere (e.g., GH issue that has a link to the deployment process; add comment (history) for each update.

- Date: 13 Nov 2020
- Teamwork version: 0.0.65
- KUBE: wrn://dxos/application/teamwork@alpha
- Using: 1 machine
- Browser 1: Chrome
- Browser 2: Brave 

## Broken Features:
### Teamwork:
- [Feature: Messenger in Editor](https://github.com/dxos/teamwork/issues/452)
- [Feature: Switching between Editors](https://github.com/dxos/teamwork/issues/371)
- [Feature: Space below content in Editor](https://github.com/dxos/teamwork/issues/382)
- [Feature: Scroll in X axis in Editor](https://github.com/dxos/teamwork/issues/453)
- [Feature: Disable adding empty task](https://github.com/dxos/teamwork/issues/454)
- [Feature: Redeem offline invitation](https://github.com/dxos/teamwork/issues/455)
- [Feature: Resetting storage](https://github.com/dxos/teamwork/issues/360)

### Arena:
- [Feature: ]()

# QA Priorities:
## Jest
- [ ] Add tests to SDK for client creation (ex: https://github.com/dxos/sdk/pull/314/files packages/client/src/client.test.ts)

## Playwright
- [ ] Create playwright tests for Task List app
  - [ ] Create profile
  - [ ] Create a party
  - [ ] Create task list
  - [ ] Create task
  - [ ] Update task status
  - [ ] Delete task
  - [ ] Open invite dialog

## Gravity
* point of clarity - we are testing the scenarios and underlying models, not the task list app specifically
- [ ] Multiuser tests for Task List app
  - [ ] Invitation flow
  - [ ] Cross-user functions 
    - [ ] First user creates a task, second user completes the same task
    - [ ] Second user creates a task, first user deletes the task
- [ ] Load testing for Task List app
  - [ ] Maximum users before systemic failure
  - [ ] Rapid creation, deletion, and updating of tasks

## Manual
- [ ] Add manual test plan to Task List app. Use https://github.com/dxos/teamwork/blob/main/docs/content/testing-plan.md as an example.
- [ ] Add manual test plan to Arena. Use https://github.com/dxos/teamwork/blob/main/docs/content/testing-plan.md as an example.
