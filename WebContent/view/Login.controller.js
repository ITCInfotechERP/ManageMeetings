sap.ui.controller("ConferenceRoom.view.Login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Login
*/

	  
      
      onLoginTap : function(oEvent) /*function to check userid & password*/
	{
	                
    	  var username = this.byId("uid").getValue();
          var password = this.byId("pasw").getValue();      
	/*the following code checkes whether the entered userid and password are matching*/
	if( username === "fiori_admin"&& password=== "Login@123"){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	    oRouter.navTo("S1");
	}else {
	 sap.m.MessageToast.show("Incorrect username or password");
	}
	}
	

	/*onPressButton:function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	    oRouter.navTo("S1");
	}
*/
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Login
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Login
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Login
*/
//	onExit: function() {
//
//	}

});