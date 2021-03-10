sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Tickets_consulta", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Tickets_consulta
		 */
		onInit: function () {

		},
		
		onFilterProducts: function (oEvent) {
			var prodFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				prodFilter.push(new Filter("TICKET", FilterOperator.Contains, sQuery));
			}
			var oList = this.byId("TICKET");
			var oBinding = oList.getBinding("ObjectListItem");
			oBinding.filter(prodFilter);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Tickets_consulta
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Tickets_consulta
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Tickets_consulta
		 */
		//	onExit: function() {
		//
		//	}

	});

});