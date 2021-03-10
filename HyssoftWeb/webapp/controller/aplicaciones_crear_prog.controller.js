sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.aplicaciones_crear_prog", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("aplicaciones_crear_prog").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/AppHyssoft(" + oArgs.CODIGO + ")",
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
		
		crearprogramaApl: function (oEvent) {
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
			var selectedCODIGO = oEvent.getSource().getBindingContext().getProperty("CODIGO");
				oRouter.navTo("Aplicaciones_detail", {
				CODIGO: selectedCODIGO
			});
		},
		
		onDelete0: function (oEvent) {
			var Empresas = oEvent.getSource().getBindingContext().getObject();
			var Model = this.getView().getModel();
			var empnit = Empresas['CODIGO'];
			MessageToast.show(empnit);
			Model.remove("/apphyssoft('" + empnit + "')", true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Aplicaciones_Lista");
		},
		
		modificarcontacto: function (oEvent) {
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
			var CODIGO_CODIGO = this.getView().byId("CODIGO_CODIGO").getValue();
			var payLoad = {
				"NOMBRE": NOMBRE,
				"DESCRIPCION": DESCRIPCION,
				"CODIGO_CODIGO": CODIGO_CODIGO
			};
			var Model = this.getView().getModel();
			Model.update("/apphyssoft('" + CODIGO_CODIGO + "')", payLoad, {
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
			var selectedCODIGO = oEvent.getSource().getBindingContext().getProperty("CODIGO");
			oRouter.navTo("Aplicaciones_detail", {
				CODIGO: selectedCODIGO
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