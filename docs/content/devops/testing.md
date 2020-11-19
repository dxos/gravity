# Testing

## Testing categories

| Test             | Purpose                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| unit             | Evaluate isolated/atomic/small components, APIs, etc.                      |
| integration      | Evaluate interaction between components and modules.                       |
| end-to-end       | Evaluate complex interactions across components.                           |
| smoke            | High-level sanity tests (e.g., basic app/system startup/teardown.)         |
| performance/load | Evaluate funcioning under stress; determine operational constraints.       |
| acceptance       | Manual testing to promote apps/components before publishing to production. |

## Testing infrastructure

All repos should have tests that are required to pass before PRs can be merged.

| Type   | Categories                     | Tool |
| ------ | ------------------------------ | ---- |
| NodeJS | coverage                       | jest, c8, nyc, instanbul |
| NodeJS | unit, integration, end-to-end  | jest |
| NodeJS | end-to-end, performance        | gravity |
| React  | smoke                          | storybook + [playwright](https://github.com/microsoft/playwright-test) |
| React  | acceptance                     | storybook |
