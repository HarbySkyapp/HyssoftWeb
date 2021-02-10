sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Aplicaciones_Crear", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Aplicaciones_Crear
		 */
		onInit: function () {},
		
		crearaplicacion: function () {
			var CODIGO = this.getView().byId("CODIGO").getValue();
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var PAQUETE = this.getView().byId("PAQUETE").getValue();
			var payLoad = {
				"CODIGO": CODIGO,
				"NOMBRE": NOMBRE,
				"PAQUETE": PAQUETE
			};
			var Model = this.getView().getModel();
			Model.create("/AppHyssoft", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Aplicaciones_Lista");
		},
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Aplicaciones_Crear
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