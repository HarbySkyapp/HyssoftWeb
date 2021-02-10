sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Vpn_Detail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Vpn_detail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/Vpn(" + oArgs.ID + ")",
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
			Model.remove("/Vpn(" + empnit + ")", true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Vpn_Lista");
		},
		
		modificarconsultor: function (oEvent) {
			var ID = this.getView().byId("ID").getValue();
			var VPN = this.getView().byId("VPN").getValue();
			var USUARIO = this.getView().byId("USUARIO").getValue();
			var CLAVE = this.getView().byId("CLAVE").getValue();
			var INFORMACION = this.getView().byId("INFORMACION").getValue();
			var NIT = this.getView().byId("NIT").getValue();
			var payLoad = {
				"ID": ID,
				"VPN": VPN,
				"USUARIO": USUARIO,
				"CLAVE": CLAVE,
				"INFORMACION": INFORMACION,
				"NIT": NIT
			};
			var Model = this.getView().getModel();
			Model.update("/Vpn('" + ID + "')", payLoad, {});
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