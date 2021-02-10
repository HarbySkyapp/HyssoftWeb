function initModel() {
	var sUrl = "/OdataHyssoft/xsodata/Hyssoft.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}