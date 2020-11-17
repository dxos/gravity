# Documentation

## Process

Documentation is like code: it needs to be constantly maintained otherwise it quickly becomes technical debt.
People like DOING not READING: write simple informative documents that people can scan.


- Assume that EVERYTHING will be public.
- TL;DR: write short, simple docs that can be easily scanned.
  - Bullets are simpler to read than sentences.
  - Separate "normative" descriptions and definitions from "non-normative" sections that give details and examples.
- Consider how and when the documentation could become OUT-OF-DATE (avoid technical debt).
  - Avoid referencing specific configuration settings (if required then reference a config file in Github).
  - As far as possible avoid referencing specific files (or people).
- Avoid repetition; instead reference other documents (across repos if necessary).
- Favor shorter documents focused on a very specific topic.
- Start documents with concise bullets that others can scan, correct, add to.
  For example, [this](http://download.aopa.org/121010av-adventures.pdf) is how to fly an airplane.
- Use a spellchecker and confirm spellings before submitting a PR  
- Fix documentation that doesn't work (at the very least update the docs to note it is broken).
- TODO(burdon): Describe different doc types: instructions (like this), design docs, specs, tutorials, etc.


## Style

- Don't use first or second person pronouns (I, we, you, etc.)


## Formatting

- Use lowercase hyphenated file names (for files, folders, diagrams, etc.)
- MD files are more readable with line breaks after sentences or clauses.
- Don't prefix command line examples with `$` or `>`; make it easy to copy-and-paste.


## Resources

- https://english.stackexchange.com
- https://www.w3.org/TR/qaframe-spec
- https://www.writethedocs.org
