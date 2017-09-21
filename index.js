/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-template-input',

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/mobiledoc-kit.js');
    this.import('vendor/mobiledoc-kit.map');
    this.import('vendor/template-input.css');
  }
};
