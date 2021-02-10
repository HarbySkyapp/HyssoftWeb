/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"HyssoftWeb/HyssoftWeb/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});