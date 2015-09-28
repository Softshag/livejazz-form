'use strict';

let imageTemplate = `<div>
  <div class="crop-preview"></div>
  <div class="upload-btn-wrap">
    <span class="btn btn-default btn-sm">Upload</span>
    <input type="file" class="upload-btn" />
  </div>
  <button class="gallery-btn btn btn-sm btn-default">Pick</button>
  <button class="crop-btn btn btn-sm btn-default pull-right">Crop</button>
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
    cropPreview: '.crop-preview'
  },
  events: {
    'click .gallery-btn' : 'onGallery',
    'click .crop-btn': 'onCrop'
  },
  initialize () {

  },

  onBeforeRender () {
    if (this.uploadButton) {
      this.uploadButton.destroy();
      this.stopListening(this.uploadButton);
    }

    if (this.gallery) {
      this.gallery.remove();
      this.gallery.destroy();
    }

  },



  onRender () {
    this.uploadButton = new Assets.UploadButton({
      el: this.ui.uploadButton,
      url: '/files',
      mimeType: 'image/*',
      autoUpload: true,
    });

    this.listenTo(this.uploadButton, 'change', function () {
      console.log('on change')
    });

    this.listenTo(this.uploadButton, 'upload', function (data) {
      let model = this.gallery.collection.create(data, { add: false })
      this.onAssetSelected(model);
    });

    this.uploadButton.render()

    let fragment = document.createRange().createContextualFragment(galleryModal);
    this.el.appendChild(fragment);

    this.ui.modal = this.el.querySelector('.modal')
    console.log(this.ui)
    let content = this.el.querySelector('.modal-body');

    this.gallery = new Assets.GalleryView({
      el: content,
      url: '/files'
    });

    this.gallery.render();


  },

  onAssetSelected (model) {
    let img = new Image()
    this.ui.cropPreview.innerHTML = ""
    $(img).addClass('content')
    img.onload =  () => {
      this.ui.cropPreview.appendChild(img)

    }
    img.src = model.get('url');

  },

  onCrop (e) {
    e.preventDefault();
    let el = this.el.querySelector('.crop-btn');

    let image = this.ui.cropPreview.querySelector('img');

    if (image == null) {
      return;
    }

    if ($(el).hasClass('active')) {
      $(image).cropper('destroy');
      $(el).removeClass('active');
      return
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

  onGallery (e) {
    e.preventDefault();

    this.gallery.selected = null;
    this.gallery.collection.fetch();
    let modal = $(this.el).find('.modal')
    modal.modal();
    modal.one('hide.bs.modal ', () => {
      if (this.gallery.selected == null) return;

      this.onAssetSelected.call(this, this.gallery.selected)

    })
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
