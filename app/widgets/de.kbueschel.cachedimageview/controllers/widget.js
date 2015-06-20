var args = arguments[0] || {},

    _isHires = (Ti.Platform.displayCaps.dpi === 320 && Ti.Platform.displayCaps.density === 'high' && Ti.Platform.name.search(/[iPod]/ig) === -1),
    _savedFile;


/**
 * Initializes image view
 *
 * @public
 * @method init
 * @param {Dictonary/Map} options
 * @return void
 */
exports.init = function(options) {

	// variable initialization
	var saveFile = true;


	// merge arguments
	options = _.defaults(options, args);

	args = options;


	// show loader
	$.loader.show();


	if (OS_IOS && options.cacheHires && _isHires) {

		options.image = options.cacheHires;
		options.hires = true;
	}

	if (!options.image || (OS_IOS && _.isString(options.image) && !Ti.Platform.canOpenURL(options.image))) {

		delete options.image;
		saveFile = false;

	}
	else if (!options.cacheNot) {

		if (!options.cacheName) {

			if (_.isString(options.image)) {

				options.cacheName = options.image;

			}
			else if (options.image.nativePath) {

				options.cacheName = options.image.nativePath;

			}
			else {

				throw new Error('For non-file blobs you need to set a cacheName manually.');
			}
		}

		options.cacheName = Ti.Utils.md5HexDigest(options.cacheName);


		if (options.hires) {

			options.cacheName = options.cacheName + '@2x';
		}


		if (!options.cacheExtension) {

			// from http://stackoverflow.com/a/680982/292947
			var re = /(?:\.([^.]+))?$/;
			var ext = re.exec(args.image)[1];

			options.cacheExtension = (ext ? ext : '');
		}


		_savedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, (options.cacheName + '.' + options.cacheExtension));

		saveFile = true;


		if (_savedFile.exists()) {

			options.image = _savedFile;
			saveFile = false;
		}
	}


	delete options.cacheName;
	delete options.cacheExtension;
	delete options.cacheHires;


	if (saveFile === true) {

		$.imageView.addEventListener('load', function(event) {

			// remove event listener
			this.removeEventListener(event.type, arguments.callee);


			// write file
			_savedFile.write(Ti.UI.createImageView({

				image: 					this.image,
				width: 					Ti.UI.SIZE,
				height: 				Ti.UI.SIZE,
				preventDefaultImage: 	true

			}).toImage());


			// hide loader
			$.loader.hide();

			return;

		});
	}


	// apply image view properties - ie load image
	$.imageView.applyProperties(options);


	// set view proxy background color to image view background color
	$.viewProxy.setBackgroundColor(options.backgroundColor);


	// hide loader if iamge comes from cache
	if (!saveFile) {

		$.loader.hide();
	}


	return;

}; // END init()


/**
 * Sets new image path and updates image view
 *
 * @public
 * @method setImage
 * @param {String} imagePath
 * @return void
 */
exports.setImage = function(imagePath) {

	// reinit
	exports.init({
		image: imagePath
	});

	return;

}; // END setImage()


/**
 * Gets image path
 *
 * @public
 * @method getImage
 * @param {String} imagePath
 * @return {String} nativeImagePath
 */
exports.getImage = function(imagePath) {

	var nativeImagePath = '',
	    image = (_savedFile ? _savedFile : $.imageView.image);


	if (imagePath && _.isString(image)) {

		if (image.resolve) {

			nativeImagePath = image.resolve();
		}
		else if (image.nativePath) {

			nativeImagePath = image.nativePath;
		}
	}

	return nativeImagePath;

}; // END getImage()


/**
 * Apply given properties to image view
 *
 * @public
 * @method applyProperties
 * @param {Dictonary/Map} options
 * @return void
 */
exports.applyProperties = function(options) {

	// reinit
	exports.init(options);

	return;

}; // END applyProperties()


/*
 * Adds event listener to image view
 *
 * @public
 * @method removeEventListener
 * @param {String} eventName
 * @param {Function} callback
 * @return {Mixed}
 */
exports.addEventListener = function(eventName, callback) {

	return $.imageView.addEventListener(eventName, callback);

}; // END addEventListener()


/**
 * Adds event listener to image view
 *
 * @public
 * @method removeEventListener
 * @param {String} eventName
 * @param {Function} callback
 * @return {Mixed}
 */
exports.removeEventListener = function(eventName, callback) {

	return $.imageView.removeEventListener(eventName, callback);

}; // END addEventListener()


/**
 * Adds event listener to image view
 *
 * @public
 * @method on
 * @param {String} eventName
 * @param {Function} callback
 * @return {Mixed}
 */
exports.on = function(eventName, callback) {

	return exports.addEventListener(eventName, callback);

}; // END on()


/**
 * Remove event listener from image view
 *
 * @public
 * @method off
 * @param {String} eventName
 * @param {Function} callback
 * @return {Mixed}
 */
exports.off = function(eventName, callback) {

	return exports.removeEventListener(eventName, callback);

}; // END off()