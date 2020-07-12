/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.predefine('i2d/pp/prdorderissue/monitor/s1/Component',["sap/ui/core/UIComponent","sap/ui/Device","i2d/pp/prdorderissue/monitor/s1/model/models","sap/ui/core/routing/Router","sap/ui/core/routing/History"],function(U,D,m,R,H){"use strict";return U.extend("i2d.pp.prdorderissue.monitor.s1.Component",{metadata:{"manifest":"json"},createContent:function(){jQuery.sap.require("i2d.pp.mrpcockpit.reuse.s1.util.Lessifier");i2d.pp.mrpcockpit.reuse.s1.util.Lessifier.lessifyCSSx10();this.sStateID=jQuery.sap.uid();if(!sap.ui.core.routing.HashChanger.getInstance().getHash()){sap.ui.core.routing.HashChanger.getInstance().replaceHash(this.sStateID);}var v={component:this};return sap.ui.view({viewName:"i2d.pp.prdorderissue.monitor.s1.Main",type:sap.ui.core.mvc.ViewType.XML,viewData:v});},init:function(){sap.ui.core.UIComponent.prototype.init.apply(this,arguments);this.setModel(m.createDeviceModel(),"device");this.getRouter().attachRouteMatched(this._handleRouteMatched);this.getModel().metadataLoaded().then(function(){this.getRouter().initialize();}.bind(this));},_handleRouteMatched:function(e){var a=e.getParameter("targetControl");if(!(a instanceof sap.m.NavContainer||a instanceof sap.m.SplitContainer)){return;}if(sap.m.InstanceManager.hasOpenPopover()){sap.m.InstanceManager.closeAllPopovers();}if(sap.m.InstanceManager.hasOpenDialog()){sap.m.InstanceManager.closeAllDialogs();}var v=e.getParameter("view");var V=e.getParameter("config").viewLevel;var n=(a instanceof sap.m.SplitContainer)&&!!a.getMasterPage(v.getId());var h=sap.ui.core.routing.History.getInstance();var b;if(V===undefined||this._iCurrentViewLevel===undefined||V===this._iCurrentViewLevel){b=h.getDirection()==="Backwards";}else{b=(V!==undefined&&(V<this._iCurrentViewLevel));}if(b){var p=a.getPreviousPage(n);if(!p||p.getId()!==v.getId()){a.insertPreviousPage(v.getId());}a.backToPage(v.getId());}else{a.to(v.getId());}this._iCurrentViewLevel=V;}});});sap.ui.require.preload({"i2d/pp/prdorderissue/monitor/s1/manifest.json":'{"_version":"1.6.0","sap.app":{"_version":"1.1.0","id":"i2d.pp.prdorderissue.monitor.s1","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"7.0.2"},"title":"{{shellTitle}}","ach":"PP-FIO-MRP","dataSources":{"PP_MRP_COCKPIT_SRV":{"uri":"/sap/opu/odata/sap/PP_MRP_COCKPIT_SRV/","settings":{"localUri":"localService/metadata.xml","odataVersion":"2.0"}}},"resources":"resources.json"},"sap.copilot":{"_version":"1.0.0","contextAnalysis":{"allowAddingObjectsFromAppScreenToCollection":false}},"sap.ui":{"_version":"1.1.0","technology":"UI5","icons":{"icon":"sap-icon://Fiori2/F0246","favIcon":"./resources/sap/ca/ui/themes/base/img/favicon/F0246_Monitor_Uncovered_Sales_Order.ico","phone":"./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order57_iPhone_Desktop_Launch.png","phone@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order114_iPhone-Retina_Web_Clip.png","tablet":"./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order72_iPad_Desktop_Launch.png","tablet@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order144_iPad_Retina_Web_Clip.png"},"deviceTypes":{"desktop":true,"tablet":true,"phone":false},"supportedThemes":["sap_hcb","sap_bluecrystal","sap_belize"]},"sap.ui5":{"_version":"1.1.0","dependencies":{"minUI5Version":"1.65.5","libs":{"sap.m":{"lazy":false},"sap.me":{"lazy":false},"sap.ui.layout":{"lazy":false},"i2d.pp.mrpcockpit.reuse.s1":{"minVersion":"1.7.0","lazy":false}}},"config":{"sapFiori2Adaptation":true,"fullWidth":true},"routing":{"config":{"viewType":"XML","viewPath":"i2d.pp.prdorderissue.monitor.s1.view","targetControl":"fioriContent","targetAggregation":"pages","clearTarget":false,"async":true},"routes":[{"pattern":"","view":"S1","viewPath":"i2d.pp.prdorderissue.monitor.s1.view","targetControl":"fioriContent","targetAggregation":"pages","name":"fullscreen"},{"pattern":"second","view":"S3","name":"subscreen"},{"pattern":"{stateID}","view":"S1","name":"state"}]},"contentDensities":{"compact":true,"cozy":false},"models":{"":{"dataSource":"PP_MRP_COCKPIT_SRV","preload":true,"settings":{"metadataUrlParams":{"sap-value-list":"none"}}},"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"i2d.pp.prdorderissue.monitor.s1.i18n.i18n"},"preload":false}}},"sap.platform.abap":{"_version":"1.1.0","uri":"/sap/bc/ui5_ui5/sap/pp_prdordi_mrs1"},"sap.fiori":{"_version":"1.1.0","registrationIds":["F0266"],"archeType":"transactional"}}'},"i2d/pp/prdorderissue/monitor/s1/Component-h2-preload");sap.ui.loader.config({depCacheUI5:{"i2d/pp/prdorderissue/monitor/s1/Component.js":["i2d/pp/prdorderissue/monitor/s1/model/models.js","sap/ui/Device.js","sap/ui/core/UIComponent.js","sap/ui/core/routing/History.js","sap/ui/core/routing/Router.js"],"i2d/pp/prdorderissue/monitor/s1/Main.view.xml":["i2d/pp/prdorderissue/monitor/s1/Main.controller.js","sap/m/App.js","sap/ui/core/mvc/XMLView.js"],"i2d/pp/prdorderissue/monitor/s1/model/models.js":["sap/ui/Device.js","sap/ui/model/json/JSONModel.js"],"i2d/pp/prdorderissue/monitor/s1/util/Formatter.js":["jquery.sap.global.js","sap/ui/core/format/DateFormat.js","sap/ui/core/format/NumberFormat.js"],"i2d/pp/prdorderissue/monitor/s1/view/S1.controller.js":["i2d/pp/mrpcockpit/reuse/s1/view/S1parent.js","i2d/pp/prdorderissue/monitor/s1/util/Formatter.js"],"i2d/pp/prdorderissue/monitor/s1/view/S1.view.xml":["i2d/pp/mrpcockpit/reuse/s1/fragments/FilterBar.fragment.xml","i2d/pp/mrpcockpit/reuse/s1/fragments/VariantHeader.fragment.xml","i2d/pp/prdorderissue/monitor/s1/view/S1.controller.js","sap/m/Button.js","sap/m/Column.js","sap/m/ColumnListItem.js","sap/m/FlexBox.js","sap/m/ObjectIdentifier.js","sap/m/ObjectNumber.js","sap/m/ObjectStatus.js","sap/m/Table.js","sap/m/Text.js","sap/m/Toolbar.js","sap/m/ToolbarSpacer.js","sap/m/semantic/FullscreenPage.js","sap/ui/core/ExtensionPoint.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js","sap/ui/core/mvc/XMLView.js","sap/ui/layout/Grid.js","sap/ui/layout/GridData.js","sap/ui/layout/HorizontalLayout.js","sap/ui/layout/VerticalLayout.js"]}});
