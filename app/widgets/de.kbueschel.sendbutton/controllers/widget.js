
// variable initialization
$.isLoading = false;


/**
 * Shows activity indicator
 *
 * @public
 * @method send
 * @return {Controller} $
 */
$.send = function() {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.sendbutton].send()', 'isLoading', $.isLoading);


	if (!$.isLoading) {

		$.isLoading = true;

		$.sendButton.hide();
		$.loadingIndicator.show();

		$.trigger('send');
	}

	return $;

}; // END send()


/**
 * Cancels loading state
 *
 * @public
 * @method cancel
 * @return {Controller} $
 */
$.cancel = function() {

	// DEBU(function(){/*Ti.API.debug*/})('[de.kbueschel.sendbutton].cancel()', 'isLoading', $.isLoading);


	if ($.isLoading === true) {

		$.loadingIndicator.hide();
		$.sendButton.show();
	}

	$.isLoading = false;

	$.trigger('cancel');

	return $;

}; // END cancel()


/**
 * Toggles send / cancel state
 *
 * @public
 * @method toggle
 * @return {Controller} $
 */
$.toggle = function() {

	if ($.isLoading === true) {

		$.cancel();
	}
	else {

		$.send();
	}

	return $;

}; // END toggle()


/**
 * Send button touch callback
 *
 * @private
 * @method _send
 * @param {Object} event
 * @return void
 */
function _send(event) {

	$.send();

	return;

} // END _send()