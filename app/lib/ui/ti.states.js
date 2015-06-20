/*
 * /app/lib/ti.states.js
 *
 * UI States Manager for Appcelerator Titanium
 *
 * UIStatesManager is a component that enables you define states for your
 * user interface components. It changes the properties from one state to
 * another with smooth ease animation. All you need is to define state specific
 * styles and UIStatesManager will do the trasition automatically.
 */

/**
 * Manager
 *
 * @private
 * @constructor
 * @return {{currentState: null, controller: null, styles: null, init: Function, findProperties: Function, changeToState: Function}}
 */
function StateManager() {

	return {

		currentState: null,
		controller:   null,
		styles:       null,

		/**
		 * Description
		 *
		 * @param {Alloy.Controller} _controller
		 * @param {String} state
		 * @return void
		 */
		init: function (_controller, state) {

			controller = _controller;
			currentState = state;
			styles = require('/alloy/styles/' + controller.__controllerPath);


			this.changeToState(state, {

				duration: 0

			}, undefined, false);


			return;

		}, // END init()


		/**
		 * Description
		 *
		 * @param {Ti.UI.View} view
		 * @param {String} state
		 * @return {Dictionary} props
		 */
		findProperties: function (view, state) {

			// loop over props to animate
			var props = {},
			    keys = _.keys(view);

			_.each(keys, function (key) {

				if (key.indexOf(state) === 0) {

					var nativeProp = key.substring(state.length + 1);

					view['reset_' + key] = view[nativeProp];

					props[nativeProp] = view[key];
				}

				return;
			});

			return props;

		}, // END findProperties()


		/**
		 * Description
		 *
		 * @param {String }state
		 * @param {Dictionary} animationOptions
		 * @param {Function} callback
		 * @param {Boolean} withAnimation
		 * @return void
		 */
		changeToState:  function (state, animationOptions, callback, withAnimation) {

			withAnimation = (withAnimation ? !!withAnimation : true);
			currentState = state;


			// DEBUG
(function(){/*Ti.API.debug*/})('[ti.states].changeToState():Changing to state =', state, 'with animationOptions =', JSON.stringify(animationOptions), 'with animation =', withAnimation, 'callback =', typeof callback);


			var stateStyles = _.filter(styles, function (style) {

				return (style.key && style.key.indexOf(':' + state) > 0);
			});


			// DEBUG
(function(){/*Ti.API.debug*/})('[ti.states].changeToState():stateStyles =', stateStyles);


			var view, animation, viewProperties, mixedProperties;

			_.each(stateStyles, function(stateTSS, index, collection) {

				view = controller.getView(stateTSS.key.replace(':' + state, '').replace('#'));

				viewProperties = stateTSS.style;


				if (withAnimation === true) {

					mixedProperties = _.extend({}, viewProperties, animationOptions);

					animation = Ti.UI.createAnimation(mixedProperties);


					if (index === (collection.length - 1) && _.isFunction(callback)) {

						// DEBUG
			(function(){/*Ti.API.debug*/})('[ti.states].changeToState():Assigning complete callback function to last animation');


						animation.addEventListener('complete', callback);
					}


					view.animate(animation);


					return;
				}


				view.applyProperties(viewProperties);

				return;
			});

		} // END changeToState()

	}; // END return

} // END StateManager()


module.exports = new StateManager();