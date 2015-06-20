/**
 * Standard, native navigation (ActionBar for Android and NavigationWindow for iOS)
 *
 * This is a simple example of handling opening new windows in a cross platform
 * fashion.  If you want to manage the stack yourself, do things like close all
 * windows, etc. Reference some of the other examples on managing your own
 * stack of views or windows.
 *
 * @class Navigation
 */

/**
 * Navigator object
 *
 * @constructor
 * @param {Object} args
 * @param {Object} args.parent The parent which this navigation stack will belong
 *
 */
function Navigator(args) {

	// save context
	var self = this;


	// default args
	args = (args || {});


	/**
	 * The parent navigation window (iOS only)
	 * @type {Object}
	 */
	this.parent = args.parent;


	// variable initialization
	this.controllers = [];
	this.currentController = null;
	this.currentControllerArguments = {};
	this.currentOpenOptions = {};


	/**
	 * Open a screen controller
	 *
	 * @public
	 * @method push
	 * @param {String} _controller
	 * @param {Dictionary} _controllerArguments The arguments for the controller (optional)
	 * @param {Dictionary} _windowOpenOptions The arguments for the window open mehtod (optional)
	 * @return {Controllers} Returns the new controller
	 */
	this.push = function(_controller, _controllerArguments, _windowOpenOptions) {

		var controller;

		if (typeof _controller === 'string') {

			controller = Alloy.createController(_controller, _controllerArguments);
		}
		else {

			controller = _controller;
		}


		self.currentController = controller;
		self.currentControllerArguments = _controllerArguments;
		self.currentOpenOptions = _windowOpenOptions;
		self.controllers.push(controller);


		if (controller.handleOrientation) {

			// Bind orientation events for this controller instance
			Alloy.Globals.bindOrientationEvents(controller);
		}


		var window = (controller.window || controller.getView());


		if (OS_IOS || OS_ANDROID) {

			self.parent.openWindow(window, self.currentOpenOptions);
		}
		else {

			window.open();
		}


		return controller;

	}; // END push()


	/**
	 * Description
	 *
	 * @public
	 * @method open
	 * @return {Alloy.Controller}
	 */
	this.open = function() {

		return self.push.call(this, arguments);

	}; // END open()


	/**
	 * Description
	 *
	 * @public
	 * @method pop
	 * @return void
	 */
	this.pop = function() {

		var controller = self.controllers.pop(),
		    window = (controller.window || controller.getView());

		if (OS_IOS || OS_ANDROID) {

			self.parent.closeWindow(window);
		}
		else {

			window.close();
		}


		controller && controller.destroy();


		return;

	}; // END pop()


	/**
	 * Description
	 *
	 * @public
	 * @method back
	 * @return void
	 */
	this.back = function() {

		this.pop.apply(this, arguments);

		return;

	}; // END back()


	/**
	 * Description
	 *
	 * @public
	 * @method openModal
	 * @param _controller
	 * @param _controllerArguments
	 * @returns {Alloy.Controller}
	 */
	this.openModal = function(_controller, _controllerArguments) {

		var controller = Alloy.createController(_controller, _controllerArguments),
		    window = (controller.window || controller.getView());


		self.currentController = controller;
		self.currentControllerArguments = _controllerArguments;


		if (OS_IOS) {

			window.open({

				modal:    true,
				animated: false
			});
		}
		else {

			window.addEventListener('open', function _onOpen(event) {

				this.removeEventListener(event.type, _onOpen);

				self.setActionBarStyle(window);

				return;
			});

			window.open();
		}


		return controller;

	}; // END openModal()


	/**
	 * Description
	 *
	 * @public
	 * @method closeModal
	 * @param _controller
	 * @return void
	 */
	this.closeModal = function(_controller) {

		if (OS_IOS) {

			(_controller.window || _controller.getView()).close();
			_controller.window = null;
		}
		else {

			(_controller.window || _controller.getView()).close();
			_controller.window = null;
		}

		_controller.destroy();
		_controller = null;


		return;

	}; // END closeModal()


	this.home = function() {

		if (!self.currentController) {

			// DEBUG
			Ti.API.error('Navigator::Cannot close controller');

			return;
		}


		if (OS_IOS) {

			self.currentController.navWindow.close();
		}
		else {

			(self.currentController.window || self.currentController.getView()).close();
		}

		self.currentController = null;


		return;

	}; // END home()


	return this;

} // END Navigator()


// Calling this module function returns a new navigation instance
module.exports = function _createNavigator(args) {

	return new Navigator(args);

}; // END _createNavigator()