sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Ticket_crear", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Ticket_crear
		 */
		onInit: function () {},
		crearticket: function () {
			var TICKET = this.getView().byId("TICKET").getValue();
			var FECHA = this.getView().byId("TICKET").getValue();
			var MODULO = this.getView().byId("MODULO").getValue();
			var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
			var ESTADOCONTRATO = this.getView().byId("ESTADOCONTRATO").getValue();
			var NIT_NIT = this.getView().byId("NIT_NIT").getValue();
			
			var payLoad = {
				"TICKET": TICKET,
				"FECHA": FECHA,
				"MODULO": MODULO,
				"DESCRIPCION": DESCRIPCION,
				"ESTADOCONTRATO": ESTADOCONTRATO,
				"NIT_NIT": NIT_NIT
				
			};
			var Model = this.getView().getModel();
			Model.create("/Ticket", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Tickets_Lista");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Ticket_crear
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Ticket_crear
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Ticket_crear
		 */
		//	onExit: function() {
		//
		//	}

	});

});