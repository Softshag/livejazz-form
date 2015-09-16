
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["jquery","jform"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'), require('jform'));
  } else {
    root.livejazz = factory(root.jQuery, root.jform);
  }
}(this, function($, jform) {

'use strict';

jform.editors.extend('select2', {
  tagName: 'select',
  initialize: function initialize(options) {
    this.options = options;
    this.$instance = null;
  },
  onBeforeRender: function onBeforeRender() {
    if (this.$instance) {
      this.$instance.destroy();
      this.$instance = void 0;
    }
  },
  onRender: function onRender() {
    $(this.el).select2(this.options);
    this.$instance = $(this.el).data('select2');
  },
  setValue: function setValue(value) {
    $(this.el).select2('data', value);
  },
  getValue: function getValue() {
    return $(this.el).select2('data');
  },

  clear: function clear() {
    $(this.el).select2('data', '');
  },

  onDestroy: function onDestroy() {
    $(this.el).select2('destroy');
  }

});
'use strict';

jform.editors.extend('imagecrop', {});
'use strict';

var Form = jform.create;

jform.editors.extend('imagecrop', {});
return Form;

}));
