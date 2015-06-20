## Manual Alloy Installation

The following steps install the latest released version of Alloy.

	sudo npm install -g alloy


## Bleeding Edge Alloy Installation

To install the latest development version of Alloy, after installing Node.js , clone the Alloy GitHub repository and perform an npm install from the Alloy project's root directory:

	git clone https://github.com/appcelerator/alloy.git
	cd alloy
	[sudo] npm install -g .
	


## Alloy concepts

Alloy utilizes the model-view-controller (MVC) paradigm, which separates the application into three different components:

- **Models** provide the business logic, containing the rules, data and state of the application.
- **Views** provide the GUI components to the user, either presenting data or allowing the user to interact with the model data.
- **Controllers** provide the glue between the model and view components in the form of application logic.

Alloy models are built on top of Backbone.js, taking advantage of Backbone's rich Model and Collection APIs. You define models using a Javascript file that exports a special JSON object, which uses Backbone's extend functionality to customize models and collections.

Alloy views are built from Titanium UI components. You define views using XML markup and style them using Alloy Titanium Style Sheets (.tss), which abstracts the creation of these components without using Titanium API calls. Alloy generates the code to create your views.

**Hint:** All of the view code from the view.xml file is executed before any controller code. 

Alloy controllers generally have a one-to-one relationship with Alloy views. Controllers directly use the Titanium SDK API without an abstraction layer. The controller has access to all of the view components.



### Convention over Configuration

To simplify development, Alloy uses a directory structure and naming conventions to organize the application rather than configuration files. Alloy expects to find files in specific locations. Any folder or file not adhering to the below naming conventions is ignored by Alloy. For example, at generation time, Alloy will look for the mandatory files app/views/index.xml and app/controllers/index.js, then the optional corresponding file app/styles/index.tss. Alloy requires these files to create the initial view-controller Resources/<platform>/alloy/controllers/index.js.

The following is a list of directories and files that can be found in an Alloy project:

<table class="confluenceTable">
<thead class=" "></thead><tfoot class=" "></tfoot><tbody class=" "> <tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains the models, views, controllers and assets of the application. All work should be done here. See folder descriptions below.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/alloy.jmk</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Build configuration file.<br>See <a class="document-link " href="#!/guide/Build_Configuration_File_(alloy.jmk)" build_configuration_file_(alloy.jmk).html="Build_Configuration_File_(alloy.jmk).html">Build Configuration File (alloy.jmk)</a>.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/alloy.js</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Initializer file used to preconfigure components or override Alloy methods before the main controller is executed.<br>See <a class="document-link " href="#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-InitializerFile%28alloy.js%29" alloy_controllers.html#34636384_alloycontrollers-initializerfile%28alloy.js%29="Alloy_Controllers.html#34636384_AlloyControllers-InitializerFile%28alloy.js%29">Initializer File (alloy.js)</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/config.json</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Project configuration file.<br>See <a class="document-link " href="#!/guide/Project_Configuration_File_(config.json)" project_configuration_file_(config.json).html="Project_Configuration_File_(config.json).html">Project Configuration File (config.json)</a>.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/assets</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains image assets and other files that need to be copied into the <tt class=" ">Resources</tt> directory.<br>Reference these files in the code without the 'app/assets' path and without the platform-specific if it is inside one.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/controllers</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains controllers in the format <tt class=" ">filename.js</tt> to a corresponding view file <tt class=" ">app/views/filename.xml</tt>.<br>See <a class="document-link " href="#!/guide/Alloy_Controllers" alloy_controllers.html="Alloy_Controllers.html">Alloy Controllers</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/lib</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains application-specific library code, typically in the CommonJS format.<br>See <a class="document-link " href="#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-LibraryCodeandCommonJSModules" alloy_controllers.html#34636384_alloycontrollers-librarycodeandcommonjsmodules="Alloy_Controllers.html#34636384_AlloyControllers-LibraryCodeandCommonJSModules">Library Code</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/migrations</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains database migration files in the format <tt class=" ">&lt;DATETIME&gt;_filename.js</tt>.<br>See <a class="document-link " href="#!/guide/Alloy_Sync_Adapters_and_Migrations-section-36739597_AlloySyncAdaptersandMigrations-Migrations" alloy_sync_adapters_and_migrations.html#36739597_alloysyncadaptersandmigrations-migrations="Alloy_Sync_Adapters_and_Migrations.html#36739597_AlloySyncAdaptersandMigrations-Migrations">Migrations</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/models</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains model files in the format <tt class=" ">filename.js</tt>.<br>See <a class="document-link " href="#!/guide/Alloy_Models" alloy_models.html="Alloy_Models.html">Alloy Models</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/styles</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains view styling in the format <tt class=" ">filename.tss</tt>, which is applied to a corresponding view file <tt class=" ">app/views/filename.xml</tt>.<br>See <a class="document-link " href="#!/guide/Alloy_Styles_and_Themes-section-35621526_AlloyStylesandThemes-TitaniumStyleSheets" alloy_styles_and_themes.html#35621526_alloystylesandthemes-titaniumstylesheets="Alloy_Styles_and_Themes.html#35621526_AlloyStylesandThemes-TitaniumStyleSheets">Titanium Style Sheets</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/themes</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains themes to customize the assets and styles of the entire GUI.<br>See <a class="document-link " href="#!/guide/Alloy_Styles_and_Themes-section-35621526_AlloyStylesandThemes-Themes" alloy_styles_and_themes.html#35621526_alloystylesandthemes-themes="Alloy_Styles_and_Themes.html#35621526_AlloyStylesandThemes-Themes">Themes</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/views</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains views in the format <tt class=" ">filename.xml</tt> with the optional corresponding files <tt class=" ">app/controllers/filename.js</tt> and <tt class=" ">app/styles/filename.tss</tt>.<br>See <a class="document-link " href="#!/guide/Alloy_XML_Markup" alloy_xml_markup.html="Alloy_XML_Markup.html">Alloy XML Markup</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">app/widgets</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains widget files. Each widget will have its own <tt class=" ">app</tt>-like directory structure.<br>See <a class="document-link " href="#!/guide/Alloy_Concepts-section-34636240_AlloyConcepts-Widgets" alloy_concepts.html#34636240_alloyconcepts-widgets="Alloy_Concepts.html#34636240_AlloyConcepts-Widgets">Widgets</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">i18n</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains internationalization and localization files. Same usage as with a Titanium application.<br>See <a class="document-link " href="#!/guide/Internationalization" internationalization.html="Internationalization.html">Internationalization</a> for more information.    </p>
</td>
</tr>
<tr>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
<tt class=" ">Resources</tt> </p>
</td>
<td class="confluenceTd" rowspan="1" colspan="1">
<p>
Contains the Titanium files generated by the Alloy interface from the <tt class=" ">app</tt> directory. All files will be overwritten each time the application is built.<br>Since <u class=" ">Alloy 1.3.0</u>, Alloy creates a separate Titanium project for each platform you build for in the <tt class=" ">Resources/&lt;platform&gt;</tt> folder.<br>See <a class="document-link " href="#!/guide/Alloy_Concepts-section-34636240_AlloyConcepts-CompilationProcess" alloy_concepts.html#34636240_alloyconcepts-compilationprocess="Alloy_Concepts.html#34636240_AlloyConcepts-CompilationProcess">Compilation Process</a> for more information.    </p>
</td>
</tr>
</tbody> </table>

**Notes:** the lib, migrations, themes and widgets folders are not automatically generated when creating a new project. The migrations and widgets folder will be generated by the Alloy command-line interface if any of those components are generated. The lib and themes folders will need to be manually created.


### Builtins

Alloy comes with additional utilities used to simplify certain functions, such as animations, string manipulation, and display unit conversion. These utilities are referred to as 'builtins.' To use these utilities, the controller needs to call require with 'alloy' as the root directory. For example, to use an animation function to shake the current view by pressing the 'shake' button, add this code to a controller:

	var animation = require('alloy/animation');
	
	$.shake.addEventListener('click', function(e) {
		animation.shake($.view);
	});


## Including Views

Views may be included in other views using the Require element. Specify the type attribute as 'view' and the src attribute should be the view file minus the '.xml' extension, and assign a unique value to the id attribute to reference the UI objects in the controller code. If you omit the type attribute, Alloy assumes it is implicitly set to 'view'.

To use UI objects from the included views, the controller needs to reference the ID specified in the Require element and use the getView function with the ID of the object as the argument: var object = $.requireId.getView('objectId').

	var view = $.parentView.getView('childViewId');


## Adding Children Views

Since Alloy 1.3.0, if your Require element is a parent view, you can add children elements to it. These children elements are passed to the parent controller as an array called arguments[0].children. Use this array to access the children views to add them to the parent.


## Namespace

By default, all UI components specified in the views are prefixed with Titanium.UI for convenience. However, to use a component not part of the Titanium.UI namespace, use the ns attribute. For example, to use the Titanium.Map.View, do: <code>\<View ns="Ti.Map" id="map"/\></code>

For UI objects that belong to a specific platform, such as the navigation window. Use the platform attribute to use the object, for example: <code>\<NavigationWindow platform="ios"/\></code>


## Conditional Code

Add the platform, formFactor and if attributes to apply XML elements based on conditionals.

- To specify a platform-specific element, use the platform attribute and assign it a platform, such as, android, blackberry, ios, or mobileweb.
Comma separate the values to logically OR the values together, for example, platform='ios,android' indicates both Android and iOS.
Prepend the value with an exclamation point (!) to negate the value, for example, platform='!ios' indicates all platforms except iOS. 
- To specify a device-size-specific element, use the formFactor attribute and assign it a device size–either handheld or tablet. 
- To use a custom query (available since Alloy 1.4), assign the if attribute to a conditional statement in the Alloy.Globals namespace. This conditional statement must return a boolean value. You may only assign one query to the if attribute. 
- Since Alloy 1.6, the application can also pass custom Boolean properties with the Alloy.createController() method, which can be accessed by the XML. Assign the if attribute to the name of the property prefixed with the $.args namespace, for example, $.args.someProperty.
You can use all the attributes in combination.


### Proxy Properties

For properties that are assigned Titanium proxies, such as Views or Buttons, these properties can be declared in markup. Create a child tag under the Titanium UI object tag, using the name of the property with the first character capitalized. Then, declare your Titanium proxy inline with the child property tag. For example, the following code declares a rightNavButton for a Window:


	<RightNavButton>
		<Button title="Back" onClick="closeWindow" />
	</RightNavButton>


## Android ActionBar

Since Alloy 1.5.0, you can set ActionBar properties in the ActionBar element to modify the application's action bar. Add the ActionBar element as a child of either a Window or TabGroup, then set ActionBar attributes in the XML or TSS file. To add action items to the action bar, add the Menu element as a child of either a Window or TabGroup, then add MenuItem elements as children of the Menu element. Set MenuItem attributes in either the XML or TSS file.

Since Alloy 1.4.0, you had to set ActionBar properties in the Menu element to modify the application's action bar. If you define ActionBar properties in both the ActionBar and Menu elements, whichever property that was defined last will be used.

app/views/index.xml

	<Alloy>
		<Window title="My App">
			<ActionBar id="actionbar" platform="android" title="Home Screen" onHomeIconItemSelected="showInfo">
			<Menu>
				<MenuItem id="editItem" title="Edit" onClick="editInfo" />
				<MenuItem id="viewItem" title="View" onClick="viewInfo" />
			</Menu>
			<Label id="label">Use the ActionBar to Perform an Action.</Label>
		</Window>
	</Alloy>

app/styles/index.tss

	"MenuItem": {
		showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
	}


## iOS Navigation Button Shorthand

Since Alloy 1.4.0, when specifying either the LeftNavButton or RightNavButton element with a Window or iPad Popover object, you do not need to create a separate Button object inside these elements in the XML file. Instead, you can define the Button attributes with the LeftNavButton and RightNavButton elements. Note that you cannot use node text to define the button title. It must be specified as the title attribute. For example:

	<Alloy>
		<NavigationWindow>
			<Window>
				<LeftNavButton title="Back" onClick="goBack" />
				<!-- Prior to Alloy 1.4.0, you had to define a Button object 
				<LeftNavButton>
					<Button title="Back" onClick="goBack" />
				</LeftNavButton> 
				-->
				<Label>I am iOS!</Label>
			</Window>
		</NavigationWindow>
	</Alloy>


## iOS System Button Shorthand

Since Alloy 1.3.0, when specifying the systemButton attribute for a Button object, you do not need to use the Ti.UI.iPhone.SystemButton namespace. For example, the following markup creates the iOS camera button:

	<Button systemButton="CAMERA"/>
	<!-- Instead of -->
	<Button systemButton="Titanium.UI.iPhone.SystemButton.CAMERA"/>


### Event Handling

In Alloy, events may be added in the views using a special attribute. Capitalize the first character of the event name and prefix it with 'on,' so the Ti.UI.Button object events click, dblclick and swipe events will become the attributes: onClick, onDblclick, and onSwipe, respectively. These attributes can be used to assign callbacks from the corresponding controller.


## Platform-Specific Styles

To specify platform or device size conditionals:

1. Place a set of square brackets ([]) directly after the name of the markup element, class name or id name in the TSS file. Do NOT place a space in between the name and brackets. The condition statements will be ignored. 
2. Inside the brackets:

	a. To specify a platform-specific style, use the platform attribute and assign it a platform, such as, android, blackberry, ios, or mobileweb.
Comma separate the values to logically OR the values together, for example, [platform=ios,android] indicates both Android and iOS.
Prepend the value with an exclamation point (!) to negate the value, for example, [platform=!ios] indicates all platforms except iOS.

	b. To specify a device-size-specific style, use the formFactor attribute and assign it a device size–either handheld or tablet.
	

## Custom Query Styles

Since Alloy 1.4, you can create custom queries to select which styles to apply in both the TSS and XML files. These query statements must return a boolean value. Custom query styles override all styles, that is, class, id, and markup element styles, except the ones defined as attributes in the XML file.

To use a custom query:

1. Define a conditional statement, which returns a boolean value, and assign it to a property in the Alloy.Globals namespace. Since Alloy 1.6.0, the application can also pass custom Boolean properties to the Alloy.createController() method, which can be accessed in the XML and TSS files.

2. Assign the if attribute to an element in the XML file or in the conditional block of the TSS file to the defined query with the Alloy.Globals namespace or a custom property passed in from the createController() method prefixed with $.args namespace, for example, $.args.someProperty.


**Example using Custom Properties**

Starting with Alloy 1.6.0, the application can pass custom Boolean properties to the Alloy.createController() method. These properties can be accessed by both the XML and TSS files. When calling the createController() method, pass the custom Boolean properties in the second argument of the method.

The controller below defines two functions that create and open an instance of the win2 controller, but each function passes a different property to the controller.

	function openBar (e) {
	    Alloy.createController('win2', {'fooBar': true}).getView().open();
	};
	
In the TSS file, add the conditional block and assign the if attribute to the property passed to the createController() method. Prefix the property name with the $.args namespace. Based on the property passed to the method, the application displays a different styled label.

	"#label[if=$.args.fooBar]" : {
		 'text' : 'Foobar',
		 'color' : 'blue'
	}
	
In the XML markup, add the if attribute to an element and assign it to the property passed to the createController() method. Prefix the property name with the $.args namespace. Based on the property passed to the method, the application displays a different label.

	<Label if="$.args.fooBar" color="blue">Foobar</Label>
	<Label if="$.args.fooBaz" color="red">Foobaz</Label>


**Example using Conditional Statements**

To take advantage of the various iPhone devices, we need to see if the device is running iOS 7 and above, and whether the iPhone is using the old regular or the latest tall form factor. We can define both of these query statements in the initializer file:

	Alloy.Globals.isIos7Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7);
	Alloy.Globals.iPhoneTall = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 568);

In the style file, use these conditional statements to create styles for specific devices. For example, with iOS 7, you can take advantage of the built-in text styles instead of defining all the attribute for a Font object, and since the iPhone 5 (and later) is taller, you need to make the ScrollView longer.

	// Query styles
	"#info[if=Alloy.Globals.isIos7Plus]" : {
    		font : { textStyle : Ti.UI.TEXT_STYLE_FOOTNOTE }
	}
	

### Themes

Themes provide a way to change the appearance of an entire GUI, allowing you to customize the styles and assets of the application.

To create a theme, create a folder called themes in your Alloy app directory. In the themes folder, create a folder for your theme. The name of this folder references the name of the theme for configuration and compilation. In your theme folder, create assets and styles folders for your custom images and styles, respectively. The example below creates a theme called 'mytheme'.

- app
	- assets
		- appicon.png
		- background.png
	- controllers
	- styles
		- index.tss
		- window.tss
	- themes
		- mytheme
			- assets
				- background.png
			- styles
				- app.tss
	- views
		- index.xml
		- window.xml

		
For assets, all files are overwritten by the copies in the theme's assets folder. In the example, the background.png file in the theme overwrites the file app/assets/background.png, but the app/assets/appicon.png file is used since there is not a similar file in the theme. All asset files are copied to the Titanium project's Resources directory, so all references to assets only need to include the path after the assets folder. The theme's assets folder can have platform- and density-specific folders.

For styles, styles defined in the theme's styles folder merge with and take precedence over the styles defined in app/styles. You can define individual styles per view as well as the global style file app.tss. For example, if a color was specified for a label in the themes/mythemes/app.tss file, this color overwrites the individual style files in app/styles for all labels. However, if a style was defined in one of the individual style files but not in themes/mythemes/app.tss, the styles in app/styles/ are applied. The theme's styles folder can have platform-specific folders.

To use a theme, add it to your config.json configuration file with "theme" as the key and the name of the theme folder as the value. For example:

	{
		 "global": {
			 "theme":"mytheme"
		  }, 
		 "env:development": {}, 
		 "env:test": {}, 
		 "env:production": {}, 
		 "os:ios": {
			 "theme":"green"
    		}, 
		 "os:android": {
			 "theme":"blue"
		}, 
		 "dependencies": {}
	}
	
The theme changes based on the platform. Android uses the 'blue' theme, iOS uses the 'green' theme, and Mobile Web uses the 'mytheme' theme.


## [Dynamic Styles](http://docs.appcelerator.com/titanium/latest/#!/guide/Dynamic_Styles)

Since Alloy 1.2.0, Alloy supports changing styles dynamically or during runtime. There are two methods to support dynamic styling in Alloy. You can either generate a dynamic style dictionary that can be passed to applyProperties or a create method, or modify TSS class styles to an existing component on the fly.


## [Views without Controllers](http://docs.appcelerator.com/titanium/latest/#!/guide/Views_without_Controllers)

Views can be created without controllers with an optional style sheet. These views can be used as building blocks to create a GUI. After you have defined your controller-less views, the application can either require in these views using markup or can dynamically generate these views in the controller code.

In XML markup, use the Require tag to add controller-less views into another view. Assign the src attribute to the name of the view file minus the .xml extension and the type to view. Define the id attribute to access each instance of the controller-less view in the controller.


### Controller Code

Starting with Alloy 1.4.0, you can dynamically create views in the controller code. Each component in the controller-less view needs to be assigned an id attribute. Using the Require or Widgetelements to include external views in the controller-less view does not work using this procedure, that is, you can include the external views, but the styles cannot be updated with the updateViews method.

To create a view without a corresponding controller:

1. Use the Alloy.createController() method to create a controller from the controller-less view. Pass a string with the name of the view minus the .xml extension as the only argument to the method 
2. Use the updateViews() method with the created controller. Pass a style dictionary as the only argument to the method. The style dictionary contains key-value pairs, where the key is the id of the view component and the value is another dictionary containing key-value pairs of attributes you want to set for the view component.

3. Use the getView() method to retrieve the view of the controller object. 
4. Use the add() method to add the view to a view component in the controller. Pass the instance of the controller-less view to the method. The view component that wants to add the controller-less view should call the method.

		var profile = Alloy.createController('profile');
		
		profile.updateViews({
				"#container" : {
				        layout : "vertical"
				},
				 "#picture" : {
				        image : "/appicon.png"
				},
				 "#name" : {
				        text : "Mr. Man"
				}
		});
		
		$.index.add(profile.getView());
		$.index.open();



# Alloy Controllers

In Alloy, controllers contain the application logic used to control the UI and communicate with the model. The following code contains the presentation logic (index.js) associated with the view (index.xml).

All UI elements which have an id attribute in a view are automatically defined and available as a property prefixed by the special variable $ in the controller. The $ is a reference to the controller. For example, the $.label prefix in the controller is used to access the Ti.UI.Label object instance in the view. This reference is used to directly access properties or methods of this object. For example, calling $.label.hide() hides the label from the view or you can change the label text with $.label.text.

To access external controllers and views, use the Alloy.createController and Controller.getView methods, respectively. See the Alloy API documentation for more details.

If the top-level UI object does not have an ID defined, reference it using the name of the controller prefixed by the $. Since the Window object in the view does not contain an ID, the controller uses $.index to grab the top-level UI object from the view. However, if an id attribute was defined, for example, <Window id='window'>, the controller needs to use $.window to gain access to the Window object; $.index will be undefined and the application will throw an error when calling $.index.open().


## Inheritance

Controllers can inherit from other controllers by assigning it a base (parent) controller: exports.baseController = 'baseControllerName'. As in the CommonJS model, the controller inherits any exported functions from the base controller. These functions can also be overwritten.


	exports.baseController = "animal";
	
	$.animalLabel.text = "Dog";
	
	exports.speak = function() {
    		alert("Bark!");
	};
	

## Conditional Code

Alloy introduces a set of special variables that act like compiler directives. Using these compiler constants optimizes the code at generation/compilation and any non-reachable code is removed.

The following are the constants defined by Alloy for use in the controller code:

- OS_ANDROID : true if the current compiler target is Android  - OS_BLACKBERRY: true if the current compiler target is BlackBerry

- OS_IOS : true if the current compiler target is iOS

- OS_MOBILEWEB : true if the current compiler target is Mobile Web

- ENV_DEV : true if the current compiler target is built for development (running in the simulator or emulator)

- ENV_TEST : true if the current compiler target is built for testing on a device

-  ENV_PRODUCTION : true if the current compiler target is built for production (running after a packaged installation)

- DIST_ADHOC (since Alloy 1.4.0) : true if the current compiler target is built for iOS Ad Hoc distribution, for example, if you set the -T dist-adhoc option when building with the Titanium CLI. Note that the ENV_PRODUCTION constant will be true too since this deployment is only for production builds.

- DIST_STORE (since Alloy 1.4.0) : true if the current compiler target is built for deployment to the Google Play Store or iTunes App Store, for example, if you set the -T dist-store option when building the Titanium CLI. Note that the ENV_PRODUCTION constant will be true too since this deployment is only for production builds.


## Passing Arguments

When initializing an external controller, you can pass arguments to customize it, for instance, var controller = Alloy.createController('controller', {args1: 'foo'}). In the external controller, the special variable arguments[0] is used to receive the arguments. For example, suppose you want to add multiple TableViewRow objects to a TableView object.


## Initializer File (alloy.js)

The initializer file app/alloy.js can be used to execute some code near the beginning of the application's lifecycle. The contents of this file will be executed right before the initial index.js controller is loaded, allowing you to execute code before any UI components are loaded and to override builtin Alloy functions before they are executed. The code in this file also has access to the Alloy namespace.

For instance, the default isTablet method returns true if it is identified as an iPad, an Android device in the large or extra large group, or if either dimension exceeds 400 dp for Mobile Web application. To override that behavior, you can add the following code to alloy.js.

	Alloy.isTablet = function(){
		return !(Math.min(Ti.Platform.displayCaps.platformHeight, Ti.Platform.displayCaps.platformWidth) < 600);
	}


## Platform-specific Library Folders

Starting with Alloy 1.5.0, you can also create platform-specific subfolders in the lib directory. Just add a folder named android , blackberry , ios , or mobileweb under the component folder and add your platform-specific files for Android, BlackBerry, iOS or Mobile Web into the folder, respectively. Do not include the platform-specific folder name when referencing the file.


## Extending Alloy, Underscore.js and Backbone.js

To access the Alloy API methods, such as createController and createModel, as well as Underscore.js and Backbone.js in CommonJS modules and JavaScript files in app/lib, you need to load those modules in to the library:

	var Alloy = require('alloy'), _ = require("alloy/underscore")._, Backbone = require("alloy/backbone");
	
	// Alloy extended
	Alloy.createController('foo').getView().open();
	
	// Underscore extended
	var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
	
	Ti.API.info(even);
	
	// Backbone extended
	var Book = Backbone.Model.extend();
	var book = new Book({title: 'Ulysses', author: 'James Joyce'});
	Ti.API.info(JSON.stringify(book));
	


## [Models](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Collection_and_Model_Objects)

In Alloy, models inherit from the Backbone.Model class. They contain the interactive data and logic used to control and access it. Models are specified with JavaScript files, which provide a table schema, adapter configuration and logic to extend the Backbone.Model class. Models are automatically defined and available in the controller scope as the name of the JavaScript file.

The JavaScript file exports a definition object comprised of three different objects. The first object, called config, defines the table schema and adapter information. The next two objects extendModel and extendCollection define functions to extend, override or implement the Backbone.Model and Backbone.Collection classes, respectively.

To access a model locally in a controller, use the Alloy.createModel method. The first required parameter is the name of the JavaScript file minus the '.js' extension. The second optional parameter is the attributes for initializing the model object.

The book model object is a Backbone object wrapped by Alloy, so it can be treated as a Backbone.Model object. You can use any Backbone Model or Events APIs with this object.

You can also create a global singleton instance of a model, either in markup or in the controller, which may be accessed in all controllers. Use the Alloy.Models.instance method with the name of the model file minus the extension as the only parameter to create or access the singleton. For example:


## Configuration Object

The config object is comprised of three different objects: columns, defaults and adapter.

The columns object defines the table schema information. The key is the record name and the value is the data type. The following data types are accepted and mapped to the appropriate SQLite type: string, varchar, int, tinyint, smallint, bigint, double, float, decimal, number, date, datetime and boolean. By default, any unknown data type maps to the SQLite type TEXT. Alternatively, the SQLite sync adapter accepts the SQLite keywords.

The optional defaults object defines the default values for a record if one or more record fields are left undefined upon creation. The key is the record name and the value is the default value.

The adapter object defines how to access persistent storage. It contains two key-value pairs: type and collection_name. The type key identifies the sync adapter and the collection_name key identifies the name of the table in the database or a namespace.

	exports.definition = {
	    config: {
		 "columns": {
			 "title": "String",
			 "author": "String"
        	},
		"defaults": {
			 "title": "-",
			 "author": "-"
        	},
		 "adapter": {
			 "type": "sql",
			 "collection_name": "books"
        	}
    	   }
	}
	

## Extending the Backbone.Model Class

The Backbone.Model class can be extended using the extendModel object, which implements the Backbone.Model extend method. This allows the Backbone.js code to be extended, overridden or implemented.

For example, the validate method is left unimplemented by Backbone.js. The model JS file can implement validate(attrs), where the parameter attrs are changed attributes in the model. In Backbone.js, if validate is implemented, it is called by the set and save(attributes) methods before changing the attributes and is also called by the isValid method. For the save method, validate is called if the attributes parameter is defined.

	exports.definition = {
	    config : {
		 // table schema and adapter information
	    },
	    extendModel: function(Model) {		
      		  _.extend(Model.prototype, {
			 // Implement the validate method		            	validate: function (attrs) {
				 for (var key in attrs) {
		                    var value = attrs[key];
					 if (key === "title") {
						 if (value.length <= 0) {
							 return "Error: No title!";
                        			}
                    		}
					 if (key === "author") {
						 if (value.length <= 0) {
							 return "Error: No author!";
                        		}	
                    	}	
                	}
            		},
			// Extend Backbone.Model
      		      	customProperty: 'book',
            		customFunction: function() {
                	Ti.API.info('I am a book model.');
            		},	
        	});
 
		 return Model;
    		}
	}
	

## [Collections](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Collection_and_Model_Objects)

Collections are ordered sets of models and inherit from the Backbone.Collection class. Alloy Collections are automatically defined and available in the controller scope as the name of the model. To access a collection in the controller locally, use the Alloy.createCollection method with the name of the JavaScript file minus the '.js' extension as the required parameter. The second optional parameter can be an array of model objects for initialization.

You can use any Backbone Collection or Events APIs with this object.

You can also create a global singleton instance, either in markup or in the controller, which may be accessed in all controllers. Use the Alloy.Collections.instance method with the name of the model file minus the extension as the only parameter to create or access the singleton.


## Extending the Backbone.Collection Class

Like the Backbone.Model class, the Backbone.Collection class can be similarly extended in the model JavaScript file. For example, the comparator method is left unimplemented in Backbone.js.

	exports.definition = {
    		config : {
		 // table schema and adapter information
		},
	    extendModel: function(Model) {		
	      	  _.extend(Model.prototype, {
	      	  // Extend, override or implement the Backbone.Model methods		});
	 return Model;
    	},
    	extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
		// Implement the comparator method.
    	    comparator : function(book) {
			 return book.get('title');
            }
        }); // end extend
 
	 return Collection;
    	}
	}
	

## Underscore.js Functionality

Additionally, the Backbone.Collection class inherits some functionality from Underscore.js, which can help simplify iterative functions. For example, to add the title of each book object in the library collection to a table, you could use the map function to set the table:

	var data = [];
	library.map(function(book) {
		 // The book argument is an individual model object in the collection
	    var title = book.get('title');
	    var row = Ti.UI.createTableViewRow({"title":title});
	    data.push(row);
	});
	// TableView object in the view with id = 'table'
	$.table.setData(data);
	

## Event Handling

When working with Alloy Models and Collections, use the Backbone.Events on, off and trigger methods. For example:

	var library = Alloy.createCollection('book');
	
	function event_callback (context) {
		var output = context || 'change is bad.';
	    Ti.API.info(output);
	};
	
	// Bind the callback to the change event of the collection.
	library.on('change', event_callback);
	
	// Trigger the change event and pass context to the handler.
	library.trigger('change', 'change is good.');
	
	// Passing no parameters to the off method unbinds all event callbacks to the object.
	library.off();
	
	// This trigger does not have a response.
	library.trigger('change');
	
Alloy Model and Collection objects don't support the Titanium addEventListener, removeEventListener and fireEvent methods.

If you are using Alloy's Model-View binding mechanism, the Backbone add, change, destroy, fetch, remove, and reset events are automatically bound to an internal callback to update the model data in the view. Be careful not to override or unbind these events.

If you want to fire or listen to multiple events, Backbone.js uses spaces to delimit its events in the event string; therefore, do NOT name any custom events with spaces.



## [Project Configuration File (config.json)](http://docs.appcelerator.com/titanium/latest/#!/guide/Project_Configuration_File_(config.json))

Alloy uses the config.json file, located in the project's app directory, to specify global values, conditional environment and platform values, and widget dependencies. The configuration file contains the following objects:

- global - Contains key-value pairs present for all environments and platforms. 
- env:development - Contains key-value pairs present for targets built for development, running in either the simulator or emulator. 
- env:test - Contains key-value pairs present for targets built for testing on a device. 
- env:production - Contains key-value pairs present for targets built for production, running after a package installation. 
- os:android - Contains key-value pairs present for targets built for Android. 
- os:blackberry - Contains key-value pairs present for targets built for BlackBerry (since Alloy 1.1.3). 
- os:ios - Contains key-value pairs present for targets built for iOS. 
- os:mobileweb - Contains key-value pairs present for targets built for Mobile Web. 
- dependencies - Contains key-value pairs for widget dependencies, where the key is the widget name and the value is the version number of the widget. 
- autoStyle - Enables the autostyle feature for the entire Alloy project (since Alloy 1.2.0). See Dynamic Styles: Autostyle for more information.


When mixed together, 'os' values override 'env' values, which override 'global' values. If you want to specify both a platform and environment-specific configuation, combine the 'os' and 'env' values together into one string with the values space separated. These values are accessible during runtime by prefixing the key with Alloy.CFG.

	{
		 "global": {"foo":1},
		 "env:development": {"foo":2},
		 "env:test":{"foo":3},
		 "env:production":{"foo":4},
		 "os:ios env:production": {"foo":5},
		 "os:ios env:development": {"foo":6},
		 "os:ios env:test": {"foo":7},
		 "os:android":{"foo":8},
		 "os:mobileweb":{"foo":9},
		 "dependencies": {
			 "com.foo.widget":"1.0"
		}
	}	 


## Appendices

- [Alloy XML Markup](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_XML_Markup)
- [Alloy Styles and Themes](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Styles_and_Themes)
- [Widget Configuration File (widget.json)](http://docs.appcelerator.com/titanium/latest/#!/guide/Widget_Configuration_File_(widget.json))
- [Build Configuration File (alloy.jmk)](http://docs.appcelerator.com/titanium/latest/#!/guide/Build_Configuration_File_(alloy.jmk))
- [Best practices](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Best_Practices_and_Recommendations)
- [Alloy Data Binding](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Data_Binding)
- [Alloy Sync Adapters](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Sync_Adapters_and_Migrations)
- [Backbone Objects without Alloy](http://docs.appcelerator.com/titanium/latest/#!/guide/Backbone_Objects_without_Alloy)