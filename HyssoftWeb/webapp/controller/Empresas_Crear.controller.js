sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Empresas_Crear", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Empresas_Crear
		 */
		onInit: function () {},
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Empresas_Crear
		 */
		 crearempresa: function () {
			var NIT = this.getView().byId("NIT").getValue();
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var PAIS = this.getView().byId("PAIS").getValue();
			var CIUDAD = this.getView().byId("CIUDAD").getValue();
			var DIRECCION = this.getView().byId("DIRECCION").getValue();
			var VERSPE = this.getView().byId("VERSPE").getValue();
			var FECULTAC = this.getView().byId("FECULTAC").getValue();
			var CONTVIG = this.getView().byId("CONTVIG").getValue();
			var FECHAINI = this.getView().byId("FECHAINI").getValue();
			var FECHAFIN = this.getView().byId("FECHAFIN").getValue();
			var NROCONTRA = this.getView().byId("NROCONTRA").getValue();
			var D_MAX = this.getView().byId("D_MAX").getValue();
			var DIASCONS = this.getView().byId("DIASCONS").getValue();
			var DPAGO = this.getView().byId("DPAGO").getValue();
			var ULTFV = this.getView().byId("ULTFV").getValue();
			var FECHAFV = this.getView().byId("FECHAFV").getValue();
			var payLoad = {
				"NIT": NIT,
				"NOMBRE": NOMBRE,
				"PAIS": PAIS,
				"CIUDAD": CIUDAD,
				"DIRECCION": DIRECCION,
				"VERSPE": VERSPE,
				"FECULTAC": FECULTAC,
				"CONTVIG": CONTVIG,
				"FECHAINI": FECHAINI,
				"FECHAFIN": FECHAFIN,
				"NROCONTRA": NROCONTRA,
				"D_MAX": D_MAX,
				"DIASCONS": DIASCONS,
				"DPAGO": DPAGO,
				"ULTFV": ULTFV,
				"FECHAFV": FECHAFV
			};
			var Model = this.getView().getModel();
			Model.create("/Empresas", payLoad,{});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Empresas_Lista");
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