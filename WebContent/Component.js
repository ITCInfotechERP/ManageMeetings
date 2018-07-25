jQuery.sap.declare("ConferenceRoom.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

sap.ui.core.UIComponent.extend("ConferenceRoom.Component", {
	
	metadata: {
        "version": "1.0.0",
        "rootView": {
            viewName: "ConferenceRoom.view.Main",
            type: sap.ui.core.mvc.ViewType.XML
        },
        "dependencies": {
            "libs": ["sap.ui.core", "sap.m", "sap.ui.layout"]
        },
        "config" : {
			resourceBundle : "i18n/messageBundle.properties",
			serviceConfig : {
				name : "",
				serviceUrl:"../ConferenceRoom/proxy/sap/opu/odata/sap/ZCONFROOMBOOKING_SRV/" ,

			}, 
		},
        "routing": {
            "config": {
                "routerClass": "sap.m.routing.Router",
                "viewType": "XML",
                "viewPath": "ConferenceRoom.view",
                "controlId": "fioriContent",
                "controlAggregation": "pages"
            },
              "routes": [
                     {
                         "pattern": "",
                         "name": "Login",
                         "target": "Login"
                     },
                     {
                         "pattern": "ConfRoom",
                         "name": "S1",
                         "target": "S1"
                     }
                     
            ],
            "targets": {
                "Login": {
                      "viewName": "Login"
                },
                "S1": {
                    "viewName": "S1"
              }                    
                
            },
        }
    
},
	
	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		var sRootPath = jQuery.sap.getModulePath("ConferenceRoom");

		var oServiceConfig = this.getMetadata().getConfig().serviceConfig;
		var sServiceUrl = oServiceConfig.serviceUrl;
		var mConfig = this.getMetadata().getConfig();
		this._routeMatchedHandler = new sap.m.routing.RouteMatchedHandler(this
				.getRouter(), this._bRouterCloseDialogs);
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : [ sRootPath, mConfig.resourceBundle ].join("/")
		});
		this.setModel(i18nModel, "i18n");
		// setting up model
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl,{json:true,useBatch:true});
		this.setModel(oModel);

		this.getRouter().initialize();
	},

	exit : function() {
		this._routeMatchedHandler.destroy();
	},
	setRouterSetCloseDialogs : function(bCloseDialogs) {
		this._bRouterCloseDialogs = bCloseDialogs;
		if (this._routeMatchedHandler) {
			this._routeMatchedHandler.setCloseDialogs(bCloseDialogs);
		}
	},

});