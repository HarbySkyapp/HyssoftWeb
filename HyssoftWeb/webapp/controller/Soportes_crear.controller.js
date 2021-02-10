sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Soportes_crear", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Soportes_crear
		 */
		onInit: function () {},
		crearsoporte  : function () {
				var FECHA = this.getView().byId("FECHA").getValue();
			var TIPOSOPORTE = this.getView().byId("TIPOSOPORTE").getValue();
			var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
			var SOLUCION = this.getView().byId("SOLUCION").getValue();
			var HORAS= this.getView().byId("HORAS").getValue();
			var TICKET_TICKET= this.getView().byId("TICKET_TICKET").getValue();
			var CONSULTOR_CEDULA= this.getView().byId("CONSULTOR_CEDULA").getValue();
			var PROGRAMA_NOMBRE= this.getView().byId("PROGRAMA_NOMBRE").getValue();
			var payLoad = {
				"FECHA": FECHA,
				"TIPOSOPORTE": TIPOSOPORTE,
				"DESCRIPCION": DESCRIPCION,
				"SOLUCION": SOLUCION,
				"HORAS":  HORAS,
				"TICKET_TICKET": TICKET_TICKET,
				"CONSULTOR_CEDULA":  CONSULTOR_CEDULA,
				"PROGRAMA_NOMBRE":  PROGRAMA_NOMBRE
			};
			var Model = this.getView().getModel();
			Model.create("/Soporte", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Soportes_Lista");
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