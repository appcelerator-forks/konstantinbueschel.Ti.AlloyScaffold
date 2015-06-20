var Alloy = require('alloy');


// osname
exports.osname = Ti.Platform.osname;

// manufacturer
exports.manufacturer = Ti.Platform.manufacturer;

// model
exports.deviceModel = Ti.Platform.model;

// platform name
exports.platformName = Ti.Platform.name;

// platform architecture
exports.platformArchitecture = Ti.Platform.architecture;

// platform runtime
exports.platformRuntime = Ti.Platform.runtime;


// DPI
exports.deviceDPI = Ti.Platform.displayCaps.dpi;
exports.deviceXDPI = Ti.Platform.displayCaps.xdpi;
exports.deviceYDPI = Ti.Platform.displayCaps.ydpi;

// density
exports.densityLevel = Ti.Platform.displayCaps.density;

// logical density factor
exports.densityFactor = Ti.Platform.displayCaps.logicalDensityFactor;


/**
 * Converts Pixel to device specific DP
 *
 * @public
 * @method pixelToDPUnit
 * @param {Number} pixel
 * @return {Number} dp
 */
exports.pixelToDPUnit = function(pixel) {

	return require('alloy/measurement').pxToDP(pixel);

//	return Ti.UI.convertUnits(pixel, Ti.UI.UNIT_DIP);

	/*if (exports.deviceDPI > 160) {

		return (pixel / (exports.deviceDPI / 160));
	}

	return pixel;*/

}; // END pixelToDPUnit()


/**
 * Converts device specific DP to pixel
 *
 * @public
 * @method dpUnitToPixel
 * @param {Number} dpUnit
 * @return {Number} pixel
 */
exports.dpUnitToPixel = function(dpUnit) {

	return require('alloy/measurement').dpToPX(dpUnit);

//	return Ti.UI.convertUnits(dpUnit, Ti.UI.UNIT_PX);

	/*if (exports.deviceDPI > 160) {
		return (dpUnit * (exports.deviceDPI / 160));
	}

	return dpUnit;*/

}; // dpUnitToPixel()


// default system layout unit
exports.defaultUnit = Ti.App.Properties.getString('ti.ui.defaultunit', 'system');


// device width
exports.deviceWidth = (function() {

	if (OS_ANDROID && (exports.defaultUnit === 'dp' || exports.defaultUnit === 'dip')) {

		return exports.pixelToDPUnit(Ti.Platform.displayCaps.platformWidth);
	}

	return Ti.Platform.displayCaps.platformWidth;

})();


// device height
exports.deviceHeight = (function() {

	if (OS_ANDROID && (exports.defaultUnit === 'dp' || exports.defaultUnit === 'dip')) {

		return exports.pixelToDPUnit(Ti.Platform.displayCaps.platformHeight);
	}

	return Ti.Platform.displayCaps.platformHeight;

})();


// root page for (Google) Analytics tracking
exports.analyticsBasePage = (OS_ANDROID ? (Alloy.isTablet ? 'AndroidTablet' : 'AndroidPhone') : exports.deviceModel);

// TiSDK version
exports.tiVersion = Ti.version;

// package name || bundle ID || app ID
exports.appID = Ti.App.id;

// app version
exports.appVersion = Ti.App.version;
exports.appVersionShort = exports.appVersion.split('.').slice(0, 3).join('.');

// app name
exports.appName = Ti.App.name;

// app install ID
exports.appInstallID = Ti.App.installId;

// os version
exports.osVersion = Ti.Platform.getVersion();

// returns major OS version
exports.osMajorVersion = (function() {

	return exports.osVersion.split('.')[0] >> 0;
})();


// returns minor OS version
exports.osMinorVersion = (function() {

	return exports.osVersion.split('.')[1] >> 0;
})();


// os type
exports.osType = Ti.Platform.ostype;

// runs on retina device
exports.isRetina = (exports.deviceDPI === 320 && exports.densityLevel === 'high' && exports.platformName.search(/[iPod]/ig) === -1);

// runs on simulator
exports.isSimulator = (exports.deviceModel.toUpperCase() === 'GOOGLE_SDK' || exports.deviceModel.toUpperCase() === 'SIMULATOR' || exports.deviceModel.toUpperCase() === 'X86_64');

// returns app installation ID previous UDID
exports.installationID = Ti.Platform.id;

// deploy type
exports.deployType = Ti.App.deployType;

// has device a camera
exports.isCameraSupported = Ti.Media.isCameraSupported;


// returns Android API Version Codes
exports.androidVersionCodes = (function() {

	if (OS_ANDROID) {

		return {

			LOLLIPOP:				21,
			"4.4W": 				20,
			KITKAT:					19,

			JELLY_BEAN_MR2:			18,
			JELLY_BEAN_MR1:			17,
			JELLY_BEAN:				16,

			ICE_CREAM_SANDWICH_MR1:	15,
			ICE_CREAM_SANDWICH:		14,

			HONEYCOMB_MR2:			13,
			HONEYCOMB_MR1:			12,
			HONEYCOMB:				11,
			GINGERBREAD_MR1:		10
		};
	}

	return undefined;

})();


// return Android API Level
exports.apiLevel = (function() {

	if (OS_ANDROID) {

		return Ti.Platform.Android.API_LEVEL;
	}

	return undefined;

})();


// supports background service
exports.supportsBackgroundTasks = (function() {

    if (exports.osname === 'android') {
        return true;
    }

    if (exports.osname === 'iphone') {

        var osVersion = exports.osVersion.split('.');

        // if not iOS 4, then false
        if (parseInt(osVersion[0], 10) < 4) {
            return false;
        }

        // is greater than iPhone 3GS
        // this confirms hardware supports background processing
        var model =         exports.deviceModel.toLowerCase().replace('iphone', '').trim(),
            phoneVersion =  exports.osVersion.split('.');

        if (parseInt(phoneVersion[0], 10) < 3) {
            return false;
        }
    }

    // assume modern device return true
    return true;

})(); // END supportsBackgroundTasks()


// runs on 4-inch device
exports.is4InchIPhone = (function() {

    if (exports.osname !== 'iphone') {

	    return false;
    }

    return (Math.max(exports.deviceHeight, exports.deviceWidth) > 480);

})(); // END is4InchIphone()


/**
 * Returns if we are on an iPhone 6
 *
 * @public
 * @method isIPhone6
 * @return {Boolean}
 */
exports.isIPhone6 = (function() {

	return (Math.max(exports.deviceHeight, exports.deviceWidth) === 667);

})(); // END isIPhone6()


/**
 * Returns if we are on an iPhone 6 Plus
 *
 * @public
 * @method isIPhone6Plus
 * @return {Boolean}
 */
exports.isIPhone6Plus = (function() {

	return (Math.max(exports.deviceHeight, exports.deviceWidth) === 736);

})(); // END isIPhone6Plus()


// runs at least with iOS7
exports.isIOS7Plus = (function() {

    if (OS_ANDROID) {

        return false;
    }

    return (exports.osMajorVersion >= 7);

})(); // END isIOS7Plus()


// runs at least with iOS8
exports.isIOS8Plus = (function() {

	if (OS_ANDROID) {

		return false;
	}

	return (exports.osMajorVersion >= 8);

})(); // END isIOS8Plus()


// returns app info GET query string
exports.appInfoQueryString = ('aos=' + exports.osname + '&av=' + exports.appVersion);


// return statusbar height
exports.statusBarHeight = (function() {

	var statusbarHeight = 0;

	if (OS_ANDROID) {

		statusbarHeight = Math.round((25 * exports.deviceDPI) / 160);

		if ((exports.defaultUnit === 'dp' || exports.defaultUnit === 'dip')) {

			statusbarHeight = exports.pixelToDPUnit(statusbarHeight);
		}
	}
	else if (OS_IOS) {

		statusbarHeight = (20 * exports.densityFactor);
	}

	return statusbarHeight;

})(); // END statusBarHeight


// return navigationbar height
exports.navigationBarHeight = (function() {

	var navigationBarHeight = 0;

	if (OS_IOS) {

		navigationBarHeight = 44;
	}
	else if (OS_ANDROID) {

		var abx = require('com.alcoapps.actionbarextras');

		navigationBarHeight = abx.getActionbarHeight();


		if ((exports.defaultUnit === 'dp' || exports.defaultUnit === 'dip')) {

			navigationBarHeight = exports.pixelToDPUnit(navigationBarHeight);
		}
	}

	return navigationBarHeight;

})(); // END navigationBarHeight


// is device online
exports.hasNetworkConnectivity = function() {

    return Ti.Network.online;

}; // END hasNetworkConnectivity()


// wich network type is currently connected
exports.getNetworkType = function() {

    return Ti.Network.networkType;

}; // END getNetworkType()


/**
 * Returns the OS specific property from given map
 *
 * e.g.: getOSProperty({
 *  android:    100,
 *  iphone:     200,
 *  ipad:       300
 * });
 *
 * @method getOSProperty
 * @param {Object} map
 * @return {Property}
 */
exports.getOSProperty = function(/*Object*/map) {

    // default function or value
    var def =       (map.def || null),
        osname =    exports.osname;


    if (map[osname]) {
        if (type(map[osname]) === 'function') {
            return map[osname]();
        }
        else {
            return map[osname];
        }
    }
    else {
        if (exports.type(def) === 'function') {
            return def();
        }
        else {
            return def;
        }
    }

}; // END getOSProperty()


/**
 * Returns the specific deploy property from given map
 *
 * e.g.: getDeployProperty({
 *  test:    100,
 *  development:     200,
 *  production:       300
 * });
 *
 * @method getDeployProperty
 * @param {Object} map
 * @return {Property}
 */
exports.getDeployProperty = function(/*Object*/map) {

    //default function or value
    var def =           (map.def || null),
        deployType =    exports.deployType;

    if (map[deployType]) {
        if (typeof map[deployType] === 'function') {
            return map[deployType]();
        }
        else {
            return map[deployType];
        }
    }
    else {
        if (exports.type(def) === 'function') {
            return def();
        }
        else {
            return def;
        }
    }

}; // END getDeployProperty()


var class2type = {};

/**
 * Determine the internal JavaScript [[Class]] of an object.
 *
 * @method type
 * @param {Object} obj
 * @return {String}
 */
exports.type = function(obj) {

    var toString =     Object.prototype.toString,
        types =        'Boolean Number String Function Array Date RegExp Object';

    if (exports.isEmptyObject(class2type)) {

        var splittedTypes = types.split(' ');

        if (splittedTypes && splittedTypes.length) {

            splittedTypes.forEach(function(type) {
                class2type['[object ' + type + ']'] = type.toLowerCase();
            });
        }
    }

    return (obj === null ? String(obj) : class2type[toString.call(obj)] || 'object');

}; // END type()


/**
 * Converts number of bytes to human readable format
 *
 * @method bytesToHumanReadableFormat
 *
 * @param {Integer} bytes Number of bytes to convert
 * @param {Integer} precision Number of digits after the decimal separator
 * @param {Boolean} appendUnit Boolean append Unit?
 *
 * @return {String}
 */
exports.bytesToHumanReadableFormat = function(bytes, precision, appendUnit) {

    var sizes =         ['Bytes', 'KB', 'MB', 'GB', 'TB'],
        posttxt =       0,
        appendUnit =    ((appendUnit === true || appendUnit === false) ? appendUnit : true);

    if (bytes == 0) {
        return 'n/a';
    }

    if (bytes < 1024) {
        if (appendUnit === true) {

            return (Number(bytes) + ' ' + sizes[posttxt]);
        }
        else {
            return Number(bytes);
        }

    }

    while ( bytes >= 1024 ) {
        posttxt++;
        bytes = (bytes / 1024);
    }

    if (appendUnit === true) {

        return (Number(bytes).toFixed(precision) + ' ' + sizes[posttxt]);
    }
    else {

        return Number(bytes).toFixed(precision);
    }

}; // END bytesToSize()


/**
 * Chunks given array
 *
 * @method chunkArray
 *
 * @param {Array} ary
 * @param {Integer} chunkLength
 *
 * @return {Array} chunks
 */
exports.chunkArray = function(ary, chunkLength) {

    var chunks =    [],
        i =         0,
        n =         ary.length;

    while (i < n) {
        chunks.push(ary.slice(i, (i += chunkLength)));
    }

    return chunks;

}; // END chunkArray


/**
 * Returns current unix timestamp
 *
 * @method getNow
 * @return {Number}
 */
exports.getNow = function() {

	var now = Date.now && Date.now();

	if (!now) {

		now = Date().getTime();
	}

	return (now / 1000).toFixed(0);

}; // END getNow()


/**
 * Returns random number from interval [minNumber;maxNumber]
 *
 * @method createRandomNumber
 *
 * @param {Number/Integer} minNumber
 * @param {Number/Integer} maxNumber
 * @param {Number/Integer} digitCount
 *
 * @return {Number/Integer}
 */
exports.createRandomNumber = function(minNumber, maxNumber, digitCount) {

    var _ = require('/helpers/common/lodash');

    if (digitCount && digitCount > 1) {

        var randomNumber = '',
            i;

        for (i = digitCount; i > 0; i--) {
            randomNumber += _.random(minNumber, maxNumber);
        }

        return Number(randomNumber);
    }

    return _.random(minNumber, maxNumber);

}; // END createRandomNumber()


/**
 * Adding leading zeros to number until digits
 * length is reached
 *
 * @method padDigits
 * @param {Number} num
 * @param {Number} digits
 * @return {String}
 */
exports.padDigits = function(num, digits) {

    var numberString = '';

    if (exports.type(num) === 'number') {

        var numberString =  String(num),
            maxLength =     (numberString.length > digits ? numberString.length : digits);

        while (numberString.length < maxLength) {

            numberString = ('0' + numberString);
        }
    }

    return numberString;

}; // END padDigits()


/**
 * Determines if given string is url
 *
 * @public
 * @method isURL
 * @param {String} str
 * @return {Boolean} isURL
 */
exports.isURL = function(str) {

	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

	return regexp.test(str);

}; // END isURL()


/**
 * Saves data persistent
 *
 * @public
 * @method saveDataPersistent
 * @param {Object} options
 * @return void
 */
exports.saveDataPersistent = function(options) {

	Ti.App.Properties['set' + (options.type || 'String')](options.property, options.data);

	return;

}; // END saveDataPersistent()


/**
 * Retrieves persistent saved data
 *
 * @public
 * @method getPersistentData
 * @param {Object} options
 * @return {Mixed} data
 */
exports.getPersistentData = function(options) {

	return Ti.App.Properties['get' + (options.type || 'String')](options.property, options.defaultData);

}; // END getPersistentData()


/**
 * Navigates app to given window etc. from options
 *
 * @public
 * @method navigateApp
 * @param {Object} options
 * @return void
 */
exports.navigateApp = function(options) {

	require('/app/EventDispatcher').trigger('app:navigate', options);

	return;

}; // END navigateApp()


/**
 * Convertes query string into object
 *
 * @public
 * @method queryStringToObject
 * @param {String} queryString
 * @return {Object}
 */
exports.queryStringToObject = function(queryString) {

    var pairs =		queryString.split('&'),
    	result =	{};


    pairs.forEach(function(pair) {

        pair = pair.split('=');

        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });


    return JSON.parse(JSON.stringify(result));

}; // END queryStringToObject()


/**
 * Turns a JSON like object argument to param query string
 *
 * Note: If the value is null, key and value is skipped in http_build_query of PHP. But, phpjs is not.
 * depends on: urlencode
 *
 *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
 *     return 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
 *
 *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
 *     return 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
 *
 *
 * @public
 * @method paramsToQueryString
 * @param {Object} formData
 * @param {String} numericPrefix
 * @param {String} argSeparator
 * @return {String} queryString
 */
exports.paramsToQueryString = function(formData, numericPrefix, argSeparator) {

    var value, key, tmp = [],
        that = this;

	/**
	 * Query build helper
	 *
	 * @private
	 * @method _http_build_query_helper
	 * @param {Object} key
	 * @param {Object} val
	 * @param {Object} argSeparator
	 * @return {String}
	 */
    var _http_build_query_helper = function (key, val, argSeparator) {

        var k, tmp = [];

        if (val === true) {
            val = '1';

        } else if (val === false) {

            val = '0';
        }

        if (val != null) {

            if (typeof(val) === 'object') {

                for (k in val) {

                    if (val[k] != null) {
                        tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], argSeparator));
                    }
                }

                return tmp.join(_argSeparator);

            }
            else if (typeof(val) !== 'function') {

                return Ti.Network.encodeURIComponent(key) + '=' + Ti.Network.encodeURIComponent(val);

            }
            else {

                throw new Error('There was an error processing for http_build_query().');
            }
        }
        else {

            return '';
        }

    }; // END _http_build_query_helper()


    if (!argSeparator) {
        argSeparator = '&';
    }


    for (key in formData) {

        value = formData[key];

        if (numericPrefix && !isNaN(key)) {

            key = (String(numericPrefix) + key);
        }

        var query = _http_build_query_helper(key, value, argSeparator);

        if (query != '') {

            tmp.push(query);
        }
    }

    return tmp.join(argSeparator);

}; // END paramsToQueryString()


/**
 * Returns only momentjs module
 *
 * @method getMomentProxy
 * @return {Moment}
 */
exports.getMomentProxy = function() {

	var Moment = require('alloy/moment');

	Moment.locale(Ti.Locale.getCurrentLocale());

	return Moment;

}; // END getMomentProxy()


/**
 * Returns a momentjs (in locale timezone) object for date manipulation
 *
 * @public
 * @method getMoment
 * @return {Moment}
 */
exports.getMoment = function() {

	var Moment = exports.getMomentProxy();

	return Moment.apply(null, arguments);

}; // END getMoment()


/**
 * Returns a momentjs (in UTC) object for date manipulation
 *
 * @public
 * @method getMomentUTC
 * @return {Moment}
 */
exports.getMomentUTC = function() {

	var Moment = exports.getMomentProxy();

	return Moment.utc.apply(null, arguments);

}; // END getMomentUTC()


/**
 * Convertes a-Tag from given HTML content
 * into App links which fire Ti.App.Events
 * to communicate with the app
 *
 * @public
 * @method convertToAppLinks
 * @param {String} html
 * @param {Boolean} openInApp
 * @return {String} convertedHTML
 */
exports.convertToAppLinks = function(html, openInApp) {

	var convertedHTML = html;


	// event-handler for app
	convertedHTML = html.replace(/<a href="((http|https)[^"]+)"[^>]*>(.*?)<\/a>/gmi, '<a href="$1" onclick="Ti.App.fireEvent(\'app:webViewClick\', {link: \'$1\'' + (openInApp === true ? ',linkType: \'inapp\', view: \'minibrowser\'' : '') + '}); return false;">$3</a>');

	// mailto special
	convertedHTML = convertedHTML.replace(/<a href="mailto:([^"]+)"[^>]*>(.*?)<\/a>/gmi, '<a href="mailto:$1" onclick="Ti.App.fireEvent(\'app:webViewClick\', {linkType: \'email\', link: \'$1\'}); return false;">$2</a>');


	return convertedHTML;

}; // END convertToAppLinks


/**
 * Returns an object with needed app n platform information
 *
 * @public
 * @method getAppInfo
 * @return {Dictonary} infos
 */
exports.getAppInfo = function() {

	return {

		appName:      exports.appName,
		appVersion:   exports.appVersion,
		appSessionID: Ti.App.sessionId,

		device:    exports.platformName,
		osName:    exports.osname,
		osVersion: exports.osVersion,
		osType:    exports.osType,
		osLocale:  Ti.Platform.locale,

		osRuntime:    exports.platformRuntime,
		architecture: exports.platformArchitecture,
		batterLevel:  Ti.Platform.batteryLevel,
		memory:       Ti.Platform.availableMemory,

		UUID: exports.appInstallID,

		tiBuild: (exports.tiVersion + '.' + Titanium.buildHash + ' (' + Titanium.buildDate + ')')
	};

}; // END getAppInfo()


/**
 * Exposes getters and setters for given properties on given object
 *
 * @private
 * @method _expose
 * @param {Object} obj
 * @param {String[]} properties
 * @param {String[]} accessors
 * @return void
 */
//function _expose(obj, properties, accessors) {
//
//    _.each(properties, function(key) {
//
//        var cc = (key[0].toUpperCase() + key.substring(1)),
//            propertiesToDefine = {};
//
//        if (_.contains(accessors, 'get')) {
//
//            var get = exports['get' + cc] || ($['get' + cc] = function() {
//                return $.instance[key];
//            });
//
//            propertiesToDefine['get'] = get;
//        }
//
//        if (_.contains(accessors, 'set')) {
//
//            var set = exports['set' + cc] || ($['set' + cc] = function(val) {
//                $.instance[key] = val;
//            });
//
//            propertiesToDefine['set'] = set;
//        }
//
//
//        Object.defineProperty(obj, key, propertiesToDefine);
//    });
//
//    return;
//
//} // END _expose()


/**
 * Expose getters for given properties on given object
 *
 * @public
 * @method exposeGetters
 * @param {Object} obj
 * @param {String[]} properties
 * @return void
 */
//exports.exposeGetters = function(obj, properties) {
//
//    if (_.isObject(obj) && _.isArray(properties) && properties.length) {
//
//        _expose(obj, properties, 'get');
//    }
//
//    return;
//
//}; // END exposeGetters()


/**
 * Expose setters for given properties on given object
 *
 * @public
 * @method exposeSetters
 * @param {Object} obj
 * @param {String[]} properties
 * @return void
 */
//exports.exposeSetters = function(obj, properties) {
//
//    if (_.isObject(obj) && _.isArray(properties) && properties.length) {
//
//        _expose(obj, properties, 'set');
//    }
//
//    return;
//
//}; // END exposeSetters()


/**
 * Expose getters and setters for given properties on given object
 *
 * @public
 * @method expose
 * @param {Object} obj
 * @param {String[]} properties
 * @return void
 */
//exports.expose = function(obj, properties) {
//
//    if (_.isObject(obj) && _.isArray(properties) && properties.length) {
//
//        _expose(obj, properties, ['get', 'set']);
//    }
//
//    return;
//
//}; // END expose()