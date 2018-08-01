import { defer } from 'rsvp';
import Component from '@ember/component';
import layout from './template';


export default Component.extend({
  layout,

  classNames: ['template-input'],
  
  actions: {
    openAndSelect(open, close, reposition) {
    	open();
      reposition();
      let defer = defer();
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
