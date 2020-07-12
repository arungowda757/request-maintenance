/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";

	var oMockServer,
		_sAppModulePath = "i2d/pp/prdorderissue/monitor/s1/",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */

		init: function(aEntitySetNames) {
			var oUriParameters = jQuery.sap.getUriParameters(),
				sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.PP_MRP_COCKPIT_SRV,
				sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml"),
				// ensure there is a trailing slash
				sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";

			oMockServer = new MockServer({
				rootUri: sMockServerUrl
			});

			// configure mock server with a delay of 1s
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: (oUriParameters.get("serverDelay") || 1000)
			});

			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sJsonFilesUrl,
				bGenerateMissingMockData: true,
				aEntitySetsNames : aEntitySetNames
			});



			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		},
		
		/**
		 * Adjusts status code for cases in which the mockserver implementation
		 * does not provide code descriptions (currently all codes except
		 * 200, 201, 204, 400, 403, 404).
		 * Reason is that odata js implementation requires code descriptions
		 * in its regex for determining batch parts' response codes.
		 * Workaround is to write status code plus description into the
		 * status code attribute directly.
		 * @param {FakeXMLHttpRequest} oXhr The request for which respond has
		 * already been called
		 * @private
		 */
		_adjustResponse: function(oXhr) {
			if (oXhr.status === 504) {
				oXhr.status = "504 Gateway Timeout";
			}
		},

		/**
		 * @public returns the mockserver of the app, should be used in integration tests
		 * @returns {sap.ui.core.util.MockServer} the mockserver instance
		 */
		getMockServer: function() {
			return oMockServer;
		}

	};

});