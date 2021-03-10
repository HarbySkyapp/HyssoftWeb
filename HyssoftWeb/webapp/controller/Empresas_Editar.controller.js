sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Empresas_Editar", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Contactos_detail
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Empresas_Editar_Modifi").attachMatched(this._onRouteMatched, this);
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
		
		handleListItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedNIT = oEvent.getSource().getBindingContext().getProperty("NIT");
			oRouter.navTo("empresas_detail", {
				NIT: selectedNIT
			});
		},
		
		modificarconsultor: function (oEvent) {
			var CEDULA = this.getView().byId("CEDULA").getValue();
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var CARGO = this.getView().byId("CARGO").getValue();
			var PAIS = this.getView().byId("PAIS").getValue();
			var CIUDAD = this.getView().byId("CIUDAD").getValue();
			var TELEFONO = this.getView().byId("TELEFONO").getValue();
			var CELULAR = this.getView().byId("CELULAR").getValue();
			var ESTADO = "Activo";
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
			Model.update("/Consultores('" + CEDULA + "')", payLoad, {
				PUT: true,
				success: function (oCreatedEntry) {
					MessageToast.show("Actualización exitosa!");
				},
				error: function (oError) {
					MessageToast.show("Error en la actualización");
				}
			});
		},
		
		update: function (oEvent) {
			var Model = this.getView().getModel();
			var oData = {
		    NOMBRE: "PRUEBA",
		    PAIS: "AR"
		};
		Model.update("Empresas('800059470-5')", oData, {});
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