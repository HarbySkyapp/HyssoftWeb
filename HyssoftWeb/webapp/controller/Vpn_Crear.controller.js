sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Vpn_Crear", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Vpn_Crear
		 */
		onInit: function () {

		},
		
		crearVpn: function () {
			var ID = this.getView().byId("ID").getValue();
			var VPN = this.getView().byId("VPN").getValue();
			var USUARIO = this.getView().byId("USUARIO").getValue();
			var CLAVE = this.getView().byId("CLAVE").getValue();
			var INFORMACION = this.getView().byId("INFORMACION").getValue();
			var NIT_EMP = this.getView().byId("NIT_EMP").getValue();
			var payLoad = {
				"ID": ID,
				"VPN": VPN,
				"USUARIO": USUARIO,
				"CLAVE": CLAVE,
				"INFORMACION": INFORMACION,
				"NIT_EMP": NIT_EMP
			};
			var Model = this.getView().getModel();
			Model.create("/Vpn", payLoad,{});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Vpn_Lista");
		},


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Vpn_Crear
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Vpn_Crear
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Vpn_Crear
		 */
		//	onExit: function() {
		//
		//	}

	});

});