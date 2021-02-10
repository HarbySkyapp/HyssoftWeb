sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Include_Crear", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Include_Crear
		 */
		onInit: function () {},
		crearinclude: function () {
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
			var FECHA = this.getView().byId("FECHA").getValue();
			var oComboBox1 = this.byId("PROGRAMA_NOMBRE");
			var sKey1 = oComboBox1.getSelectedItem().getKey();
			var oComboBox2 = this.byId("CONSULTOR_CEDULA");
			var sKey2 = oComboBox2.getSelectedItem().getKey();
			var payLoad = {
				"NOMBRE": NOMBRE,
				"DESCRIPCION": DESCRIPCION,
				"FECHA": FECHA,
				"PROGRAMA_NOMBRE": sKey1,
				"CONSULTOR_CEDULA": sKey2
			};
			var Model = this.getView().getModel();
			Model.create("/Includes", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Include_Lista");
		},
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Include_Crear
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