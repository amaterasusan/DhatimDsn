UploadFiles = (function () {
	
	var _submodule,
		submodule,
		myDropzone;
		
		
	_submodule = {
		addRowForFile: function (event, file) {
			var $preview = $(file.previewElement);
			$preview.find('.dz-details').append('<div data-dz-remove="" class="dz-remove"><button type="button" remove_res_btn="yes" class="btn btn-link"><span class="fa fa-lg fa-trash-o"></span></button></div>');
			$('button[remove_res_btn="yes"]').on('click', _submodule.removeRowWithResource);
		},
		removeRowWithResource: function () {
			$(this).closest('.dz-preview').remove();
		},
		addDropZone: function (url) {
			Dropzone.autoDiscover = false;
			myDropzone = new Dropzone('div#dsn_dropzone', {
				url:              url,
				uploadMultiple:   true,
				autoProcessQueue: false,
				maxFiles:         1000,
				parallelUploads:  1000,
            	init:             function () {
					this.on("addedfile", function (file) {
						_submodule.addRowForFile(event, file);
					});
				}
			});
			/*
			$('.dropzone').dropzone({
				url:              url,
				uploadMultiple:   true,
				autoProcessQueue: false,
				maxFiles:         1000,
				parallelUploads:  1000,
            	init:             function () {
					this.on("addedfile", function (file) {
						_submodule.addRowForFile(event, file);
					});
				}
			});
			*/
			$('.save_files').click(_submodule.saveFiles);
		},
		saveFiles: function (event) {
			myDropzone.processQueue();
		}

	},
	submodule = {
		run: function (parameters) {
			if(!parameters.url) {
				parameters.url = '/';
			}
			_submodule.addDropZone(parameters.url);
			
		}
	}
	return submodule;
	
})()	