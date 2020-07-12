/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
// define a root UIComponent which exposes the main view
sap.ui.define([ "sap/ui/core/UIComponent",
                "sap/ui/Device",
                "i2d/pp/prdorderissue/monitor/s1/model/models",
                "sap/ui/core/routing/Router",
                "sap/ui/core/routing/History" ], 
                
   function (UIComponent, Device, models, Router, History) {
                "use strict";
                
     return UIComponent.extend("i2d.pp.prdorderissue.monitor.s1.Component", {
    	 	// new Component
				metadata : {
						"manifest" : "json" 
					},

				  // Initialize the application
					// @returns {sap.ui.core.Control} the content
					createContent : function() {

						// add less processor for custom CSS
						jQuery.sap.require("i2d.pp.mrpcockpit.reuse.s1.util.Lessifier");
						i2d.pp.mrpcockpit.reuse.s1.util.Lessifier.lessifyCSSx10();

						this.sStateID = jQuery.sap.uid(); // "MRPCockpitViewState";
						if (!sap.ui.core.routing.HashChanger.getInstance().getHash()) {
							sap.ui.core.routing.HashChanger.getInstance().replaceHash(this.sStateID);
						}

						var oViewData = {
							component : this
						};
						return sap.ui.view({
							viewName : "i2d.pp.prdorderissue.monitor.s1.Main",
							type : sap.ui.core.mvc.ViewType.XML,
							viewData : oViewData
						});
					},

					init : function() {
						sap.ui.core.UIComponent.prototype.init.apply(this, arguments); // calls createContent (among others)
					  // set the device model
						this.setModel(models.createDeviceModel(), "device");
						this.getRouter().attachRouteMatched(this._handleRouteMatched);

						// this component should automatically initialize the router!
						this.getModel().metadataLoaded().then(function(){
							this.getRouter().initialize();
						}.bind(this));

					},

					_handleRouteMatched : function(evt) {

						var oApp = evt.getParameter("targetControl");

						if (!(oApp instanceof sap.m.NavContainer || oApp instanceof sap.m.SplitContainer)) {
							return;
						}

						// close open popovers
						if (sap.m.InstanceManager.hasOpenPopover()) {
							sap.m.InstanceManager.closeAllPopovers();
						}

						// close open dialogs
						if (sap.m.InstanceManager.hasOpenDialog()) {
							sap.m.InstanceManager.closeAllDialogs();
						}

						// navigate to the view in nav container
						var oView = evt.getParameter("view");
						var iViewLevel = evt.getParameter("config").viewLevel;

						var bNextPageIsMaster = (oApp instanceof sap.m.SplitContainer) && !!oApp.getMasterPage(oView.getId());

						var oHistory = sap.ui.core.routing.History.getInstance();

						var bBack;

						if (iViewLevel === undefined || this._iCurrentViewLevel === undefined
								|| iViewLevel === this._iCurrentViewLevel) {
							bBack = oHistory.getDirection() === "Backwards";
						} else {
							bBack = (iViewLevel !== undefined && (iViewLevel < this._iCurrentViewLevel));
						}

						if (bBack) {
							// insert previous page if not in nav container yet
							var oPreviousPage = oApp.getPreviousPage(bNextPageIsMaster);
							if (!oPreviousPage || oPreviousPage.getId() !== oView.getId()) {
								oApp.insertPreviousPage(oView.getId());
							}
							oApp.backToPage(oView.getId());
						} else {
							oApp.to(oView.getId());
						}

						this._iCurrentViewLevel = iViewLevel;
					}

                });
				});