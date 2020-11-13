# Build System Guide

This seciton describe all aspects of developing, debugging, and publishing modules and components.

- [Development guide](development-guide.md)
- [Github Repos](repos.md)
- [Publishing packages](publishing.md)
- [Publishing applicatins]()
- [QA](qa.md)
- [Troubleshooting](troubleshooting.md)
- Tools
  - [NPM and Yarn](tools/yarn.md)
  - [Devtools browser extension](tools/devtools.md)
  - [Verdaccio NPM registry](tools/verdaccio/index.md)
  - [Continuous integration](tools/ci.md)
  - [Lint](tools/lint.md)

Guide for docs
- Refs
  - http://www.beverlyflightcenter.com/wp-content/uploads/2017/05/172EMERG.pdf
  - https://www.google.com/books/edition/Tractatus_Logico_philosophicus/Ai7dLY623SgC?hl=en&gbpv=0
- No repetition (small canonical docs) (e.g., describe alpha/beta in one place)
- Limit reference to WNS to ONE FILE
- Consider how quickly something will get out of date
  - Avoid refs to specific files
  - Avoid refs to historical decision/events

All the Things
- creating repos (structure)
  - standard structure (LICENSE, badges, etc.)
  - monorepos (ref yarn docs)
  - GH actions
  - CI
  - types
    - tools (e.g., lint config)
    - libraries (e.g., crypto)
    - DXOS compoenents (e.g., HALO)
    - DXOS React components and frameworks (e.g., react-client)
    - DXOS apps and bots (e.g., Teamwork)
- developer guide
  - channels (alpha > beta > main)
  - publishing packages
  - updating dependencies (`yarn upgrade interactive`)
- QA
