import Ember from 'ember';

export default Ember.Controller.extend({
  options: ['name', 'address', 'email'],
  template: `Hi, I'm {name} and I live at {address}`
});
