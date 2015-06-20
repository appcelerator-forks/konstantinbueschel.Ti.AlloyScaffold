// fetch arguments
var args = (arguments[0] || {});


// default arguments
_.defaults(args, {

	image: ''
});


// variable initialization
var ICON_CLICK_EVENT = 'iconClick',
	ICON_SIZE = (Alloy.isTablet ? 80 : 40),

	_radians = ((90 / (args.iconCount - 1)) * args.index * Math.PI / 180),
	_bounceLeft = (Math.sin(_radians) * (args.radius + args.bounceDistance)),
	_bounceBottom = (Math.cos(_radians) * (args.radius + args.bounceDistance)),
	_finalLeft = (Math.sin(_radians) * args.radius),
	_finalBottom = (Math.cos(_radians) * args.radius),

	_animations = {

		openBounce: Ti.UI.createAnimation({

			duration: args.menuDuration,
			bottom:   _bounceBottom,
//			left:     _bounceLeft,
			right:     _bounceLeft,
			delay:    (args.index * args.stagger)
		}),

		openFinal: Ti.UI.createAnimation({

			duration: (args.menuDuration / 3.5),
			bottom:   _finalBottom,
//			left:     _finalLeft
			right:     _finalLeft
		}),

		closeBounce: Ti.UI.createAnimation({

			duration: (args.menuDuration / 3.5),
			bottom:   _bounceBottom,
//			left:     _bounceLeft,
			right:     _bounceLeft,
			delay:    ((args.iconCount - (args.index + 1)) * args.stagger)
		}),

		closeFinal: Ti.UI.createAnimation({

			duration: args.menuDuration,
			bottom:   0,
//			left:     0
			right:     0
		})
	};


/**
 * Icon click handler - fires icon click as widget event
 *
 * @private
 * @method _forwardIconClick
 * @param {Object} event
 * @return void
 */
function _forwardIconClick(event) {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.pathmenu.MenuIcon]._forwardIconClick()');


	$.trigger(ICON_CLICK_EVENT, {

		source:    $,
		iconIndex: args.index,
		iconId:    args.id
	});


	return;

} // END _forwardIconClick()


/**
 * Open menu icon with animation effect
 *
 * @public
 * @method open
 * @return void
 */
$.open = function() {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.pathmenu.MenuIcon].open():Open menu icon "', args.id, '"');


	_animations.openBounce.addEventListener('complete', function _openComplete(event) {

		event.source.removeEventListener('complete', _openComplete);

		$.menuIcon.animate(_animations.openFinal);


		return;
	});

	$.menuIcon.show();
	$.menuIcon.animate(_animations.openBounce);


	// ios uses the path.animator module for iOS rotations so that they can be
	// greater than 180 degrees
	if (OS_IOS) {

		$.menuIcon.rotate({

			angle:    args.iconRotation,
			duration: (args.menuDuration + (args.menuDuration / 3.5))
		});
	}


	return;

}; // END open()


/**
 * Close menu icon with animation effect
 *
 * @public
 * @method close
 * @return void
 */
$.close = function() {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.pathmenu.MenuIcon].close():', args.id);


	_animations.closeBounce.addEventListener('complete', function _closeComplete(event) {

		event.source.removeEventListener('complete', _closeComplete);


		_animations.closeFinal.addEventListener('complete', function _onComplete(event) {

			event.source.removeEventListener('complete', _onComplete);

			$.menuIcon.hide();
		});


		$.menuIcon.animate(_animations.closeFinal);


		return;
	});

	$.menuIcon.animate(_animations.closeBounce);


	// ios uses the path.animator module for iOS rotations so that they can be
	// greater than 180 degrees
	if (OS_IOS) {

		$.menuIcon.rotate({

			angle:    args.iconRotation,
			duration: (args.menuDuration + (args.menuDuration / 3.5))
		});
	}


	return;

}; // END close()


/**
 * Description
 *
 * @public
 * @method resetVisibility
 * @return {Alloy.Controller.<de.kuebschel.pathmenu.MenuIcon>} $
 */
$.resetVisibility = function() {

	// use a short timeout to prevent flicker
	setTimeout(function() {

		$.menuIcon.opacity = 1;
		$.menuIcon.transform = Ti.UI.create2DMatrix().scale(1,1);


		return;

	}, 100);


	return $;

}; // END resetVisibility()


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



// init menu icon
$.menuIcon.hide();
$.menuIcon[OS_IOS ? 'setBackgroundImage' : 'setImage'](args.image);


if (!_.isNumber($.menuIcon.width)) {

	$.menuIcon.width = ICON_SIZE;
}

if (!_.isNumber($.menuIcon.height)) {

	$.menuIcon.height = ICON_SIZE;
}



// iOS uses path.animator module for rotations
if (!OS_IOS) {

	_animations.openBounce.transform = Ti.UI.create2DMatrix().rotate(args.iconRotation);
	_animations.closeFinal.transform = Ti.UI.create2DMatrix().rotate(-1 * args.iconRotation);
}



