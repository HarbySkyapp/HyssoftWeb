sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Contactos_crear", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Contactos_crear
		 */
		onInit: function () {},
		crearcontacto: function () {
			var oComboBox = this.byId("NIT_NIT");
			var	sKey = oComboBox.getSelectedItem().getKey();
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var CARGO = this.getView().byId("CARGO").getValue();
			var EMAIL = this.getView().byId("EMAIL").getValue();
			var TELUNO = this.getView().byId("TELUNO").getValue();
			var TELDOS = this.getView().byId("TELDOS").getValue();
			var payLoad = {
				"NOMBRE": NOMBRE,
				"CARGO": CARGO,
				"EMAIL": EMAIL,
				"TELUNO": TELUNO,
				"TELDOS": TELDOS,
				"NIT_NIT": sKey,
			};
			var Model = this.getView().getModel();
			Model.create("/Contactos", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Contactos_Lista");
		},

		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});