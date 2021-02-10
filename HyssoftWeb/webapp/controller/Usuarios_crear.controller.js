sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Usuarios_crear", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Usuarios_crear
		 */
		onInit: function () {},
		crearusuario: function () {
			var ID = this.getView().byId("ID").getValue();
			var MANDANTE = this.getView().byId("MANDANTE").getValue();
			var USUARIO = this.getView().byId("USUARIO").getValue();
			var CLAVE = this.getView().byId("CLAVE").getValue();
			var NIT_NIT = this.getView().byId("NIT_NIT").getValue();
			var AMBSAP_AMBSAP = this.getView().byId("AMBSAP_AMBSAP").getValue();
			var payLoad = {
				"ID": ID,
				"MANDANTE": MANDANTE,
				"USUARIO": USUARIO,
				"CLAVE": CLAVE,
				"NIT_NIT": NIT_NIT,
				"AMBSAP_AMBSAP": AMBSAP_AMBSAP
			};
			var Model = this.getView().getModel();
			Model.create("/Usuarios", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Usuarios_Lista");
		},
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Usuarios_crear
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