var args = arguments[0] || {};

args = _.defaults(args, {

	value:   false,
	checked: false,
	label:   '',

	unselectedTitle: '\u2713',
	selectedTitle:   '\u2713',

	selectedColor: '#ffffff',

	unselectedBackgroundColor: '#ffffff',
	selectedBackgroundColor:   '#4ead54'
});


/**
 * Toggles checkbox state and UI
 *
 * @private
 * @method _toggle
 * @param {Boolean} value - optional: force a particular state
 * @param {Boolean} triggerCallback - optional: Defaults to true
 * @return void
 */
function _toggle(value, triggerCallback) {

	// update checked state
	if (value === true || value === false) {

		$.checked = value;
	}
	else {

		$.checked = !$.checked;
	}


	// mark button as checked
	$.checkBox.setTitle($.checked ? args.selectedTitle : args.unselectedTitle);
	$.checkBox.setBackgroundColor($.checked ? args.selectedBackgroundColor : args.unselectedBackgroundColor);
	$.checkBox.setBorderWidth($.checked ? 0 : 1);


	if (args.callback && triggerCallback !== false) {

		args.callback($.checked, $.value, args.label);
	}


	// update value if it is boolean
	if (_.isBoolean($.value)) {

		$.value = $.checked;
	}

	return;

} // END _toggle()


$.value = args.value;
$.checked = args.checked;


if (_.isBoolean($.value)) {

	$.value = $.checked;
}


$.checkBox.setTitel(args.unselectedTitle);


if (args.label && args.label.length) {

	var _checkBoxLabel = Ti.UI.createLabel();

	_checkBoxLabel.setText(args.label);

	$.viewProxy.add(_checkBoxLabel);

	_checkBoxLabel.addEventListener('singleTap', _toggle);
}


// init elements with state
_toggle($.checked, false);