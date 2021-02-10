sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Include_Detail", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Include_detail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/Includes('" + oArgs.NOMBRE + "')",
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
			var empnit = Empresas["NOMBRE"];
			Model.remove("/Includes('" + empnit + "')", true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Include_Lista");
		},
		
		modificarconsultor: function (oEvent) {
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
			var FECHA = this.getView().byId("FECHA").getValue();
			var PROGRAMA_NOMBRE = this.getView().byId("PROGRAMA_NOMBRE").getValue();
			var CONSULTOR_CEDULA = this.getView().byId("CONSULTOR_CEDULA").getValue();
			var payLoad = {
				"NOMBRE": NOMBRE,
				"DESCRIPCION": DESCRIPCION,
				"FECHA": FECHA,
				"PROGRAMA_NOMBRE": PROGRAMA_NOMBRE,
				"CONSULTOR_CEDULA": CONSULTOR_CEDULA
			};
			var Model = this.getView().getModel();
			Model.update("/Includes(" + NOMBRE + ")", payLoad, {});
		},
		handleNavButtonPress: function (evt) {
			 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("home");
		},
		/**
		 *@memberOf Hyssoft.Hyssoft.controller.Detail
		 */
		
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