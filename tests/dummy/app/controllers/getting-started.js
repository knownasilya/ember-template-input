import Controller from '@ember/controller';

export default Controller.extend({
  options: ['name', 'address', 'email'],
  template: `Hi, I'm {name} and I live at {address}`
});
