

jform.editors.extend('select2', {
  tagName: 'select',
  initialize (options) {
    this.options = options;
    this.$instance = null
  },
  onBeforeRender () {
    if (this.$instance) {
      this.$instance.destroy();
      this.$instance = void 0;
    }
  },
  onRender () {
    $(this.el).select2(this.options);
    this.$instance = $(this.el).data('select2');
  },
  setValue (value) {
    $(this.el).select2('data', value);
  },
  getValue () {
    return $(this.el).select2('data');
  },

  clear () {
    $(this.el).select2('data','');
  },

  onDestroy () {
    if (this.$instance) {
      this.$instance.destroy();
    }
  }

});
