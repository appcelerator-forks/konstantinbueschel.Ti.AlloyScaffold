'use strict';

var gulp  = require('gulp'),
    $     = require('gulp-load-plugins')(),
    tiApp = require('tiapp.xml').load('./tiapp.xml'),
    nconf = require('nconf'),
    fs    = require('fs'),
    plist = require('plist'),
    path  = require('path'),
    exec  = require('child_process').exec;


/**********************************************************************************
 * CONFIGURATION
 * ********************************************************************************/

// add printf prototype to String object for better string formatting
String.prototype.printf = function(obj) {

	var useArguments = false,
	    _arguments = arguments,
	    i = -1;

	if (typeof _arguments[0] == 'string') {
		useArguments = true;
	}

	if (obj instanceof Array || useArguments) {

		return this.replace(/\%s/g, function(a, b) {

			i++;

			if (useArguments) {

				if (typeof _arguments[i] == 'string') {
					return _arguments[i];
				}
				else {
					throw new Error('Arguments element is an invalid type');
				}
			}

			return obj[i];
		});
	}
	else {

		return this.replace(/{([^{}]*)}/g, function(a, b) {

			var r = obj[b];

			return (typeof r === 'string' || typeof r === 'number' ? r : a);
		});
	}

}; // END String.prototype.printf()


nconf.argv().env();

nconf.defaults({

	'installr-api-token':   'INSTALLR_API_TOKEN',
	'app-file-dir':         './dist/',
	'settings-plist':       './platform/iphone/Settings.bundle/Root.plist',
	'settings-xml':         './i18n/de/strings.xml',
	'add-version-settings': false,
	'os':                   'ios',
	'environment':          'development',
	'env':                  'development'
});


/**********************************************************************************
 * installrapp.com
 * ********************************************************************************/
gulp.task('installr:upload', function(callback) {

	var appFiles = fs.readdirSync(nconf.get('app-file-dir')),
	    appFileName;


	// DEBUG
	console.log('App files: ', appFiles);


	if (!appFiles.length) {

		callback();
		return;
	}

	appFileName = appFiles[0];


	var cliCommand = "curl",

	    cliArgs = [

		    ("-H 'X-InstallrAppToken: " + nconf.get('installr-api-token') + "' https://www.installrapp.com/apps.json"),
		    ("-F 'qqfile=@" + nconf.get('app-file-dir') + appFileName + "'"),
		    ("-F 'releaseNotes=Version " + tiApp.version + "'"),
		    "-F 'notify=false'",
		    "--progress-bar"
	    ];


	// DEBUG
	console.log('CLI Command: ', cliCommand, cliArgs.join(' '));


	// add cli command before cli args
	cliArgs.unshift(cliCommand);


	// concat whole cli command and execute it
	var curl = exec(cliArgs.join(' '), {

		maxBuffer: (5000 * 1024)
	});

	curl.stdout.on('data', function(data) {

		// LOG
		console.log(data);
	});

	curl.stderr.on('data', function(data) {

		// LOG
		console.log(data);
	});

	curl.on('close', function(code) {

		// LOG
		console.log('Finished with code: ', code);

		callback(code != 0);
	});
});


/**********************************************************************************
 * VERSIONING
 * ********************************************************************************/

/**
 * Returns version bump message
 *
 * @private
 * @method _getVersionBumpMessage
 * @return {String}
 */
function _getVersionBumpMessage() {

	return 'Bumped "{name} ({id})" version to: {version}'.printf({

		name:    tiApp.name,
		id:      tiApp.id,
		version: tiApp.version
	});

} // END getVersionBumpMessage()


gulp.task('versioning', function() {

	// set new build number
	var appVersion = tiApp.version,
	    stamp = Math.round((new Date()).getTime() / 1000),
	    versions = appVersion.split('.');


	versions[3] = stamp.toString();

	tiApp.version = versions.join('.');


	// update Android version name and code
	var androids = tiApp.doc.documentElement.getElementsByTagName('android');

	if (androids.length === 1) {

		var manifests = androids.item(0).getElementsByTagName('manifest');

		if (manifests.length === 1) {

			var manifest = manifests.item(0);

			manifest.setAttribute('android:versionName', versions.slice(0, -1).join('.'));
			manifest.setAttribute('android:versionCode', stamp);
		}
	}

	tiApp.write();


	// update iOS root.plist app version default value
	if (nconf.get('add-version-settings') === true) {

		var settingsPlistPath = nconf.get('settings-plist');

		if (fs.existsSync(settingsPlistPath)) {

			var settingsPlist = plist.parse(fs.readFileSync(settingsPlistPath, 'utf-8'));

			settingsPlist.PreferenceSpecifiers.forEach(function(setting, index) {

				if (setting.Title && setting.Title === 'App Version') {

					setting.DefaultValue = versions.join('.');
				}

				return;
			});

			fs.writeFileSync(settingsPlistPath, plist.build(settingsPlist));
		}


		// update Android strings.xml
		var settingsXMLPath = nconf.get('settings-xml');

		if (fs.existsSync(settingsXMLPath)) {

			return gulp.src(settingsXMLPath)

				.pipe($.xmlEditor([{

					path: '//string[@name="preferences_app_version_title"]',
					text: ('App Version ' + versions.slice(0, 3).join('.'))
				}]))

				.on('error', _errorHandler)

				.pipe(gulp.dest(path.dirname(settingsXMLPath)))

				.pipe($.bump({

					version: versions.join('.')
				}))

				.pipe(gulp.dest('./'))

				.pipe($.notify(_getVersionBumpMessage()));
		}
	}


	return gulp.src('./package.json')

		.pipe($.bump({

			version: versions.slice(0, -1).join('.')
		}))

		.pipe(gulp.dest('./'))

		.pipe($.notify(_getVersionBumpMessage()));
});


/**********************************************************************************
 * ERROR HANDLER
 * ********************************************************************************/

/**
 * Common error handler that logs error to console
 *
 * @private
 * @method _errorHandler
 * @param {String} error
 * @return void
 */
function _errorHandler(error) {

	// DEBUG
	console.log(error);


	return;

} // END _errorHandler()
