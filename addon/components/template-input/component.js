import Ember from 'ember';
import layout from './template';


export default Ember.Component.extend({
  layout,

  classNames: ['template-input'],
  
  actions: {
    openAndSelect(open, close, reposition) {
    	open();
      reposition();
      let defer = Ember.RSVP.defer();
      this.set('defer', defer);
      return defer.promise.then((tag) => {
        close();
      	return tag;
      });
    },
    
    setTag(tag) {
    	let defer = this.get('defer');
      
      defer.resolve(tag);
    }
  }
});
