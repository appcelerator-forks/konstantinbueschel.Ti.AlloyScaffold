## App <=> WebView coomunications

Create a link with custom prototcol or app url scheme

	<p><a href="customschemeprotocol://view?param1=1&param2=2">App scheme href</a></p>
	
or a little JavaScript script
	
	function sendMessage(parameters) {

		var iframe = document.createElement('iframe');
		iframe.setAttribute('src', 'customschemeprotocol://view?param1=1&param2=2');

		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
	}
	
and handle this in webviews **_beforeload_** event or over custom app scheme handling [URL schemes for iOS and Android](http://fokkezb.nl/2013/08/26/url-schemes-for-ios-and-android-1/)

The **_beforeload_** is also triggered for remote pages different than described in the Titanium docs.

For iOS >= 8 there is also the WKWebView component that integrates the communication with web pages. But for now there is no Titanium module which support the implementation of WKWebView. 


## Custom app schemes

On iOS these are also fired if we call 

	Ti.Platform.openURL('customscheme://');
	
within our app code. We can get the url from

	Ti.App.getArguments().url


## Android Services

Example tiapp.xml entry:

	<android
    xmlns:android="http://schemas.android.com/apk/res/android">
    <manifest android:installLocation="auto" android:versionCode="X" android:versionName="1.X.X">
      <supports-screens android:anyDensity="true" android:largeScreens="true" android:normalScreens="true" android:smallScreens="true"/>
      <uses-sdk android:minSdkVersion="10" android:targetSdkVersion="18"/>
      <application android:theme="@style/Theme.APPTHEME" android:largeHeap="true">
        <activity android:name=".APPActivity" android:label="@string/app_name" android:theme="@style/Theme.APPTHEME.Launch"  android:configChanges="keyboardHidden|orientation|screenSize">
          <intent-filter>
            <action android:name="android.intent.action.MAIN"/>
            <category android:name="android.intent.category.LAUNCHER"/>
          </intent-filter>
        </activity>
        <activity android:name="org.appcelerator.titanium.TiActivity" android:configChanges="keyboardHidden|orientation|screenSize"/>
        <activity android:name="org.appcelerator.titanium.TiTranslucentActivity" android:configChanges="keyboardHidden|orientation|screenSize" android:theme="@style/Theme.AppCompat.Translucent"/>
        <activity android:name="ti.modules.titanium.ui.android.TiPreferencesActivity" android:configChanges="screenSize"/>
        <service android:name="COM.DOMAIN.APP.AlarmNotificationService"/>
        <service android:name="COM.DOMAIN.APP.RadioHelperService"/>
        <service android:name="COM.DOMAIN.APP.RadioInfoService"/>
      </application>
    </manifest>
    <services>
      <service url="AlarmNotification.js"/>
      <service url="RadioHelper.js"/>
      <service url="RadioInfo.js" type="interval"/>
    </services>
	</android>