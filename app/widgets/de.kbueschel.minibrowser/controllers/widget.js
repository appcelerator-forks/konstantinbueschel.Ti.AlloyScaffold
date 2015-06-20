var args = arguments[0] || {};


// default arguments
args = _.defaults(args, {

	url:           '',
	errorPagePath: '/html/error.html',

	showToolbar:          true,
	fetchDocumentTitle:   true,
	showDefaultErrorPage: true
});


// variable initialization
$.url = (args.url);
$.isInitialized = false;
$.hasError = false;

var _reload = false,
    _reloadURL = $.url;


delete args.url;


// create toolbar components
if (args.showToolbar === true) {

	/**
	 * Enables/disables toolbar buttons depending on
	 * the webview loading state
	 *
	 * @public
	 * @method updateToolbar
	 * @param {Dictonary} args
	 * @return void
	 */
	$.updateToolbar = function(args) {

		// default args
		args = _.defaults((args || {}), {

			isLoading:     false,
			enableBack:    false,
			enableForward: false
		});


		// isLoading something?
		if (!_.isBoolean(args.isLoading)) {

			args.isLoading = false;
		}


		// if page is not loading
		if (args.isLoading === false) {

			$.browseBack.setEnabled(!!args.enableBack);
			$.browseForward.setEnabled(!!args.enableForward);

			$.action.setEnabled(true);
			$.refresh.setEnabled(true);
		}
		else {

			$.action.setEnabled(false);
			$.refresh.setEnabled(false);
		}


		return;

	}; // END updateToolbar()


	$.updateToolbar();


	/**
	 * Button click handler
	 *
	 * @private
	 * @method _handleButtonClick
	 * @param {Object} event
	 * @return void
	 */
	function _handleToolbarClick(event) {

		// DEBUG (function(){/*Ti.API.debug*/})('[de.kbueschel.minibrowser][Toolbar]._handleButtonClick():', event.source.id);

		switch (event.source.id) {

			case 'refresh':

				$.hasError = false;

				(OS_ANDROID ? $.webView.setUrl(_reloadURL) : $.webView.reload());

				break;


			case 'browseBack':

				$.webView.goBack();

				break;


			case 'browseForward':

				$.webView.goForward();

				break;


			case 'action':

				var url = $.webView.getUrl();

				require('/social/share').share({

					url:         (require('/common/tools').isURL(url) ? url : ''),
					removeIcons: 'vimeo,weibo,tencentweibo'
				});

				break;
		}


		return;

	} // END _handleButtonClick()
}


/**
 * Web view load, before load, error callbacks
 *
 * @private
 * @method _onWebViewLoadStateChange
 * @param {Object} event
 * @return void
 */
function _onWebViewLoadStateChange(event) {

	// DEBUG (function(){/*Ti.API.debug*/})('[de.kbueschel.minibrowser][WebView]._onWebViewLoadStateChange()', 'event', event.type);


	if (event && event.type) {

		var isLoading = false;

		switch (event.type) {

			case 'beforeload':

				if (OS_ANDROID) {

					$.loadingBar.show();
				}
				else if (OS_IOS) {

					$.window.setTitle(L('de.kbueschel.minibrowser.loadingMessage', 'Loading ...'));
				}


				var isRemoteURL = require('/common/tools').isURL(event.url);

				// save reload url
				if (isRemoteURL) {

					_reloadURL = event.url;
				}


				if ($.notification.isVisible === true && isRemoteURL) {

					$.notification.show({

						text:       L('webViewRequestConnect'),
						color:      '#ffa500'
					});
				}

				isLoading = true;

				break;


			case 'load':
			case 'error':

				// hide loading indicator
				if (OS_ANDROID) {

					$.loadingBar.hide();
				}


				isLoading = false;


				// process if error given
				if (event.type === 'error' && !event.success) {

					// for Android show blank page, to hide default error message
					if (OS_ANDROID && !args.showDefaultErrorPage && (args.errorPagePath || '').length) {

						$.webView.setUrl(args.errorPagePath);
					}


					// update error state
					$.hasError = true;

					var notificationOptions = {

						text:       (event.message || L('webViewDefaultLoadErrorMessage')),
						color:      '#ff0000',
						duration:   2
					};


					// fetch network connection state
					var isDisconnected = false;

					if (OS_IOS) {

						isDisconnected = ((event.errorCode && event.errorCode === -1009) || (event.code && event.code === -1009));
					}
					else {

						isDisconnected = !require('/common/tools').hasNetworkConnectivity();
					}


					// if error is caused by not given any network connection
					// set reload flag
					if (isDisconnected === true) {

						notificationOptions.duration = undefined;
						notificationOptions.text = L('webViewRequestDisconnected');
					}

					_reload = true;


					// show up error notification
					$.notification.show(notificationOptions);


					if (OS_IOS) {

						// stop loading
						$.webView.stopLoading();
					}
				}


				if (event.type === 'load') {

					// show up load notification
					if ($.notification.isVisible === true && (OS_IOS || !$.hasError)) {

						$.notification.show({

							text:		L('webViewRequestConnected'),
							color:		'#4ead54',
							duration:   1
						});
					}

					_reload = (OS_ANDROID ? $.hasError : false);
				}


				// change components title
				if (args.fetchDocumentTitle === true) {

					_updateTitle();
				}

				break;
		}


		// enable and disable buttons in toolbar
		if (args.showToolbar) {

			$.updateToolbar({

				isLoading:     isLoading,
				enableBack:    $.webView.canGoBack(),
				enableForward: $.webView.canGoForward()
			});
		}
	}


	return;

} // END _onWebViewLoadStateChange()


/**
 * If no window title is defined, set window title
 * to webview document title and change ActionBar
 * title
 *
 * @private
 * @method _updateTitle
 * @return void
 */
function _updateTitle() {

	// change window title to website document title
	if (OS_IOS) {

		var title = $.webView.evalJS('document.title');

		if (title && _.isString(title)) {

			$.window.setTitle(title);
		}
		else {

			$.window.setTitle('');
		}
	}


	return;

} // END _updateTitle()


/**
 * Handles network change events
 *
 * @private
 * @method _handleNetworkChanges
 * @param {Object} networkChangeEvent
 * @return void
 */
function _handleNetworkChanges(networkChangeEvent) {

	if (networkChangeEvent.online && _reload === true) {

		if (!$.isInitialized) {

			_onViewFocus.apply(OS_IOS ? $.window : $.container);
		}
		else {

			$.hasError = false;

			(OS_ANDROID ? $.webView.setUrl(_reloadURL) : $.webView.reload());
		}
	}

	return;

} // END _handleNetworkChanges()


/**
 * View focus callback
 *
 * @private
 * @method _onViewFocus
 * @param {Object} focusEvent
 * @return void
 */
function _onViewFocus(focusEvent) {

	// remove event listener
	this.removeEventListener(focusEvent.type, _onViewFocus);


	// set web view url to load
	$.webView.setUrl(_reloadURL);


	// add network change event listener
	require('/app/EventDispatcher').on('app:networkChange', _handleNetworkChanges);


	$.isInitialized = true;


	return;

} // END _onViewFocus()


/**
 * Cleans up the controller and view
 *
 * @public
 * @method cleanup
 * @return void
 */
$.cleanup = function() {

	// DEBUG (function(){/*Ti.API.debug*/})('[MiniBrowser][Toolbar].cleanup()');


	// let Alloy clean up listeners to global collections for data-binding
	// always call it since it'll just be empty if there are none
	$.destroy();


	// remove all event listeners on the controller
	$.off();


	// and custom global dispatchers (all at once, via context)
	require('/app/EventDispatcher').off(null, null, $);


	// remove event listener
	$.webView.removeEventListener('beforeload', _onWebViewLoadStateChange);
	$.webView.removeEventListener('error', _onWebViewLoadStateChange);
	$.webView.removeEventListener('load', _onWebViewLoadStateChange);

	require('/app/EventDispatcher').off('app:networkChange', _handleNetworkChanges);


	if (args.showToolBar) {

		// remove children
		if (OS_ANDROID) {

			$.toolbar.removeAllChildren();
		}
	}


	$.webView.stopLoading();
	$.webView.hide();


	if (OS_ANDROID) {

		$.loadingBar.hide();
		$.container.remove($.loadingBar);

		$.loadingBar = null;

		$.webView.pause();
		$.webView.release();
	}


	$.container.remove($.webView);
	$.container.remove($.notification.getView());

	$.notification.cleanup();


	return;

}; // END cleanup()