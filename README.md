# ember-template-input

Ember input component for easily building template strings from an available list of options

## Usage

```hbs
{{template-input options=options template=template onChange=(action (mut template))}}
```

- `options` is an array of strings, e.g. `['option1', 'option2']`.
- `template` is a string in the form of 'my string {option1} and {option2}', where `option1` and `option2`
  exist in the `options` array.
- `onChange` is an action that returns the updated template.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-template-input`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
