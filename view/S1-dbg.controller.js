/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui
		.define(
				["i2d/pp/mrpcockpit/reuse/s1/view/S1parent", "i2d/pp/prdorderissue/monitor/s1/util/Formatter"],
				function(S1parent, Formatter) {
					"use strict";

					// 312 Master Controller
					return S1parent
							.extend(
									"i2d.pp.prdorderissue.monitor.s1.view.S1",
									{
										/**
										 * @memberOf 312 Controller
										 */

										onInit : function() {

											// default title for the master section
											this.masterTitle = "FULLSCREEN_TITLE";

											// declaration of variables
											this.sViewNumber = "v312";

											var aFacetFilterState = [];
											var oNewEntry = {
												listKey : "MfgOrderProgressStatus",
												active : true,
												selectedItemKeys : []
											};
											aFacetFilterState.push(oNewEntry);
											oNewEntry = {
												listKey : "LatenessDurationInWorkDays",
												active : true,
												selectedItemKeys : []
											};
											aFacetFilterState.push(oNewEntry);
											oNewEntry = {
												listKey : "MaximumDelayInWorkDays",
												active : true,
												selectedItemKeys : []
											};
											aFacetFilterState.push(oNewEntry);
											oNewEntry = {
												listKey : "DurnPlndStatusToTodayInWrkdays",
												active : true,
												selectedItemKeys : []
											};
											aFacetFilterState.push(oNewEntry);

											this.oDefaultVariantData = {
												MaterialShortageDefinitionID : "",
												TimeHorizon : "7",
												FacetFilterState : aFacetFilterState,
												TableState : {},
												SortKey : "",
												SortDescending : false,
												FilterBarStateAndData : []
											};

											// execute the onInit for the base class
											S1parent.prototype.onInit.call(this);
											// create resource Bundle for Texts
											this.oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
											// create resource Bundle for Formatter
											Formatter.oResourceBundle = this.oResourceBundle;
											// array for default sorting of cells
											this.aDefaultSorting = new Array();
											this.aDefaultSorting[0] = new Array("MaterialExternalID", 3);
											this.aDefaultSorting[1] = new Array("MaterialName");
											this.aDefaultSorting[2] = new Array("ManufacturingOrderTypeName");
											this.aDefaultSorting[3] = new Array("MRPElementOpenQuantity");
											this.aDefaultSorting[4] = new Array("LateSupplyQuantity");
											this.aDefaultSorting[5] = new Array("MRPElement", 4);
											this.aDefaultSorting[6] = new Array("LateSupplyEarliestDemandDate");
											this.aDefaultSorting[7] = new Array("LatenessDurationInWorkDays");
											this.aDefaultSorting[8] = new Array("MfgOrderPlannedStartDate", 1);
											this.aDefaultSorting[9] = new Array("MfgOrderPlannedEndDate", 2);
											this.aDefaultSorting[10] = new Array("MRPController");
											this.aDefaultSorting[11] = new Array("MRPPlant");
											this.aDefaultSorting[12] = new Array("MRPArea");
											this.aDefaultSorting[13] = new Array("NumberOfComponentsWithProblems");
											this.aDefaultSorting[14] = new Array("MaximumDelayInWorkDays");
											this.aDefaultSorting[15] = new Array("MfgOrderProgressStatusName");
											this.aDefaultSorting[16] = new Array("MfgOrderProgressNextStatusName");
											this.aDefaultSorting[17] = new Array("DurationToNextStatusInDays");
											this.aDefaultSorting[18] = new Array("DurationToReleaseInWorkdays");
											this.aDefaultSorting[19] = new Array("DurationToStartInWorkdays");
											this.aDefaultSorting[20] = new Array("DurationToFinishInWorkdays");
											this.aDefaultSorting[21] = new Array("DurationToGRInWorkdays");
											this.aDefaultSorting[22] = new Array("DurnPlndStatusToTodayInWrkdays");

										},

										// Returns the view number
										/**
										 * get
										 * 
										 * @returns {number} num
										 */
										getViewNumber : function() {
											return this.sViewNumber;
										},

										// Returns the table ID
										/**
										 * get
										 * 
										 * @returns {number} num
										 */
										getTableId : function() {
											return this.sViewNumber + "Table";
										},

										// Returns the material shortage definition type relevant for the app 1: for 210 2: for 110/112
										/**
										 * get
										 * 
										 * @returns {number} num
										 */
										getShortageDefintionType : function() {
											return 1;
										},

										// Personalisation needs method
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getComponentName : function() {
											return "i2d.pp.prdorderissue.monitor.s1";
										},

										// Returns the entity type needed for the application: /ManufacturingOrder Items
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getMasterEntity : function() {
											return "/ManufacturingOrders";
										},

										// Returns entity name needed for Interoperability Service Version
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getMasterServiceEntity : function() {
											return "ManufacturingOrder";
										},

										// Returns Entity Set Name for Shortage
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getShortageEntitySetName : function() {
											return "MaterialShortageDefinitions";
										},

										// Returns Entity Set Name for Sorting

										// getSortingEntitySetName : function() {
										// return "PP_MRP_COCKPIT_SRV/ManufacturingOrder";
										// },

										// Returns Property Name for Filtering
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getFilterPropertyName : function() {
											return "MaterialShortageDefinitionID";
										},

										// Returns the select fields needed for the application
										getSelectFields : function() {
										},

										// Add additional oData filters for the /ManufacturingOrder
										getSpecificAppFilter : function() {
											return null;
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getSingleSelectWithMulti : function() {
											return ["MfgOrderProgressStatus"];
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getDefaultFilters : function() {
											return ["MfgOrderProgressStatus", "LatenessDurationInWorkDays", "MaximumDelayInWorkDays",
													"DurnPlndStatusToTodayInWrkdays"];
										},

										/**
										 * get
										 * 
										 * @returns {string} field
										 */
										getInitialDefaultFilters : function() {
											if (this.oViewState.FilterBarStateAndData.length === 0) {
												var filter = [];
												filter.push(new sap.ui.model.Filter("LatenessDurationInWorkDays",
														sap.ui.model.FilterOperator.EQ, this.getDefaultFilterValue()));
												filter.push(new sap.ui.model.Filter("MaximumDelayInWorkDays", sap.ui.model.FilterOperator.EQ,
														this.getDefaultFilterValue()));
												filter.push(new sap.ui.model.Filter("DurnPlndStatusToTodayInWrkdays",
														sap.ui.model.FilterOperator.EQ, this.getDefaultFilterValue()));
												return filter;
											}
										},

										/**
										 * get
										 * 
										 * @returns {string} field
										 */
										getDefaultFilterValue : function() {
											return "-999999";
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getSingleSelectFacetFilter : function() {
											return ["MfgOrderProgressStatus", "MaximumDelayInWorkDays", "LatenessDurationInWorkDays",
													"DurationToReleaseInWorkdays", "DurationToNextStatusInWorkDays", "DurationToStartInWorkdays",
													"DurationToFinishInWorkdays", "DurationToGRInWorkdays", "DurnPlndStatusToTodayInWrkdays"];
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getFacetFilterDefaults : function() {
												return ["MfgOrderProgressStatus", "MaximumDelayInWorkDays", "MaterialID",
														"ManufacturingOrderType", "ProductionVersion", "ProductionSupervisor", "ProductionLine",
														"MRPController", "MRPPlant", "MRPArea", "MfgOrderProgressNextStatus",
														"DurationToReleaseInWorkdays", "DurationToGRInWorkdays", "MfgOrderProblemCategory",
														"LatenessDurationInWorkDays", "DurnPlndStatusToTodayInWrkdays",
														"DurationToNextStatusInWorkDays", "DurationToStartInWorkdays", "DurationToFinishInWorkdays",
														"MRPPlanningSegmentNumber","MRPElement", "MaterialName"];

										},

										/**
										 * get
										 * 
										 * @returns {number} num
										 */
										getFacetFilterType : function() {
											return "5";
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										// Returns all fields which are needed for the initial oData master call ($select)
										getInitialSelectFields : function() {
											var mandSelectFields = this.getMandatorySelectFields();
											var selectFields = this.getBaseSelectFields();
											var allFields = mandSelectFields.concat(selectFields);
											return allFields.join(",");
										},

										// Returns those fields which are mandatory for the oData master call ($select)<br>
										// These fields (especially all navigation fields) should be requested no matter what columns the
										// user has made
										// visible in the table.
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getMandatorySelectFields : function() {

											return new Array("MaterialExternalID", "MaterialName", "MfgOrderProblemCategory",
													"MRPElementOpenQuantity", "LatenessDurationInWorkDays", "MfgOrderPlannedStartDate",
													"MfgOrderPlannedEndDate", "MfgOrderProgressStatus", "MfgOrderProgressStatusName",
													"DurationToNextStatusInDays", "NumberOfComponentsWithProblems", "MaximumDelayInWorkDays",
													"DurnPlndStatusToTodayInWrkdays"
											// "ManufacturingOrderMilestones/Status",
											// "ManufacturingOrderMilestones/PlannedDate", "ManufacturingOrderMilestones/ActualDate",
											// "ManufacturingOrderMilestones/IsOverdue", "ManufacturingOrderMilestones/IsDue"
											);
										},

										getBaseSelectFields : function() {
											var aSelectedFields;
											switch (this.getServiceSchemaVersion()) {
												case 1 : // Older Version: Not current Version.
												case 2 :
												case 3 : // extensibility starting from version 3 on
													aSelectedFields = new Array("DynamicHorizonCode", "MRPPlanningSegmentNumber",
															"MRPPlanningSegmentType", "MaterialShortageDefinitionID",
															"ComponentShortageDefinitionID", "MRPPlant", "MRPArea", "MaterialID",
															"MRPElementCategory", "MRPController", "UnitOfMeasureTechnicalName",
															"TargetQuantityUnitDcmls", "LateSupplyEarliestDemandDate", "MRPElementCategory",
															"MRPElement");
													/**
													 * @ControllerHook extension Hook for Get Base Select Fields Additionally to the base select
													 *                 fields the customer here is allowed to add or delete fields from the array.
													 *                 The hook is called at the initialization phase -> event onInit.
													 * @callback i2d.pp.prdorderissue.monitor.s1.view.S1~extHookGetBaseSelectFields
													 * @param {array}
													 *          aSelectedFields List of Fields
													 */
													if (this.extHookGetBaseSelectFields) { // check whether any extension has implemented the
														// hook...
														this.extHookGetBaseSelectFields(aSelectedFields); // ...and call it
													}
													return aSelectedFields;
												case 4 : // UnitOfMeasureCommercialName is necessary starting from version 4
												case 40 :
												case 99 :
												case 101 :
												case 140 :
													aSelectedFields = new Array("DynamicHorizonCode", "MRPPlanningSegmentNumber",
															"MRPPlanningSegmentType", "MaterialShortageDefinitionID",
															"ComponentShortageDefinitionID", "MRPPlant", "MRPArea", "MaterialID",
															"MRPElementCategory", "MRPController", "UnitOfMeasureTechnicalName",
															"TargetQuantityUnitDcmls", "LateSupplyEarliestDemandDate", "MRPElementCategory",
															"MRPElement", "UnitOfMeasureCommercialName");
													/**
													 * @ControllerHook extension Hook for Get Base Select Fields Additionally to the base select
													 *                 fields the customer here is allowed to add or delete fields from the array.
													 *                 The hook is called at the initialization phase -> event onInit.
													 * @callback i2d.pp.prdorderissue.monitor.s1.view.S1~extHookGetBaseSelectFields
													 * @param {array}
													 *          aSelectedFields List of Fields
													 */
													if (this.extHookGetBaseSelectFields) { // check whether any extension has implemented the
														// hook...
														this.extHookGetBaseSelectFields(aSelectedFields); // ...and call it
													}
													return aSelectedFields;

												default : // For the current version.
													/* eslint-disable no-redeclare */
													aSelectedFields = new Array("DynamicHorizonCode", "MRPPlanningSegmentNumber",
															"MRPPlanningSegmentType", "MaterialShortageDefinitionID",
															"ComponentShortageDefinitionID", "MRPPlant", "MRPArea", "MaterialID",
															"MRPElementCategory", "MRPController", "UnitOfMeasureTechnicalName",
															"TargetQuantityUnitDcmls", "LateSupplyEarliestDemandDate", "MRPElementCategory",
															"MRPElement", "UnitOfMeasureCommercialName", "TargetQuantityUnitDisplayDcmls");
													/* eslint-enable no-redeclare */

													/**
													 * @ControllerHook extension Hook for Get Base Select Fields Additionally to the base select
													 *                 fields the customer here is allowed to add or delete fields from the array.
													 *                 The hook is called at the initialization phase -> event onInit.
													 * @callback i2d.pp.prdorderissue.monitor.s1.view.S1~extHookGetBaseSelectFields
													 * @param {array}
													 *          aSelectedFields List of Fields
													 */
													if (this.extHookGetBaseSelectFields) { // check whether any extension has implemented the
														// hook...
														this.extHookGetBaseSelectFields(aSelectedFields); // ...and call it
													}
													return aSelectedFields;
											}
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getExpandNavigationProperty : function() {
											return "ManufacturingOrderMilestones";
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getExpandEntityName : function() {
											return "ManufacturingOrderMilestone";
										},

										// Returns the Variant Container Prefix Name for either the Application: "MRPProductionRequirement"
										// or
										// "MRPProcessRequirement
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getVariantContainerPrefix : function() {
											if (this.sOrderCategory) {
												if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.s1.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
													return "MRPProductionOrderItem";
												} else if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.s1.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
													return "MRPProcessOrderItem";
												}
											} else {
												return "MRPProductionOrderItem";
											}
										},

										// Returns the Object Header Title
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getObjectHeaderTitle : function() {
											if (this.sOrderCategory) {
												if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.s1.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
													return this.oResourceBundle.getText("ObjectHeaderTitle");
												} else if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.s1.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
													return this.oResourceBundle.getText("ObjectHeaderTitle_PROC");
												}
											} else {
												return this.oResourceBundle.getText("ObjectHeaderTitle");
											}

										},

										// Returns the Number Unit
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getNumberUnit : function() {
											if (this.sOrderCategory) {
												if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.s1.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
													return this.oResourceBundle.getText("NumberUnit");
												} else if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.s1.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
													return this.oResourceBundle.getText("NumberUnit_PROC");
												}
											} else {
												return this.oResourceBundle.getText("NumberUnit");
											}
										},

										// Returns the Icon for Monitor App Tile
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getMonitorAppIcon : function() {
											return "sap-icon://Fiori5/F0266";
										},

										// Returns the Icon for Manage App Tile
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getManageAppIcon : function() {
											return "sap-icon://Fiori5/F0273";
										},

										// Returns the navigation target for the navigation to the corresponding manage app
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getNavigationTarget : function() {
											return {
												semanticObject : "MRPProductionOrderItem",
												action : "manage"
											};
										},

										// Returns the navigation parameters for the navigation to the corresponding manage app
										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getNavigationParams : function() {
											var aSelectedItems = this.getView().byId(this.getTableId()).getSelectedItems();
											var aMaterialID = [];
											var aMRPArea = [];
											var aMRPElement = [];
											var aMRPElementCategory = [];
											var aMRPPlanningSegmentNumber = [];
											var aMRPPlanningSegmentType = [];
											var aMRPPlant = [];
											var oObject = {};

											for (var i = 0; i < aSelectedItems.length; i++) {
												oObject = aSelectedItems[i].getBindingContext().getObject();
												aMaterialID.push(oObject.MaterialID);
												aMRPArea.push(oObject.MRPArea);
												aMRPPlant.push(oObject.MRPPlant);
												aMRPElement.push(oObject.MRPElement);
												aMRPElementCategory.push(oObject.MRPElementCategory);
												aMRPPlanningSegmentNumber.push(oObject.MRPPlanningSegmentNumber);
												aMRPPlanningSegmentType.push(oObject.MRPPlanningSegmentType);
											}

											var oParams = {
												"MaterialShortageDefinitionID" : aSelectedItems[0].getBindingContext().getProperty(
														"MaterialShortageDefinitionID"),
												"ComponentShortageDefinitionID" : aSelectedItems[0].getBindingContext().getProperty(
														"ComponentShortageDefinitionID"),
												"MaterialID" : aMaterialID,
												"MRPArea" : aMRPArea,
												"MRPElement" : aMRPElement,
												"MRPElementCategory" : aMRPElementCategory,
												"MRPPlanningSegmentNumber" : aMRPPlanningSegmentNumber,
												"MRPPlanningSegmentType" : aMRPPlanningSegmentType,
												"MRPPlant" : aMRPPlant,
												"OrderCategory" : this.sOrderCategory
											// gets filled via the URL Parameter, or the variant.
											};

											return oParams;
										},

										// Changes the Application naming between Production and Process Order
										/**
										 * get
										 * 
										 * @param {string}
										 *          mRPElementCategory yyy
										 */
										_changeAppName : function(mRPElementCategory) {
											// Process Order
											if (mRPElementCategory === i2d.pp.mrpcockpit.reuse.s1.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
												this.masterTitle = "FULLSCREEN_TITLE_PROC";
												if (this.getView().byId("ObjectHeader")) {
													this.getView().byId("ObjectHeader").setNumberUnit(
															this.oResourceBundle.getText("NumberUnit_PROC"));
												} else {
													this.getView().byId("ToolBarCount").setText(this.oResourceBundle.getText("NumberUnit_PROC"));
												}
											} else {
												// Production Order
												this.masterTitle = "FULLSCREEN_TITLE";
												if (this.getView().byId("ObjectHeader")) {
													this.getView().byId("ObjectHeader").setNumberUnit(this.oResourceBundle.getText("NumberUnit"));
												} else {
													this.getView().byId("ToolBarCount").setText(this.oResourceBundle.getText("NumberUnit"));
												}
											}
											this.getView().byId("page").setTitle(this.oResourceBundle.getText(this.masterTitle));
										},

										// navigate to managing Application
										onNavigationButtonPressed : function() {
											S1parent.prototype.onNavigationButtonPressed.call(this);
										},

										// navigate to managing Application
										onHandleBack : function() {
											S1parent.prototype.navBack.call(this);
										},

										// Am I a 'Monitor App' or not? If yes, return 1
										/**
										 * get
										 * 
										 * @returns {void}
										 */
										getMonitorAppTypeTrue : function() {
											return true;

											/**
											 * get
											 * 
											 * @returns {string} url
											 */
										},
										getNumericFilterFields : function() {
											return ["MRPElementOpenQuantity", "MfgOrderPlannedTotalQty", "LateSupplyQuantity",
													"NumberOfComponentsWithProblems"];
										},

										/**
										 * get
										 * 
										 * @returns {string} url
										 */
										getInputFilterList : function() {
											return ["MaterialID", "MRPPlant", "MRPArea","MRPElement","ProductionVersion"];
										}

									});

					// /* bExport= */ true
				});