# QA Process

## Automation

| Project      | Unit | Integration | Gravity | Playwright | System |
| ------------ | ---- | ----------- | ------- | ---------- |        |
| ECHO         | True |             |         |            |        |
| Client       | True |             |         |            |        |
| React-Client | True | True        | True    |            |        |
| Tasks App    |      | True        |         | True       |        |
| Gravity      |      |             |         |            | True   |

## Process Example

- ECHO - Current version : 2.6.4
- SDK/Client - Current version : 2.7.7-alpha.0
- SDK/Client - Current @dxos/echo-db target : ^2.6.4-alpha.0
- SDK/React-Client - Current version : 2.7.7-alpha.0
- SDK/React-Client - Current @dxos/echo-db target : ^2.6.4-alpha.0
- Tasks App - Current version : 1.0.0
- Tasks App - Current @dxos/react-client target : ^2.7.6-alpha.0
- Gravity - Not currently relevant.

### Scenario - Upgrade ECHO and have Tasks App use the latest version

- ECHO version updates to 2.6.5-alpha.0 in main branch
- If CI passes, @dxos/echo-db 2.6.5-alpha.0 is published to NPM via Github Action `main-release-please`
- At this point, if no action is taken, the ECHO update will not be consumed by any other project in the example.
- If update is attempted via `yarn upgrade-interactive [--latest]`, due to the current dynamics of semver, the alpha tag update is not consumed.
- To consume the change and test with it, a manual effort is made to update the dependencies in SDK/Client and SDK/React-Client.
- When the dependency update is pushed to main, CI will run. If it is successful, SDK/Client and SDK/React-Client will update their version to 2.7.8-alpha.0
- At this point, if no action is taken, the updates to SDK/Client & SDK/React-Client will not be consumed by any other project in the example.
- To consume the change and test with it, a manual effort is made to update the dependencies in Tasks App.
- When the dependency update is pushed to main, CI will run. If it is successful, Tasks App version will update to 1.0.1
