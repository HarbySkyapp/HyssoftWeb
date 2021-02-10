sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Contactos_Crear_Dos", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Contactos_detail
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Contactos_Crear_Dos").attachMatched(this._onRouteMatched, this);
		},
		
		crearcontacto: function (oEvent) {
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var CARGO = this.getView().byId("CARGO").getValue();
			var EMAIL = this.getView().byId("EMAIL").getValue();
			var TELUNO = this.getView().byId("TELUNO").getValue();
			var TELDOS = this.getView().byId("TELDOS").getValue();
			var NIT = this.getView().byId("NIT").getValue();
			var payLoad = {
				"NOMBRE": NOMBRE,
				"CARGO": CARGO,
				"EMAIL": EMAIL,
				"TELUNO": TELUNO,
				"TELDOS": TELDOS,
				"NIT_NIT": NIT
			};
			var Model = this.getView().getModel();
			Model.create("/Contactos", payLoad, {});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedNIT = oEvent.getSource().getBindingContext().getProperty("NIT");
			oRouter.navTo("empresas_detail", {
				NIT: selectedNIT
			});
		},
		
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/Empresas('" + oArgs.NIT + "')",
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
		},
		
		onDelete0: function (oEvent) {
			var Empresas = oEvent.getSource().getBindingContext().getObject();
			var Model = this.getView().getModel();
			var empnit = Empresas['NOMBRE'];
			MessageToast.show(empnit);
			Model.remove("/Contactos('" + empnit + "')", true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Contactos_Lista");
		},
		
		modificarcontacto: function (oEvent) {
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var CARGO = this.getView().byId("CARGO").getValue();
			var EMAIL = this.getView().byId("EMAIL").getValue();
			var TELUNO = this.getView().byId("TELUNO").getValue();
			var TELDOS = this.getView().byId("TELDOS").getValue();
			var NIT_NIT = this.getView().byId("NIT_NIT").getValue();
			var payLoad = {
				"NOMBRE": NOMBRE,
				"CARGO": CARGO,
				"EMAIL": EMAIL,
				"TELUNO": TELUNO,
				"TELDOS": TELDOS,
				"NIT_NIT": NIT_NIT
			};
			var Model = this.getView().getModel();
			Model.update("/Contactos('" + NOMBRE + "')", payLoad, {
				MERGE: true,
				success: function (oCreatedEntry) {
					MessageToast.show("Actualizaci\xF3n exitosa!");
				},
				error: function (oError) {
					MessageToast.show("Error en la actualizaci\xF3n");
				}
			});
		},
		
		handleNavButtonPress: function (evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
		},
		
		handleListItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedNIT = oEvent.getSource().getBindingContext().getProperty("NIT");
			oRouter.navTo("empresas_detail", {
				NIT: selectedNIT
			});
		},
		
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Contactos_detail
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