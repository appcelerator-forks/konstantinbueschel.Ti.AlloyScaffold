var Alloy = require('alloy');


/**
 * Cross platform navigation controller
 *
 * @constructor
 * @method NavigationController
 * @param {Dictionary} args
 * @return {NavigationController} this
 */
function NavigationController(args) {

    // variable initialization
	this.windows = [];


    // merge defaults with arguments
    this.args = _.defaults((args || {}), {

	    shouldFirstWindowExit: true,
	    modal:                 false,
	    navigationWindow:      null
    });


    return this;

} // END NavigationController()


/**
 * Opens a window and add it to stack
 *
 * @public
 * @method open
 * @param {Ti.UI.Window} window
 * @param {Dictonary} openOptions
 * @return void
 */
NavigationController.prototype.open = function(window, openOptions) {

    // protect context
    var self = this,
        windowToOpen = window;


    // add close listener to window due to removing window
    // from stack on closing
	windowToOpen.addEventListener('close', function(event) {

        // don not pop the last window, because it is the base one
        if (self.windows.length > 1) {

			var closedWindow = self.windows.pop();

			// if base window push it back to stack
			if (window != closedWindow ) {

				self.windows.push(closedWindow);


				// DEBUG WARNING
	(function(){/*Ti.API.warn*/})('[NavigationController].onWindowClose(): Base window should not been popped from stack. It was pushed back into stack!');
			}


			// close dependent window?
			if (this.toClose) {

				if (self.navigationWindow) {

					self.navigationWindow.closeWindow(this.toClose, {animated: false});
				}
				else {
					this.toClose.close({animated: false});
				}
			}


	        // opening dependent window?
	        if (this.toOpen) {

				self.open(this.toOpen);
	        }
        }

        return;
    });


    // additional window event listener
	windowToOpen.addEventListener('app:navigationControllerSetToClose', function(setToCloseEvent) {

	    this.toClose = setToCloseEvent.window;
	    return;
    });

	windowToOpen.addEventListener('app:navigationControllerSetToOpen', function(setToOpenEvent) {

        this.toOpen = setToOpenEvent.window;
        return;
    });


    // Hack - Property that causes the window to opens as heavyweight (only Android OS)
	windowToOpen.navBarHidden = (_.isBoolean(windowToOpen.navBarHidden) ? windowToOpen.navBarHidden : false);


    // on first window
    if (this.windows.length === 1) {

        if (OS_ANDROID) {

        	windowToOpen.exitOnClose = (this.args.shouldFirstWindowExit === false ? false : true);
        }

        this.args.window = windowToOpen;

        this.navigationWindow = _createNavigationWindow(this.args);
		this.navigationWindow.open(openOptions || {});

    }
    // all following windows
    else {

        if (this.navigationWindow) {

			this.navigationWindow.openWindow(windowToOpen, (openOptions || {}));
        }
        else {

        	windowToOpen.open(windowOpenOptions || {});
        }
    }


    return;

}; // END open()


/**
 * Closing given window
 *
 * @public
 * @method close
 * @param {Ti.UI.Window} window
 * @return void
 */
NavigationController.prototype.close = function(window) {

    // is window to close given
    if (window && window.apiName === 'Ti.UI.Window') {

        // close window
        if (this.navigationWindow) {

        	this.navigationWindow.closeWindow(window);
        }
        else {

	        window.close();
        }
    }

    return;

}; // END close()


/**
 * Return to root window
 *
 * @public
 * @method home
 * @param {Ti.UI.Window} triggerWindow
 * @return void
 */
NavigationController.prototype.home = function(triggerWindow) {

    // variable initialization
    var stackLength = this.windows.length,
        lastItemPos = (stackLength - 1);


    // only if not the first window in stack
    if (stackLength > 1) {

        // setup chain reaction by setting up the flags on all the windows
        var i, self = this;

        for (i = lastItemPos; i > 1; i--) {

            // set dependent window
	        self.windows[i].fireEvent('app:navigationControllerSetToClose', {

	            window: self.windows[i - 1]
            });
        }


        // start chain reaction by closing current window
        var lastWindowIndex = (this.windows.length - 1);

        if (this.navigationWindow) {

        	this.navigationWindow.closeWindow(this.windows[lastWindowIndex]);
        }
        else {

			this.windows[lastWindowIndex].close();
        }
    }

    return;

}; // END home()


/**
 * Opens new window from root window
 *
 * @public
 * @method openFromHome
 * @param {Ti.UI.Window} window
 * @return void
 */
NavigationController.prototype.openFromHome = function(window) {

    // first window handling
    if (this.windows.length === 1) {

        // open window normally
        this.open(window);
    }
    else {

        // delegates window opening to first window in stack
        // respectively to last window to close
        this.windows[1].fireEvent('app:navigationControllerSetToOpen', {

        	window: window
        });

        this.home();
    }

    return;

}; // END openFromHome()


/**
 * Adds controller given to stack. If it's the first controller, for iOS it
 * creates an navigation window
 *
 * @public
 * @method add
 * @param {Ti.UI.Window} window
 * @return void
 */
NavigationController.prototype.add = function(window) {

	if (_.isObject(window) && window.apiName === 'Ti.UI.Window') {

		this.windows.push(window);


		// protect context
		var self = this;


		// add close listener to window due to removing window
	    // from stack on closing
		window.addEventListener('close', function(windowCloseEvent) {

	        // dont pop the last window, because it is the base one
	        if (self.windows.length > 1) {

				var closedWindow = self.windows.pop();

				// if base window push it back to stack
				if (window != closedWindow) {

					self.windows.push(closedWindow);


					// DEBUG WARNING
		(function(){/*Ti.API.warn*/})('[NavigationController].onWindowClose():Base window should not been popped from stack. It was pushed back into stack!');
				}


				// close dependent window?
				if (this.toClose) {

					if (self.navigationWindow) {

						self.navigationWindow.closeWindow(this.toClose, {animated: false});
					}
					else {
						this.toClose.close({animated: false});
					}
				}


		        // opening dependent window?
		        if (this.toOpen) {

			        self.open(this.toOpen);
		        }
	        }

	        return;
	    });


	    // additional window event listener
	    window.addEventListener('app:navigationControllerSetToClose', function(setToCloseEvent) {

		    this.toClose = setToCloseEvent.window;
		    return;
	    });

		window.addEventListener('app:navigationControllerSetToOpen', function(setToOpenEvent) {

	        this.toOpen = setToOpenEvent.window;
	        return;
	    });


	    // Hack - Property that causes the window to opens as heavyweight (only Android OS)
		window.navBarHidden = (_.isBoolean(window.navBarHidden) ? window.navBarHidden : false);


		if (this.windows.length === 1) {

			if (OS_IOS && !this.navigationWindow) {

				this.args.window = window;

				this.navigationWindow = _createNavigationWindow(this.args);
			}
			else if (OS_ANDROID) {

				window.exitOnClose = true;
			}
		}
	}

	return;

}; // END add()


/**
 * Goes on step back in window hierarchy, if argument
 * given it goes n-windows back
 *
 * @public
 * @method back
 * @param {Number} stepsBack - optional
 * @return void
 */
NavigationController.prototype.back = function(stepsBack) {

    stepsBack = Number(stepsBack);

    if (!isNaN(stepsBack) && (this.windows.length - stepsBack) >= 1) {

        // setup chain reaction by setting up the flags on all the windows
	    var lastWindowIndex = (this.windows.length - 1),
	        i = 1,
	        self = this;


		for (i; i < stepsBack; i++) {

			// set dependent window
			self.windows[lastWindowIndex].fireEvent('app:navigationControllerSetToClose', {

				window: self.windows[lastWindowIndex - 1]
			});

			lastWindowIndex--;
		}


		// start chain reaction by closing first window
		lastWindowIndex = (this.windows.length - 1);

		if (this.navigationWindow) {

			this.navigationWindow.closeWindow(this.windows[lastWindowIndex]);
		}
		else {

			this.windows[lastWindowIndex].close();
		}
    }
    else {

        // fetching last window index
        var lastWindowIndex = (this.windows.length - 1);

        if (this.navigationWindow) {

        	this.navigationWindow.closeWindow(this.windows[lastWindowIndex]);
        }
        else {
        	this.windows[lastWindowIndex].close();
        }
    }

    return;

}; // END back()


/**
 * If not previously done, creates navigation window for iOS
 *
 * @private
 * @method _createNavigationWindow
 * @param {Dictonary} args
 * @return {Ti.UI.iOS.NavigationWindow}
 */
function _createNavigationWindow(args) {

	// variable declaration
	var navigationWindow = undefined;


	if (_.isObject(args.window) && args.window.apiName === 'Ti.UI.Window') {

		if (OS_IOS) {

			if (_.isObject(args.navigationWindow) && args.navigationWindow.apiName === 'Ti.UI.iOS.NavigationWindow') {

				navigationWindow = args.navigationWindow;

				delete args.navigationWindow;
			}
			else {

				navigationWindow = Ti.UI.iOS.createNavigationWindow(args);
			}
		}
		else {

			var NavigationWindow = require('/navigation/NavigationWindow');

			navigationWindow = new NavigationWindow(args);

			NavigationWindow = null;
		}
	}


	return navigationWindow;

} // END _createNavigationWindow()


// provide public access to module
module.exports = NavigationController;