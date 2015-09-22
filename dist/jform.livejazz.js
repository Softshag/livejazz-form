
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
    if (this.$instance) {
      this.$instance.destroy();
    }
  }

});
'use strict';

jform.editors.extend('date-time', {
  events: {
    'change': function change(e) {
      console.log('on change');
    }
  },
  tagName: 'input',
  initialize: function initialize() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    this.options = $.extend({}, this.constructor.defaults, options);
    this.$instance = null;
  },
  onBeforeRender: function onBeforeRender() {
    this._destroy();
  },
  onRender: function onRender() {
    $(this.el).datepicker(this.options);
    this.$instance = $(this.el).data('datepicker');
    this.setValue(new Date());
  },
  setValue: function setValue(value) {
    if (!(value instanceof Date)) {
      throw new Error('datepicker invalid value format');
    }

    this.$instance.date = value;
    this.$instance.viewDate = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0, 0);

    $(this.el).prop('value', this._formatDate(value));

    this.$instance.fillAll();
  },
  getValue: function getValue() {
    return this.$instance.viewDate;
  },

  clear: function clear() {},

  onDestroy: function onDestroy() {
    this._destroy();
  },

  _destroy: function _destroy() {
    if (this.$instance) {
      this.$instance.disable();
      this.$instance = void 0;
      $(this.el).data('datepicker', null);
    }
  },
  _formatDate: function _formatDate(date) {
    var fn = $.fn.datepicker.constructor.fn;
    return fn.formatDate(date, this.$instance.format);
  }

}, { defaults: { autoClose: true } });
'use strict';

var imageTemplate = '<div>\n  <div class="preview"></div>\n  <div class="upload-btn-wrap">\n    <span class="btn btn-default btn-sm">Upload</span>\n    <input type="file" class="upload-btn" />\n  </div>\n\n  <button class="gallery-btn btn btn-sm btn-default">Pick</button>\n</div>';

var galleryModal = '<div class="modal fade">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Modal title</h4>\n      </div>\n      <div class="modal-body gallery">\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary">Save changes</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->';

jform.editors.extend('image-crop', {
  template: imageTemplate,
  ui: {
    uploadButton: '.upload-btn'
  },
  events: {
    'click .gallery-btn': 'onGallery'
  },
  initialize: function initialize() {},

  onBeforeRender: function onBeforeRender() {
    if (this.uploadButton) {
      this.uploadButton.destroy();
      this.stopListening(this.uploadButton);
    }

    if (this.gallery) {
      this.gallery.remove();
      this.gallery.destroy();
    }
  },

  onRender: function onRender() {
    this.uploadButton = new Assets.UploadButton({
      el: this.ui.uploadButton
    });

    this.listenTo(this.uploadButton, 'change');

    var fragment = document.createRange().createContextualFragment(galleryModal);
    this.el.appendChild(fragment);

    var content = this.el.querySelector('.modal-body');

    this.gallery = new Assets.GalleryView({
      el: content,
      url: 'http://test'
    });
  },

  onGallery: function onGallery(e) {
    e.preventDefault();
    this.gallery.render();
    $(this.el).find('.modal').modal();
  },

  onDestroy: function onDestroy() {
    if (this.gallery) {
      this.gallery.destroy();
    }
    if (this.uploadButton) {
      this.uploadButton.destroy();
    }
  }

});
'use strict';

jform.editors.extend('pegjs', {
  events: {
    'keyup': function keyup(e) {
      var err = this.validate();
      if (err !== null) {
        this.trigger('invalid', err);
      }
    },
    'change': 'triggerChange',
    'blur': function blur(e) {}
  },
  tagName: 'textarea',
  initialize: function initialize() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!options.parser) {
      throw jform.createError('[pegjs] no parser specified');
    }
    this.options = options;
    this.parser = options.parser;
  },
  setValue: function setValue(value) {

    if (typeof value !== 'string') {

      if (typeof this.options.compile !== 'function') {
        throw jform.createError("[pegjs] no compiler");
      }

      value = this.options.compile(value);
    }
    $(this.el).val(value);

    var err = this.validate();
    if (err !== null) this.trigger('invalid', err);
  },
  getValue: function getValue() {
    return this._value;
  },

  clear: function clear() {
    $(this.el).val('');
  },
  validate: function validate() {
    var value = $(this.el).val();

    if (value === '') return null;

    try {
      value = this.parser.parse(value);
    } catch (e) {
      return new jform.editors.ValidationError(this.name, value, e.message);
    }

    this._value = value;

    return null;
  }

});
'use strict';

var Form = jform.create;
return Form;

}));
