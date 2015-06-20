var args = arguments[0] || {};


// defaults arguments
args = _.defaults(args, {

	maxRating:     5,
	initialRating: 0,

	editable:                true,
	differentiateUserRating: false,

	callback:             undefined,
	alreadyRatedCallback: undefined
});


// variable declaration
var _ratings       = [],
    _currentRating = args.initialRating;

$.editable = args.editable;


/**
 * Handles rating click
 *
 * @private
 * @method _handleRatingClick
 * @param {Object} clickEvent
 * @return void
 */
function _handleRatingClick(clickEvent) {

	var ratingIndex = clickEvent.source.index;

	if ($.editable === true) {

		exports.setRating(ratingIndex, true, args.differentiateUserRating);
	}
	else {

		if (args.alreadyRatedCallback && _.isFunction(args.alreadyRatedCallback)) {

			args.alreadyRatedCallback(ratingIndex);
		}
	}


	return;

} // END _handleRatingClick()



// create ratings
for (var i = 0; i < this._options.maxRating; i++) {

	var rating = $.UI.create('ImageView', {

		classes: ['rating'],
		index:   (i + 1)
	});


	$.viewProxy.add(rating);
	_ratings.push(rating);


	// add event listener if editable
	if ($.editable === true) {

		rating.addEventListener('click', _handleRatingClick);
	}
}


// set initial rating
exports.setRating(args.initialRating, false);


/**
 * Set rating
 *
 * @public
 * @method setRating
 * @param {Number} rating
 * @param {Boolean} triggerCallback - defaults true
 * @param {Boolean} differentiateUserRating - defaults false
 * @return void
 */
exports.setRating = function(rating, triggerCallback, differentiateUserRating) {

	// save last rating temporarly to pass it with
	// callback
	var lastRating = _currentRating;


	// define full image path
	var fullImagePath = (!!differentiateUserRating ? $.viewProxy.ratingImagePathFullFilled : $.viewProxy.ratingImagePathFull);


	// parse given argument
	if (rating >= 0 && rating <= args.maxRating) {

		// set new rating as current
		_currentRating = rating;


		// adjust UI
		var lastSelectedRatingIndex;

		_ratings.forEach(function(ratingObject, index) {

			if (ratingObject.index <= rating) {

				ratingObject.setImage(fullImagePath);
				lastSelectedRatingIndex = ratingObject.index;
			}
			else {

				ratingObject.setImage($.viewProxy.ratingImagePathEmpty);
			}

			return;

		}, this);


		if (rating - lastSelectedRatingIndex >= 0 && rating - lastSelectedRatingIndex <= 0.3) {

			_ratings[lastSelectedRatingIndex - 1].setImage(fullImagePath);
		}
		else if (rating - lastSelectedRatingIndex > 0.3
			&& rating - lastSelectedRatingIndex <= 0.8) {

			_ratings[lastSelectedRatingIndex].setImage($.viewProxy.ratingImagePathHalf);
		}
		else if (rating - lastSelectedRatingIndex > 0.8
			&& rating - lastSelectedRatingIndex <= 1) {

			_ratings[lastSelectedRatingIndex].setImage($.viewProxy.ratingImagePathEmpty);
		}
	}


	// execute callback
	if (args.callback && triggerCallback !== false) {

		args.callback.call(null, lastRating, _currentRating);
	}


	return;

}; // END setRating()


/**
 * Returns current rating
 *
 * @public
 * @method getRating
 * @return {Number} rating
 */
exports.getRating = function() {

	return _currentRating;

}; // END getRating()


/**
 * Sets whether rating is editable or not
 *
 * @public
 * @method setEditable
 * @param {Boolean} editable
 * @return void
 */
exports.setEditable = function(editable) {

	$.editable = !!editable;

	return;

}; // END setEditable()


/**
 * Return whether rating is editable
 *
 * @public
 * @method isEditable
 * @return {Boolean} editable
 */
exports.isEditable = function() {

	return $.editable;

}; // END isEditable()