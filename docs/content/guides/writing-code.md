# Writing Code

TODO(burdon): Clean-up.
TODO(burdon): Lint instructions.


# ES6

- Use arrow functions over functions.
- Group import statements (third-party, dxos packages, local imports); sort.


## React

- Keep all data manipulation (e.g., generators) separate from UX.
- Use storybooks to develop and test components (speeds up development,
  and forces reduction in complexity -- e.g., no hooks).
- Build smaller dumb components (pass in data and handlers).
- Components must never import Containers (no cyclic dependencies between components <=> containers).
- Containers should be top-level and use hooks to get system data objects (e.g., `useParties`).
- As a general rule all UX display and interactions should be in components; the provision of data,
  and coordination with other objects should be in containers.
- React components should have default exports (e.g., `export default MyComponent`).
- Component handler properties should be `onXXX`, whereas handlers within functions should be `handleXXX`.
- Aggressively factor out common components or functions.
- Use `makeStyles` to create class hooks.
- Use material styles.


## Misc

- 2 spaces.
- lodash and d3 are excellent examples of complex system design made simple.

- DRY: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

- STRICT DAG dependencies: not only between modules (data, util, etc.) but ALSO across directories in the
  same module (e.g., foo => foo/bar, but not the other way around).

  frontend => bot => data => util

- Factor out early and often: Move anything that isn't COMPLETELY SPECIFIC to the current use case to UTIL
  and create a test for it. Don't do it later. If you write the same code twice, create a utility function for it.

- Inheritance: is nearly always a bad idea except for interfaces and abstract base classes.

  Unless the underlying behavior is completely abstracted by the interface, and the derived class
  exists purely to implement this behavior, then composition is a better approach.

  Good case for inheritance. Channel is a messaging conduit where there can be multiple implementation
  (Test, HTTP, ChromeMessaging, etc.) In each case the different Conduit implementations

  Bad case for inheritance. A base class for an App that includes the basic layout and core state.
  Different app implementations are going to vary massively. They will have entirely different behaviors
  and over time the base class will struggle to support these different use cases and become overly
  complex.

- Exceptions: should only be used for unexpected errors or system level failures
  (i.e., not for application-level results). Exceptions  should be logged and analyzed to improve the overall
  reliability of the system.

- Functions: should be short and have a single return point. Decompose functions over 20 lines into sub functions,
  each of which can be independently tested.

- Globals: NEVER EVER use global variables. And minimal use global functions. All of our programming languages
  support OO. Create classes for everything. Create class utilities (i.e., only have static methods) for collections
  of related functions (e.g., ItemProtoUtil).

- File system: from the start, organize your module into meaningful subdirectories. Don't mix code and config.
  Create directories for self-contained modules that could reasonable be developed by different people. Or for
  cross cutting components of a larger system (e.g., DB, UI, logic).

- TODO(burdon): null vs undefined
- TODO(burdon): async

- TODO(burdon): Number clauses and use as reference with PRs.

- Order imports (system, our modules, local files).
- Order params (most important and invariant first, options last).
- In long functions, group operations into logical phrases.
- Each function should do one thing.
- Well-formed constructors (no async or side effects).
- Factor out aggressively (e.g., temporarily into local function, with TODO).
- Group public methods before private

- Consistency:
  - Error handling (logging vs return vs throw).
  - Common functions (e.g., createXXX for proto helpers).
  - Functions vs static methods.


## Crypto

- Maintain keys as buffers and convert to string when needed (e.g., when logging).

##

- TODO(burdon): Save PyCharm style settings.
- https://google.github.io/styleguide/javascriptguide.xml

- Parameter ordering: from least to most "significant":
  Example: login(service, userId)
  Rationale: "service" could be pushed down to a base class; it's "invariant" across multiple users.






## Comments

Comments are not decorative artifacts, although early comments (and comment blocks) may be placeholders for
more comprehensive comments added later.

Comments should be full sentences (starting with a capital letter and ending with a period.)


### JSDoc

- Minimally add type definitions for all function parameters.
- Never coerce parameters, or add defensive checks. Instead use `assert`
- Used `debug`.
- Declare event types.



## Test-driven development

Create tests early (not after the fact) and use these during the development of components.
Initially, write tests that will help to validate the design of the components (e.g., demonstrate and simplify APIs).

There are many different kinds of tests and these evolve over time.

For example:
- Boundary conditions;
- Race conditions;
- Resource allocation and clean-up;
- Sample usage;
- Performance and stress (e.g., 100s of instances);
- integration (operation with other modules).
