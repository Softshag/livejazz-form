'use strict';

let imageTemplate = `<div>
  <div class="preview"></div>
  <div class="upload-btn-wrap">
    <span class="btn btn-default btn-sm">Upload</span>
    <input type="file" class="upload-btn" />
  </div>

  <button class="gallery-btn btn btn-sm btn-default">Pick</button>
</div>`;

let galleryModal = `<div class="modal fade">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body gallery">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->`

jform.editors.extend('image-crop', {
  template: imageTemplate,
  ui: {
    uploadButton: '.upload-btn',
  },
  events: {
    'click .gallery-btn' : 'onGallery'
  },
  initialize () {

  },

  onBeforeRender () {
    if (this.uploadButton) {
      this.uploadButton.destroy();
    }

    if (this.gallery) {
      this.gallery.remove();
      this.gallery.destroy();
    }

  },

  onRender () {
    this.uploadButton = new Assets.UploadButton({
      el: this.ui.uploadButton
    });

    let fragment = document.createRange().createContextualFragment(galleryModal);
    this.el.appendChild(fragment);

    let content = this.el.querySelector('.modal-body');

    this.gallery = new Assets.GalleryView({
      el: content,
      url: 'http://test'
    });

  },

  onGallery (e) {
    e.preventDefault();
    this.gallery.render();
    $(this.el).find('.modal').modal();
  },

  onDestroy () {
    if (this.gallery) {
      this.gallery.destroy();
    }
    if (this.uploadButton) {
      this.uploadButton.destroy();
    }
  }

});
