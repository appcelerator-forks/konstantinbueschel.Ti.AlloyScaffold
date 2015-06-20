var args = arguments[0] || {};


// variable initialization
_isInitialized = false;
_initTopValue = $.viewProxy.getTop();
_topValueForHiding = _initTopValue;

$.isVisible = false;


/**
 * Postlayout callback
 *
 * @private
 * @method _afterMessageLayout
 * @param {Object} afterLayoutEvent
 * @return void
 */
function _afterMessageLayout(afterLayoutEvent) {

	var negativeHeight = ($.viewProxy.getRect().height * -1),
	    setNewTopValue = (Math.abs(negativeHeight) > Math.abs(_initTopValue));


	if (!_isInitialized) {

		if (setNewTopValue) {

			$.viewProxy.setTop(negativeHeight);
		}

		_isInitialized = true;
	}

	if (setNewTopValue) {

		_topValueForHiding = negativeHeight;
	}


	return;

} // END _afterMessageLayout()


/**
 * Hides notification if it is visible
 *
 * @public
 * @method hide
 * @param {Dictonary} args
 * @return void
 */
$.hide = function(args) {

	// merge arguments
	args = _.defaults(args, {

		delay:      0,
		duration:   200
	});

	args.top = _topValueForHiding;


	// hide notification
	if ($.isVisible === true) {

		$.isVisible = false;

		if ($.viewProxy) {

			$.viewProxy.animate({

				delay:    args.delay,
				duration: args.duration,
				top:      args.top

			}, function() {

				if (args && args.callback) {

					args.callback();
				}
			});
		}
	}

	return;

}; // END hide()


/**
 * Shows up notification
 *
 * @public
 * @method show
 * @param {Dictonary} args
 * @return void
 */
$.show = function(args) {

	// update notification UI
	if (args.color) {

		$.viewProxy.setBackgroundColor(args.color);
	}

	if (args.text) {

		$.notificationMessage.setText(args.text);
	}


	// if notification already shows up
	// update UI, if duration is given than
	// hide it after delay = duration
	if ($.isVisible === true && args.duration) {

		setTimeout(function() {

			$.hide({

				callback: function() {

					if (args.callback) {

						args.callback();
					}
				}
			});

		}, (args.duration * 1000));
	}
	else {

		$.isVisible = true;

		$.viewProxy.animate({

			top:      0,
			duration: 200,
			delay:    (args.delay || 0)

		}, function() {

			if (args.duration) {

				setTimeout(function() {

					$.hide({callback: args.callback});

				}, (parseInt(args.duration) * 1000));
			}
			else if (args.callback) {

				args.callback();
			}
		});
	}

	return;

}; // END show()


/**
 * Cleans up the controller and view
 *
 * @public
 * @method cleanup
 * @return void
 */
$.cleanup = function() {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.notification][widget].cleanup()');


	// let Alloy clean up listeners to global collections for data-binding
	// always call it since it'll just be empty if there are none
	$.destroy();


	// remove all event listeners on the controller
	$.off();


	// and custom global dispatchers (all at once, via context)
	require('/app/EventDispatcher').off(null, null, $);


	// remove event listener
	$.viewProxy.remove($.notificationMessage);

	$.viewProxy = null;
	$.notificationMessage = null;


	return;

}; // END cleanup()


// export public methods
exports.hide = $.hide;
exports.show = $.show;