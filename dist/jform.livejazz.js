
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

  clear: function clear() {
    this.setValue(new Date());
    this.setDefault();
  },

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

var imageTemplate = '<div>\n  <div class="crop-preview"></div>\n  <div class="upload-btn-wrap">\n    <span class="btn btn-default btn-sm">Upload</span>\n    <input type="file" class="upload-btn" />\n  </div>\n  <button class="gallery-btn btn btn-sm btn-default">Pick</button>\n  <button class="crop-btn btn btn-sm btn-default pull-right">Crop</button>\n</div>';

var galleryModal = '<div class="modal fade">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Modal title</h4>\n      </div>\n      <div class="modal-body gallery">\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary">Save changes</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->';

jform.editors.extend('image-crop', {
  template: imageTemplate,
  ui: {
    uploadButton: '.upload-btn',
    cropPreview: '.crop-preview'
  },
  events: {
    'click .gallery-btn': 'onGallery',
    'click .crop-btn': 'onCrop'
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
      el: this.ui.uploadButton,
      url: '/files',
      mimeType: 'image/*',
      autoUpload: true
    });

    this.listenTo(this.uploadButton, 'change', function () {
      this.clear();
    });

    this.listenTo(this.uploadButton, 'upload', function (data) {
      var model = this.gallery.collection.create(data, { add: false });
      this.onAssetSelected(model);
    });

    this.listenTo(this.uploadButton, 'error', function (error) {
      var err = new jform.editors.ValidationError(this.name, null, error.message);
      this.trigger('invalid', err);
    });

    this.uploadButton.render();

    var fragment = document.createRange().createContextualFragment(galleryModal);
    this.el.appendChild(fragment);

    this.ui.modal = this.el.querySelector('.modal');

    var content = this.el.querySelector('.modal-body');

    this.gallery = new Assets.GalleryView({
      el: content,
      url: '/files',
      uploadButton: false
    });

    this.gallery.render();
  },

  onAssetSelected: function onAssetSelected(model) {
    var _this = this;

    var img = new Image();
    this.ui.cropPreview.innerHTML = "";
    $(img).addClass('content');
    img.onload = function () {
      _this.ui.cropPreview.appendChild(img);
    };
    img.src = model.get('url');
  },

  onCrop: function onCrop(e) {
    e.preventDefault();
    var el = this.el.querySelector('.crop-btn');

    var image = this.ui.cropPreview.querySelector('img');

    if (image == null) {
      return;
    }

    if ($(el).hasClass('active')) {
      $(image).cropper('destroy');
      $(el).removeClass('active');
      return;
    }

    $(el).addClass('active');

    $(image).cropper({
      aspectRatio: 3 / 2,
      autoCropArea: 1,
      strict: true,
      guides: false,
      highlight: false,
      dragCrop: false,
      cropBoxMovable: false,
      cropBoxResizable: false
    });
  },

  onGallery: function onGallery(e) {
    var _this2 = this;

    e.preventDefault();

    this.gallery.selected = null;
    this.gallery.collection.fetch();
    var modal = $(this.el).find('.modal');
    modal.modal();
    modal.one('hide.bs.modal ', function () {
      if (_this2.gallery.selected == null) return;

      _this2.onAssetSelected.call(_this2, _this2.gallery.selected);
    });
  },

  clear: function clear() {
    this.ui.cropPreview.innerHTML = '';
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
      /*let err = this.validate();
      if (err !== null) {
        this.trigger('invalid', err);
      }*/
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
      var msg = e.message.substr(0, e.message.length - 1) + " at column " + e.column;
      return new jform.editors.ValidationError(this.name, value, msg);
    }

    this._value = value;

    return null;
  }

});
/* global jform:true */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = (function (_jform$Form) {
  _inherits(Form, _jform$Form);

  function Form() {
    _classCallCheck(this, Form);

    _jform$Form.apply(this, arguments);
  }

  Form.prototype.onChange = function onChange(editor) {
    this.validateEditor(editor.name).then(function () {
      var field = editor.el.parentNode;
      var messageField = field.querySelector('.form-message');
      if (messageField) {
        messageField.style.display = 'none';
      }
    })['catch'](function () {});
  };

  Form.prototype.onInvalid = function onInvalid(editor, error) {

    var field = editor.el.parentNode;
    var messageField = field.querySelector('.form-message');

    if (messageField == null) {
      messageField = document.createElement('div');
      messageField.classList.add('form-message');
      field.appendChild(messageField);
    }
    this.__resetMessageField(messageField);
    var msg = error.message || "";
    if (error.errors && error.errors.length) {
      msg = error.errors.map(function (m) {
        return m.message;
      }).join('<br/>');
    }

    $(messageField).html(msg);
    messageField.style.display = 'block';
  };

  Form.prototype.__resetMessageField = function __resetMessageField(elm) {
    $(elm).removeClass('error success').html('');
  };

  return Form;
})(jform.Form);

Form.create = function (elm) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options.el = elm;
  return new Form(options);
};
return Form;

}));
