sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Programas_Crear", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Programas_Crear
		 */
		onInit: function () {},
		crearprograma: function () {
				var NOMBRE = this.getView().byId("NOMBRE").getValue();
				var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
				var CODIGO_CODIGO = this.getView().byId("CODIGO_CODIGO").getValue();
				var payLoad = {
					"NOMBRE": NOMBRE,
					"DESCRIPCION": DESCRIPCION,
					"CODIGO_CODIGO": CODIGO_CODIGO
				};
				var Model = this.getView().getModel();
				Model.create("/Programas", payLoad, {});
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Programas_Lista");
			}
			
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf HyssoftWeb.HyssoftWeb.view.Programas_Crear
			 */
			//	onBeforeRendering: function() {
			//
			//	},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf HyssoftWeb.HyssoftWeb.view.Programas_Crear
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf HyssoftWeb.HyssoftWeb.view.Programas_Crear
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Programas_Crear
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