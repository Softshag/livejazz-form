
jform.editors.extend('date-time', {
  events: {
    'change': function (e) {
      console.log('on change')
    }
  },
  tagName: 'input',
  initialize (options={}) {

    this.options = $.extend({}, this.constructor.defaults,options);
    this.$instance = null;
  },
  onBeforeRender () {
    this._destroy();
  },
  onRender () {
    $(this.el).datepicker(this.options);
    this.$instance = $(this.el).data('datepicker');
    this.setValue(new Date());
  },
  setValue (value) {
    if (!(value instanceof Date)) {
      throw new Error('datepicker invalid value format');
    }

    this.$instance.date = value;
    this.$instance.viewDate = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0, 0);

    $(this.el).prop('value', this._formatDate(value));

    this.$instance.fillAll();

  },
  getValue () {
    return this.$instance.viewDate;
  },

  clear () {
    this.setValue(new Date());
    this.setDefault();
  },

  onDestroy () {
    this._destroy();
  },

  _destroy () {
    if (this.$instance) {
      this.$instance.disable();
      this.$instance = void 0;
      $(this.el).data('datepicker', null);
    }
  },
  _formatDate(date) {
    let fn = $.fn.datepicker.constructor.fn
    return fn.formatDate(date, this.$instance.format);
  }

}, {defaults: {autoClose:true}});
