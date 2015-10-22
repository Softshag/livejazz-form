/* global jform:true */
'use strict';

class Form extends jform.Form {

  onChange (editor) {
    this.validateEditor(editor.name)
    .then(() => {
      let field = editor.el.parentNode
      let messageField = field.querySelector('.form-message')
      if (messageField) {
        messageField.style.display = 'none';
      }
    }).catch(() => {});
  }

  onInvalid (editor, error) {

    let field = editor.el.parentNode;
    let messageField = field.querySelector('.form-message');

    if (messageField == null) {
      messageField = document.createElement('div');
      messageField.classList.add('form-message');
      field.appendChild(messageField);
    }
    this.__resetMessageField(messageField)
    let msg = error.message||"";
    if (error.errors && error.errors.length) {
      msg = error.errors.map( m => m.message).join('<br/>');
    }

    $(messageField).html(msg);
    messageField.style.display = 'block';
  }

  __resetMessageField (elm) {
    $(elm).removeClass('error success').html('');

  }
}

Form.create = function (elm, options={}) {
  options.el = elm;
  return new Form(options);
};
