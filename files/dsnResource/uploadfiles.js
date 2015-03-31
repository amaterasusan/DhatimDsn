UploadFiles = (function () {
	
	var _submodule,
		submodule,
		resourceDropzone,
		arrRoles = [],
		sirenCode = '';
		
		
	_submodule = {
		getFileType: function (file_path) {
			var file_ext = '';

				if (file_path.lastIndexOf('.') > 0) {
					file_ext = file_path.substring(file_path.lastIndexOf('.') + 1).toLowerCase();
				}
			return file_ext;
		},
		
		addRowForFile: function (event, file) {
			var $preview = $(file.previewElement);
			$preview
			.find('.dz-details').append('<div data-dz-remove="" class="dz-remove"><button type="button" remove_res_btn="yes" class="btn btn-link"><span class="fa fa-lg fa-trash-o"></span></button></div>');
			$preview.attr('data-item-type', _submodule.getFileType(file.name))
			$('button[remove_res_btn="yes"]').on('click', _submodule.removeRowWithResource);
		},
		
		removeRowWithResource: function () {
			$(this).closest('.dz-preview').remove();
		},
		
		addDropZone: function (url) {
			sendUrl = url;
			Dropzone.autoDiscover = false;
			$('form').attr('enctype','multipart/form-data');
			new Dropzone('div#dsn_dropzone', {
				url:              url,
				uploadMultiple:   true,
				autoProcessQueue: false,
				maxFiles:         10,
				parallelUploads:  10,
				dictDefaultMessage: 'Glisser/DÃ©poser des fichiers ici pour les attacher ou cliquez sur pour sÃ©lectionner les fichiers',
				//addRemoveLinks: true,
            	init: function () {
					resourceDropzone = this;
					this.on("addedfile", function (file) {
						console.log('add file');
						_submodule.addRowForFile(event, file);
					});
					
					this.on("sending", function(file, xhr, formData) {
						console.log('sending...');
						console.log(arrRoles, sirenCode);
						formData.append('roles', arrRoles);
						formData.append('siren', sirenCode);
					});
					this.on("complete", function(file) {
						//console.log('init', file);
						//resourceDropzone.removeFile(file);
					});
				}
			});
			$('.save_files').click(_submodule.saveFiles);
		},
		saveFiles: function (event) {
			resourceDropzone.processQueue();
		}

	},
	submodule = {
		run: function (parameters) {
			if(!parameters.url) {
				parameters.url = '/';
			}
			if(parameters.roles) {
				arrRoles = parameters.roles;
			}
			if(parameters.siren) {
				sirenCode = parameters.siren;
			}

			_submodule.addDropZone(parameters.url);
			
		}
	}
	return submodule;
	
})()	