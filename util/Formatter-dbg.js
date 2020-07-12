/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["jquery.sap.global", "sap/ui/core/format/DateFormat", "sap/ui/core/format/NumberFormat"],
				function(jQuery, DateFormat, NumberFormat) {
					"use strict";

					var Formatter = {};

					// note: variable is global for the entire shell (for all application instances)
					Formatter.oResourceBundle = null;

					Formatter.getBundle = function() {
						if (Formatter.oResourceBundle) {
							return Formatter.oResourceBundle;
						}
						return {
							/* eslint-disable no-unused-vars */
							getText : function(a, b) {
								return "ERROR";
							}
						/* eslint-enable no-unused-vars */
						};
					};

					Formatter.formatDateShort = function(dDate) {
						if (dDate) {
							var oDateFormatShort = DateFormat.getDateInstance({
								style : "short"
							});
							return oDateFormatShort.format(dDate);
						}
						return "";
					};
					
					//UTC representation of date to avoid date shift due to time zone			
					Formatter.formatDateShortUTC = function(dDate) {
						if (dDate) {
							var oDateFormatShort = DateFormat.getDateInstance({
								style : "short",
								UTC : "true"
							});
							return oDateFormatShort.format(dDate);
						}
						return "";
					};					

					// Formatter.formatQuantity = function(value, precision, unit, unitcom, precisiondisplay) {
					// 	var iVersion = this.getModel("ServiceVersions").getData().iServiceSchemaVersion;
					// 	if (iVersion < 4) {
					// 		// ( interoperability rel-1.5 and lower

					// 		/* eslint-disable no-eq-null */
					// 		if ((value != null) && (precision != null) && (unit != null)) {
					// 			/* eslint-enable no-eq-null */
					// 			var sFormattedValue = NumberFormat.getFloatInstance({
					// 				decimals : precision
					// 			}).format(value, unit);
					// 			return sFormattedValue + " " + unit;
					// 		}
					// 		return "";
					// 	} else {
					// 		// interoperability master (rel-1.7) + ssuite and higher
					// 		/* eslint-disable no-eq-null */
					// 		if ((value != null) && (precision != null) && (unitcom != null)) {
					// 			/* eslint-enable no-eq-null */
					// 			/* eslint-disable no-redeclare */
					// 			var useprecision;
					// 			if (precisiondisplay) {
					// 				useprecision = precisiondisplay;
					// 			} else {
					// 				useprecision = precision;
					// 			}
					// 			var sFormattedValue = NumberFormat.getFloatInstance({
					// 				decimals : useprecision
					// 			}).format(value, unitcom);
					// 			/* eslint-enable no-redeclare */
					// 			return sFormattedValue + " " + unitcom;
					// 		}
					// 		return "";
					// 	}
					// };

					// Formatter.formatDelay = function(iDelay) {
					// 	if (iDelay) {
					// 		if (iDelay === 1) {
					// 			return Formatter.getBundle().getText("Day", [iDelay]);
					// 		}
					// 		if ((iDelay > 1) && (iDelay !== 999)) {
					// 			return Formatter.getBundle().getText("Days", [iDelay]);
					// 		}
					// 		if ((iDelay <= 0) || (iDelay === 999)) {
					// 			// return Formatter.getBundle().getText("NoSupply");
					// 			return "";
					// 		}
					// 	}
					// 	return "";
					// };

					// Formatter.formatComponentDelay = function(iDelay) {
					// 	if (iDelay) {
					// 		if (iDelay === 1) {
					// 			return Formatter.getBundle().getText("DayLate", [iDelay]);
					// 		}
					// 		if ((iDelay > 1) && (iDelay !== 999)) {
					// 			return Formatter.getBundle().getText("DaysLate", [iDelay]);
					// 		}
					// 		if (iDelay === 999) {
					// 			return Formatter.getBundle().getText("NoSupply");
					// 		}
					// 		if (iDelay <= 0) {
					// 			return "";
					// 		}
					// 	}
					// 	return "";
					// };

					Formatter.formatComponentDelayText = function(iDelay) {
						if (iDelay) {
							if (iDelay === 1) {
								return Formatter.getBundle().getText("DayLateWO_Number");
							}
							if ((iDelay > 1) && (iDelay !== 999)) {
								return Formatter.getBundle().getText("DaysLateWO_Number");
							}
							if (iDelay === 999) {
								return Formatter.getBundle().getText("NoSupply");
							}
							if (iDelay <= 0) {
								return "";
							}
						}
						return "";
					};

					Formatter.formatComponentDelayNumber = function(iDelay) {
						if (iDelay) {
							if ((iDelay === 1) || ((iDelay > 1) && (iDelay !== 999))) {
								return iDelay;
							}
							if ((iDelay <= 0) || (iDelay === 999)) {
								return "";
							}
						}
						return "";
					};

					Formatter.formatDelayNoDay = function(iDelay) {
						if (iDelay) {
							if ((iDelay === 1) || ((iDelay > 1) && (iDelay !== 999))) {
								return iDelay;
							}
							if ((iDelay <= 0) || (iDelay === 999)) {
								return "";
							}
						}
						return "";
					};

					// Formatter.formatComponentDelayNoDay = function(iDelay) {
					// 	if (iDelay) {
					// 		if ((iDelay === 1) || ((iDelay > 1) && (iDelay !== 999))) {
					// 			return iDelay;
					// 		}
					// 		if (iDelay === 999) {
					// 			return Formatter.getBundle().getText("NoSupply");
					// 		}
					// 		if (iDelay <= 0) {
					// 			return "";
					// 		}
					// 		return iDelay;
					// 	}
					// 	return "";
					// };

					Formatter.formatIcon = function(iChecked) {
						switch (iChecked) {
							case false :
								// return "sap-icon://decline";
								return "";
							case true :
								return "sap-icon://accept";
							default :
								return "";
						}
					};

					Formatter.pdaTooltip = function(iChecked) {
						switch (iChecked) {
							case false :
								return ""; // Formatter.getBundle().getText("xtolPDANotAllowed");
							case true :
								return Formatter.getBundle().getText("ManufacturingOrderIsLate");
							default :
								return "";
						}
					};

					Formatter.leadingZeros = function(number) {
						if (number) {
							return number.replace(/^(0+)/g, "");
						}
						return "";
					};

					// Formatter.formatRatioInPct = function(value, precision) {
					// 	/* eslint-disable no-eq-null */
					// 	if ((value != null) && (precision != null)) {
					// 		/* eslint-enable no-eq-null */
					// 		var sFormattedValue = NumberFormat.getFloatInstance({
					// 			decimals : precision
					// 		}).format(value);
					// 		return sFormattedValue + " " + "%";
					// 	}
					// 	return value + " " + "%";
					// };

					// Formatter.formatNumberOfComponents = function(status) {
					// 	/* eslint-disable eqeqeq */
					// 	return (status == "0") ? "None" : "Error";
					// 	/* eslint-enble eqeqeq */
					// };

					/* eslint-disable no-unused-vars */
					// Formatter.formatLatenessDuration = function(status) {
					// 	return "Error";
					// };
					/* eslint-enable no-unused-vars */

					/* eslint-disable no-unused-vars */
					// Formatter.formatMaximumDelay = function(status) {
					// 	return "Error";
					// };
					/* eslint-enable no-unused-vars */

					// Formatter.formatDurationToNextStatus = function(status) {
					// 	try {
					// 		if (status > 0) {
					// 			return "Error";
					// 		} else {
					// 			return "None";
					// 		}
					// 	} catch (err) {
					// 		return "None";
					// 	}
					// };

					Formatter.formatDurationToNextStatusInDaysState = function(iStatus) {
						try {
							if (iStatus < 0) {
								return "Error";
							} else {
								return "None";
							}
						} catch (err) {
							return "None";
						}
					};

					Formatter.formatDurationToNextStatusInDays = function(iDelay) {
						try {
							var fValue = parseFloat(iDelay);
							if (fValue < -1) {
								var fPosValue = fValue * -1;
								return Formatter.getBundle().getText("OverdueByDays", [fPosValue]);
							}
							if (fValue === -1) {
								/* eslint-disable no-redeclare */
								var fPosValue = fValue * -1;
								/* eslint-enable no-redeclare */
								return Formatter.getBundle().getText("OverdueByDay", [fPosValue]);
							}
							if (fValue === 0) {
								return Formatter.getBundle().getText("Today", [iDelay]);
							}
							if (fValue === 1) {
								return Formatter.getBundle().getText("InDay", [iDelay]);
							}
							if (fValue > 1) {
								return Formatter.getBundle().getText("InDays", [iDelay]);
							}
						} catch (err) {
							return "None";
						}
					};

					Formatter.formatMfgOrderProblemCatIconStockReq = function(iCategory) {
						try {
							var fValue = iCategory.substring(0, 1);
							if (fValue == "1") {
								return "Error";
							} else {
								return "None";
							}
						} catch (err) {
							return "None";
						}
					};

					Formatter.formatMfgOrderProblemCatIconTree = function(iCategory) {
						try {
							var fValue = iCategory.substring(1, 2);
							if (fValue == "1") {
								return "Error";
							} else {
								return "None";
							}
						} catch (err) {
							return "None";
						}
					};

					Formatter.formatMfgOrderProblemCatIconGantt = function(iCategory) {
						try {
							var fValue = iCategory.substring(2, 3);
							if (fValue == "1") {
								return "Error";
							} else {
								return "None";
							}
						} catch (err) {
							return "None";
						}
					};

					/**
					 * formats late base material "Material late by 3 days" "Material late by one days" "Material on time"
					 */
					Formatter.formatBaseMaterialDelayText = function(latenessDurationInWorkDays) {
						// we have base material missing more than one day
						if (latenessDurationInWorkDays >= 2) {
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_X_DAYS",
									[latenessDurationInWorkDays]);
							// we have base material missing one da
						} else if (latenessDurationInWorkDays === 1) {
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_ONE_DAYS");
						} else {
							// base material on time
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_ON_TIME");
						}
					};

					/**
					 * formats missing components "1 missing part" "x missing parts" "No missing components"
					 */
					Formatter.formatMissingComponentsText = function(numberOfComponentsWithProblems) {
						// we have several components misssing
						if (numberOfComponentsWithProblems >= 2) {
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_X_COMPONENTS_MISSING",
									[numberOfComponentsWithProblems]);
							// we have one component missing
						} else if (numberOfComponentsWithProblems === 1) {
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_ONE_COMPONENT_MISSING",
									[numberOfComponentsWithProblems]);
						} else {
							// we are <= 0 so no component is missing
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_NO_MISSING_COMPONENTS",
									[numberOfComponentsWithProblems]);
						}
					};

					/**
					 * formats process delay "Late and Overdue" "Overdue" "On schedule"
					 */
					Formatter.formatProcessDelayText = function(durnPlndStatusToTodayInWrkdays) {
						// we have a delay of several days
						if (durnPlndStatusToTodayInWrkdays >= 2) {
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_DELAYED_BY_X_DAYS",
									[durnPlndStatusToTodayInWrkdays]);
							// we have a delay of one day
						} else if (durnPlndStatusToTodayInWrkdays === 1) {
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_DELAYED_BY_ONE_DAY");
						} else {
							// we are <= 0 so we are on schedule
							return this.getModel("i18n").getResourceBundle().getText("MASTER_STATUS_ON_SCHEDULE");
						}
					};

					Formatter.addWorkingDays = function(columnText) {
						var sDayType = "";

						if (sap.ui.Device.system.desktop) {
							// show "Working Days"
							sDayType = Formatter.getBundle().getText("WorkingDays");
						} else {
							// show "WD"
							sDayType = Formatter.getBundle().getText("WorkingDaysShort");
						}
						return columnText + " " + sDayType;
					};

					Formatter.addCalendarDays = function(columnText) {
						var sDayType = "";

						if (sap.ui.Device.system.desktop) {
							// show "CalendarDays"
							sDayType = Formatter.getBundle().getText("CalendarDays");
						} else {
							// show "CD"
							sDayType = Formatter.getBundle().getText("CalendarDaysShort");
						}
						return columnText + " " + sDayType;
					};

					Formatter.formatDurationStartEnd = function(iDuration) {
						if (iDuration === 999999) {
							return "";
						} else if (iDuration === 0){
							return "";
						} else {
							return iDuration;
						}
					};

					Formatter.formatDurationStartEndText = function(iDuration) {
						if (iDuration === 999999) {
							return this.getModel("i18n").getResourceBundle().getText("DurationDone");
						} else {
							return "";
						}
					};
					
					Formatter.formatComponents = function(iComponent) {
						if (iComponent === 0) {
							return "";
						} else {
							return iComponent;
						}
					};
					
					return Formatter;

				}, /* bExport= */true);