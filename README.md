# ember-template-input

Ember input component for easily building template strings from an available list of options.

[![NPM][npm-badge]][npm-badge-url]
[![Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]

Install with the following command (requires Ember CLI).

```shell
ember install ember-template-input
```

_Note: This addon doesn't work with the Grammarly extension enabled._

## Usage

```hbs
{{template-input options=options template=template onChange=(action (mut template))}}
```

- `options` is an array of strings, e.g. `['option1', 'option2']`.
- `template` is a string in the form of 'my string {option1} and {option2}', where `option1` and `option2`
  exist in the `options` array.
- `onChange` is an action that returns the updated template.

### Installation

* `git clone <repository-url>` this repository
* `cd ember-template-input`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE.md).

[npm-badge]: https://img.shields.io/npm/v/ember-template-input.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-template-input
[travis-badge]: https://img.shields.io/travis/knownasilya/ember-template-input.svg
[travis-badge-url]: https://travis-ci.org/knownasilya/ember-template-input
[ember-observer-badge]: http://emberobserver.com/badges/ember-template-input.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-template-input

