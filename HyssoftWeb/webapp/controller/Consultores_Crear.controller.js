sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Consultores_Crear", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Consultores_Crear
		 */
		onInit: function () {},
		crearconsultor: function () {
			
			var CEDULA = this.getView().byId("CEDULA").getValue();
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var CARGO = this.getView().byId("CARGO").getValue();
			var PAIS = this.getView().byId("PAIS").getValue();
			var CIUDAD = this.getView().byId("CIUDAD").getValue();
			var TELEFONO = this.getView().byId("TELEFONO").getValue();
			var CELULAR = this.getView().byId("CELULAR").getValue();
			var ESTADO = this.getView().byId("ESTADO").getValue();
			var payLoad = {
				"CEDULA": CEDULA,
				"NOMBRE": NOMBRE,
				"CARGO": CARGO,
				"PAIS": PAIS,
				"CIUDAD": CIUDAD,
				"TELEFONO": TELEFONO,
				"CELULAR": CELULAR,
				"ESTADO": ESTADO
			};
			var Model = this.getView().getModel();
			Model.create("/Consultores", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Contactos_Lista");
		},
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Consultores_Crear
		 */
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