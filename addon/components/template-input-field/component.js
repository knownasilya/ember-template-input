import Component from '@ember/component';
import layout from './template';
import Mobiledoc from 'mobiledoc-kit';

export default Component.extend({
  layout,
  classNames: ['template-input-field'],
  
  didInsertElement() {
    let uniqueId = this.get('uniqueId');
    let closeAllDropdowns = this.closeAllDropdowns.bind(this);
    let tags = this.get('tags');
    let template = this.get('template');
    let createMarkerables = this.createMarkerables.bind(this);
    // Parse pasted/initial templates and convert to tag atoms
    // see https://github.com/bustlelabs/mobiledoc-kit#dom-parsing-hooks
    let pastedTextPlugin = function(node, builder, { addMarkerable, nodeFinished }) {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        let markerables = createMarkerables(text, builder);
       
        markerables.forEach((markerable) => {
          addMarkerable(markerable);
        });

        nodeFinished();
      }
    };
    
    let editor = new Mobiledoc.Editor({
      html: template,
      autofocus: false,
      parserPlugins: [pastedTextPlugin],
      atoms: [
        // tag atom implementation for the editor
        {
        	name: 'tag',
          type: 'dom',
          render: ({ value, env, payload }) => {
            // Remove select when tag erased
            // TODO: Only remove select if open for current tag, might not be able to get into this state any way
            env.onTeardown(() => {
            	closeAllDropdowns(true);
            });
            let container = document.createElement('span');
            let inner = document.createElement('span');
            let open = document.createTextNode('{');
            let close = document.createTextNode('}');
            
            inner.textContent = value;
            inner.classList.add('template-tag-value');
            
            // Allows creating tags from input to position the select correctly
            closeAllDropdowns();
            inner.setAttribute('data-ebd-id', `${uniqueId}-trigger`);
            
            if (!tags.includes(value)) {
              inner.classList.add('template-tag-value-invalid');
            }
            
            container.classList.add('template-tag');
            container.appendChild(open);
            container.appendChild(inner);
            container.appendChild(close);

            inner.onclick = () => {
              closeAllDropdowns();
              // make sure the trigger id is set on this atom, so the menu positions properly.
              inner.setAttribute('data-ebd-id', `${uniqueId}-trigger`);
              this.get('onShowTags')().then((tag) => {
                if (tag !== null) {
                  env.save(tag, payload);
                }
              });
            };
            
          	return container;
          }
        }
      ]
    });
    
    // Handle the creation of tags when typing '{'
    editor.onTextInput({
      name: 'create-tag',
      text: '{',
      run: (editor) => {
        let { range } = editor;
        let position = editor.post.tailPosition();
        let temporaryAtom = editor.insertAtom('tag', '...');
        
        // delete the user's '{'
        editor.deleteAtPosition(range.head, -1, {});
        
        // Move the cursor to the end of temp atom
        editor.selectRange(range);
        
        // Wait for user's tag selection
        this.get('onShowTags')().then((tag) => {
          // Delete the temporary atom
          editor.deleteAtPosition(range.tail, -1, {});
          // Create actual atom
          editor.insertAtom('tag', tag);
        });
      }
    });
    
    editor.render(this.element);
  },
  
  closeAllDropdowns(override) {
  	let dropdownOpen = this.get('dropdownOpen');

    if ((override || !dropdownOpen) && this.$()) {
      let items = this.$('[data-ebd-id]');
      items.attr('data-ebd-id', '');
      this.get('closeDropdown')();
    }
  },
  
  createMarkerables(text, builder) {
    let regInner = /\{(.+?)\}/g;
    let regOuter = /(\{.+?\})/g;
    let markerables = [];
        
    if (text.search(regInner) !== -1) {
      let split = text.split(regOuter);

      markerables = split.map((item) => {
        let match = regInner.exec(item);
        if (match) {
          let tag = match[1];
          return builder.createAtom('tag', tag);
        }
        return builder.createMarker(item);
      });
    }
    
    return markerables;
  }
});

