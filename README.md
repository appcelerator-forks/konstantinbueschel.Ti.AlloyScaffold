# App Scaffold

This is a Titanium Mobile Alloy app scaffold. You need some tools to get it up to run, which will be described next.


## Prerequisites

Install **Node.js** with **NPM** on your machine

Install **gulp CLI** (globally) on your machine 

	[sudo] npm install gulp -g

Install **TiNy CLI** helper for Titanium Mobile CLI

	[sudo] npm install tn -g
	
Install **TiCh** helper for Titanium tiapp.xml profiles

	[sudo] npm install tich -g
	
Install **appc-npm** helper for Titanium to install modules, widgets etc. from npm

	[sudo] npm install appc-npm -g

Checkout files from Repo into your project directory

Install required node packages from project directory on CLI
	
	[sudo] npm install

Install required Titanium Mobile modules from project directory on CLI (modules are read from **tiapp.xml**) 
	
	gittio install


## Usage
### Initiation

Init app scaffold.   

	npm run bower

Add / install javascript modules via bower

	bower install <NAME> --save

Add / install node modules via npm 

	npm install <NAME> --save-dev


### Development

Clean everthing (app, bower, dist)

	npm run clean

Clean app build

	npm run clean:app
	
Clean bower

	npm run clean:bower

Clean app dist

	npm run clean:dist
	
Hide and show debug outputs

	npm run debug:hide / npm run debug:show
	
Bump version first enter version into tich.cfg and select the profile with
	
	tich select <PROFILE>
	
after that run

	npm run version:bump
	
	
	
### Deployment

Upload app testing version to installr. The .apk and .ipa / .app files must be generated per Titanium CLI into **dist** folder before uploading to installr. 
	
	tn b appstore/playstore 
	
or 
	
	tn r appstore/playstore
	
This command will upload and clean dist folder after that.

	npm run installr
	
Or upload only a build to installr

	npm run installr:upload