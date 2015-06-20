// fetch arguments
var args = (arguments[0] || {});


// defaults arguments
_.defaults(args, {

	icons: [],

	iconRotation:   720,
	menuDuration:   500,
	fadeDuration:   500,
	bounceDistance: 25,
	stagger:        25,

	radius: (Ti.Platform.displayCaps.platformWidth / 2 - $.menuButton.width / 2)
});


// varialbe initialization
var ICON_CLICK_EVENT = 'iconClick',
    BUTTON_SIZE      = (Alloy.isTablet ? 80 : 40),

    _animations      = {

	    fadeOut:   null,
	    fadeIn:    null,
	    fadeLarge: null,

	    open:  null,
	    close: null
    },

    _isOpen          = false,
    _isAnimating     = false,
    _icons           = [];



/**
 * Adds icon to menu if not already done
 *
 * @public
 * @method addIcon
 * @param {Dictionary} iconArgs
 * @return {Alloy.Controller.<de.kbueschel.pathmenu.MenuIcon>}
 */
$.addIcon = function(iconArgs) {

	if (_isOpen === true) {

		return undefined;
	}


	// TODO: Check for icon id before creation
	var icon = Widget.createController('MenuIcon', iconArgs);

	icon.on(ICON_CLICK_EVENT, _onMenuIconClick);


	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.pathmenu.widget].addIcon()', 'iconArgs', iconArgs, '_isOpen', _isOpen, 'already created?', _.contains(_icons, icon));


	if (!_.contains(_icons, icon)) {

		_icons.push(icon);

		$.menu.add(icon.getView());
	}


	return icon;

}; // END addIcon()


/**
 * Removes icon from menu
 *
 * @public
 * @method removeIcon
 * @param {Alloy.Controller.<de.kbueschel.pathmenu.MenuIcon>/String} MenuIcon / id
 * @return void
 */
$.removeIcon = function(args) {

	if (!_isOpen) {

		if (_.isObject(args) && _.contains(_icons, args)) {

			$.menu.remove(args.getView());

			args.cleanup();

			// TODO: Pop menu icon from icons array
		}
		else if (_.isString() && args.length && false) {

			// TODO: Fetch menu icon from ID

			$.menu.remove(icon.getView());

			icon.cleanup();

			// TODO: Pop menu icon from icons array
		}
	}


	return $;

}; // END removeIcon()


/**
 * Description
 *
 * @public
 * @method clear
 * @return {Alloy.Widget.<de.kbueschel.pathmenu>} $
 */
$.clear = function() {

	if (!_isOpen) {

		_.each(_icons, function(icon) {

			$.menu.remove(icon.getView());

			icon.cleanup();

			return;
		});

		_icons.length = 0;
	}


	return $;

}; // END clear()


/**
 * Description
 *
 * @public
 * @method cleanup
 * @return void
 */
$.cleanup = function() {

	return;

}; // END cleanup()


/**
 * Description
 *
 * @private
 * @method _open
 * @return void
 */
function _open() {

	// change menu state
	_isOpen = true;


	// animate menu button
	$.menuButton.animate(_animations.open);


	// quick and dirty fix for making the containing view "fit"
	$.menu.width = (args.radius + args.bounceDistance + $.menuButton.width);
	$.menu.height = (args.radius + args.bounceDistance + $.menuButton.width);


	// Open all the icons with animation
	_.invoke(_icons, 'open');


	return;

} // END _open()


/**
 * Description
 *
 * @private
 * @method _close
 * @return void
 */
function _close() {

	// change menu state
	_isOpen = false;


	// animate menu button
	$.menuButton.animate(_animations.close);


	// quick and dirty fix for making the containing view "fit"
	setTimeout(function() {

		$.menu.width = $.menuButton.width;
		$.menu.height = $.menuButton.width;

	}, (args.menuDuration + (args.stagger * _icons.length) + 100));


	// close all the icons with animation
	_.invoke(_icons, 'close');


	return;

} // END _close()


/**
 * Description
 *
 * @private
 * @method _toggleMenu
 * @param {Object} event
 * @return void
 */
function _toggleMenu(event) {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.pathmenu.widget]._toggleMenu()', '_isAnimating', _isAnimating, '_isOpen', _isOpen);


	// Make sure we don't have other menu animations running
	if (_isAnimating === true) {

		return;
	}


	// change the menu states
	_isAnimating = true;


	if (_isOpen === true) {

		_close();
	}
	else {

		_open();
	}


	return;

} // END _toggleMenu()


/**
 * Description
 *
 * @private
 * @method _onMenuIconClick
 * @param {Object} event
 * @return void
 */
function _onMenuIconClick(event) {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.pathmenu.widget]._onMenuIconClick()', '_isAnimating', _isAnimating);


	// Make sure we don't have other menu animations running
	if (OS_ANDROID && _isAnimating === true) {

		return;
	}


	// change menu state
	_isAnimating = true;


	$.trigger(ICON_CLICK_EVENT, {

		source: $,
		icon:   event.source,
		index:  event.iconIndex,
		id:     event.iconId
	});


	// fade and scale out the menuButton
	if (OS_ANDROID) {

		_animations.fadeOut.right = ($.menuButton.width * 0.5);
//		_animations.fadeOut.left = ($.menuButton.width * 0.5);
		_animations.fadeOut.bottom = (-1 * ($.menuButton.height * 0.5));
	}


	$.menuButton.animate(_animations.fadeOut);


	// iterate through icons, fade and scale down the ones that weren't clicked,
	// fade and scale up the one that was.
	_.each(_icons, function(icon, index, collection) {

		var iconView = icon.getView(),
		    radians = ((90 / (collection.length - 1)) * index * Math.PI / 180);


		// Android scales from the top left, not the center like ios,
		// hence the extra left/bottom animations
		if (index !== event.iconIndex) {

			if (OS_ANDROID) {

//				_animations.fadeOut.left = Math.sin(radians) * args.radius + (iconView.width * 0.5);
				_animations.fadeOut.right = Math.sin(radians) * args.radius + (iconView.width * 0.5);
				_animations.fadeOut.bottom = Math.cos(radians) * args.radius - (iconView.height * 0.5);
			}

			iconView.animate(_animations.fadeOut);
		}
		else {

			if (OS_ANDROID) {

//				_animations.fadeLarge.left = Math.sin(radians) * args.radius - (iconView.width * 1.5);
				_animations.fadeLarge.right = Math.sin(radians) * args.radius - (iconView.width * 1.5);
				_animations.fadeLarge.bottom = Math.cos(radians) * args.radius + (iconView.height * 1.5);
			}

			iconView.animate(_animations.fadeLarge);
		}


		return;

	}, $);


	return;

} // END _onMenuIconClick()



// Create reusable fade & scale animations. Need to declare
// the transforms outside of the animation. See notes at the beginning
// of this file.
_animations.fadeOut = Ti.UI.createAnimation({

	duration: args.fadeDuration,
	opacity:  0
});

_animations.fadeOut.transform = Ti.UI.create2DMatrix().scale(0, 0);


_animations.fadeLarge = Ti.UI.createAnimation({

	duration: args.fadeDuration,
	opacity:  0
});

_animations.fadeLarge.transform = Ti.UI.create2DMatrix().scale(4, 4);


_animations.open = Ti.UI.createAnimation({

	duration: args.menuDuration
});

_animations.open.transform = Ti.UI.create2DMatrix().rotate(45);

_animations.open.addEventListener('complete', function() {

	_isAnimating = false;

	return;
});


_animations.close = Ti.UI.createAnimation({

	duration: args.menuDuration
});

// In Titanium, Android rotations always start at zero, regardless of last position.
// In Android Titanium apps you can pass two arguments to the rotate() function,
// the first being the starting rotation, the second being the final rotation.
// This is not a cross-platform method, so you need to make sure you are on Android
// before using 2 arguments.
// Jira Issue: http://jira.appcelerator.org/browse/TIMOB-6843
if (OS_ANDROID) {

	_animations.close.transform = Ti.UI.create2DMatrix().rotate(45, 0);
}
else {

	_animations.close.transform = Ti.UI.create2DMatrix().rotate(0);
}

_animations.close.addEventListener('complete', function() {

	_isAnimating = false;

	return;
});



// init menu
if (!_.isNumber($.menuButton.width)) {

	$.menuButton.width = BUTTON_SIZE;
}

if (!_.isNumber($.menuButton.height)) {

	$.menuButton.height = BUTTON_SIZE;
}


// FIXME: Must be icon size not menu button size
//args.radius = (Ti.Platform.displayCaps.platformWidth / 2 - $.menuButton.width / 2);


$.menuButton.transform = Ti.UI.create2DMatrix().rotate(0);
$.menuButton.show();



// create menu icons
_.each(args.icons, function(iconArgs, index, collection) {

	$.addIcon(_.extend(iconArgs, {

		index:     index,
		iconCount: collection.length,

		iconRotation:   args.iconRotation,
		menuDuration:   args.menuDuration,
		fadeDuration:   args.fadeDuration,
		bounceDistance: args.bounceDistance,
		stagger:        args.stagger,
		radius:         args.radius
	}));


	return;
});


_.invoke(_icons, 'resetVisibility');


// expose properties
_.each([

	'isOpen',
	'isAnimating'

], function(key) {

	Object.defineProperty($, key, {

		get: function() {

			return $['_' + key];
		}
	});


	return;
});


// expose CONSTANTS
exports.ICON_CLICK_EVENT = ICON_CLICK_EVENT;