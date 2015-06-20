var Alloy = require('alloy');


/**
 * NavigationWindow
 *
 * @constructor
 * @param {Map/Dictonary} args
 * @return {NavigationWindow} this
 */
function NavigationWindow(args) {

	this.args = args;

	return this;

} // END NavigationWindow()


/**
 * Opens navigation window
 *
 * @public
 * @method open
 * @param {Map/Dictonary} params
 * @return {Mixed}
 */
NavigationWindow.prototype.open = function(params) {

	params = (params || {});
	params.displayHomeAsUp = false;

	return this.openWindow(this.args.window, params);

}; // END open()


/**
 * Closes navigation window
 *
 * @public
 * @method close
 * @param {Map/Dictonary} params
 * @return
 */
NavigationWindow.prototype.close = function(params) {

	return this.closeWindow(this.args.window, params);

}; // END close()


/**
 * Open window in navigation stack
 *
 * @public
 * @method openWindow
 * @param {Ti.UI.Window} window
 * @param {Map/Dictonary} options
 * @return {Mixed}
 */
NavigationWindow.prototype.openWindow = function(window, options) {

	// protect "this"
	var that = this;


	// defaults options
	options = (options || {});
	options.swipeBack = ((typeof options.swipeBack === 'boolean') ? options.swipeBack : that.args.swipeBack);
	options.displayHomeAsUp = ((typeof options.displayHomeAsUp === 'boolean') ? options.displayHomeAsUp : that.args.displayHomeAsUp);


	if (OS_ANDROID && options.animated !== false) {
		options.activityEnterAnimation = (options.activityEnterAnimation || Ti.Android.R.anim.slide_in_left);
	}


	if (options.swipeBack !== false) {

		window.addEventListener('swipe', function(e) {

			if (e.direction === 'right') {

				that.closeWindow(window, options);
			}

			return;
		});
	}


	if (OS_ANDROID && options.displayHomeAsUp !== false && !window.navBarHidden) {

		window.addEventListener('open', function() {

			var activity = window.getActivity();

			if (activity) {

				var actionBar = activity.actionBar;

				if (actionBar) {

					actionBar.displayHomeAsUp = true;
					actionBar.onHomeIconItemSelected = function() {
						that.closeWindow(window, options);
					};
				}
			}
		});

		window.addEventListener('androidback', function() {

			that.closeWindow(window, options);
		});
	}


	return window.open(options);

}; // END openWindow()


/**
 * Closes window in navigation stack
 *
 * @public
 * @method closeWindow
 * @param {Ti.UI.Window} window
 * @param {Map/Dictonary} options
 * @return {Mixed}
 */
NavigationWindow.prototype.closeWindow = function(window, options) {

	// defaults options
	options = (options || {});


	if (OS_ANDROID && options.animated !== false) {

		options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
	}


	return window.close(options);

}; // END closeWindow()


// provide public access to module
module.exports = NavigationWindow;