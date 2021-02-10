sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Soportes_Detail", {

	onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Soportes_detail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/Soporte(" + oArgs.TICKET + ")",
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
			var empnit = Empresas["TICKET_TICKET"];
			Model.remove("/Soporte(" + empnit + ")", true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Soportes_Lista");
		},
		
		modificarconsultor: function (oEvent) {
			var FECHA = this.getView().byId("FECHA").getValue();
			var TIPOSOPORTE = this.getView().byId("TIPOSOPORTE").getValue();
			var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
			var SOLUCION = this.getView().byId("SOLUCION").getValue();
			var HORAS= this.getView().byId("HORAS").getValue();
			var TICKET_TICKET= this.getView().byId("TICKET_TICKET").getValue();
			var CONSULTOR_CEDULA= this.getView().byId("CONSULTOR_CEDULA").getValue();
			var PROGRAMA_NOMBRE= this.getView().byId("PROGRAMA_NOMBRE").getValue();
			var payLoad = {
				"FECHA": FECHA,
				"TIPOSOPORTE": TIPOSOPORTE,
				"DESCRIPCION": DESCRIPCION,
				"SOLUCION": SOLUCION,
				"HORAS":  HORAS,
				"TICKET_TICKET": TICKET_TICKET,
				"CONSULTOR_CEDULA":  CONSULTOR_CEDULA,
				"PROGRAMA_NOMBRE":  PROGRAMA_NOMBRE
			};
			var Model = this.getView().getModel();
			Model.update("/Soporte('" + TICKET_TICKET + "')", payLoad, {});
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