

jform.editors.extend('pegjs', {
  events: {
    'keyup': function (e) {
      /*let err = this.validate();
      if (err !== null) {
        this.trigger('invalid', err);
      }*/
    },
    'change': 'triggerChange',
    'blur': function (e) {

    }
  },
  tagName: 'textarea',
  initialize (options={}) {

    if (!options.parser) {
      throw jform.createError('[pegjs] no parser specified');
    }
    this.options = options;
    this.parser = options.parser;
  },
  setValue (value) {

    if (typeof value !== 'string') {

      if (typeof this.options.compile !== 'function') {
        throw jform.createError("[pegjs] no compiler");
      }

      value = this.options.compile(value);
    }
    $(this.el).val(value);

    let err = this.validate();
    if (err !== null) this.trigger('invalid', err);

  },
  getValue () {
    return this._value;
  },

  clear () {
    $(this.el).val('');
  },
  validate () {
    var value = $(this.el).val();

    if (value === '') return null;

    try {
      value = this.parser.parse(value);
    } catch (e) {
      let msg = e.message.substr(0, e.message.length - 1) + " at column " + e.column;
      return new jform.editors.ValidationError(this.name,value,msg);
    }

    this._value = value;

    return null;
  }

});
