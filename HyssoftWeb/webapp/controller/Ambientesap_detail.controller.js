sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Ambientesap_detail", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Ambientes_detail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/AmbienteSAP(" + oArgs.ID + ")",
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
			var empnit = Empresas["ID"];
			Model.remove("/AmbienteSAP(" + empnit + ")", true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Ambientes_Lista");
		},
		
		modificarAmbiente: function (oEvent) {
			var ID = this.getView().byId("ID").getValue();
			var AMBSAP = this.getView().byId("AMBSAP").getValue();
			var RUTA = this.getView().byId("RUTA").getValue();
			var NIT_NIT = this.getView().byId("NIT_NIT").getValue();
			
			var payLoad = {
				"ID": ID,
				"AMBSAP": AMBSAP,
				"RUTA": RUTA,
				"NIT_NIT": NIT_NIT
			};
			var Model = this.getView().getModel();
			Model.update("/Vpn('" + ID + "')", payLoad,{
				merge: true,
				success: function (oCreatedEntry) {
					MessageToast.show("Actualización exitosa!");
				},
				error: function (oError) {
					MessageToast.show("Error en la actualización");
				}
				
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            	oRouter.navTo("Ambientes_Lista");
		},
		handleNavButtonPress: function (evt) {
			 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("home");
		},
		/**
		 *@memberOf Hyssoft.Hyssoft.controller.Detail
		 */
		modifc: function () {
			MessageToast.show("Cualquier Maricada");
		},
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Consultores_Detail
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