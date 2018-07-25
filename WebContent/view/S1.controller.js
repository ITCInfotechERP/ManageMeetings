jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("ConferenceRoom.view.S1", {
	
	
	
onInit:function(){
	
		var that = this;
		var mainModel = this.getOwnerComponent().getModel();
		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent){
		var locationArray = [];
		var finalArray = [];
		var localModel = new sap.ui.model.json.JSONModel();
		that.getView().setModel(localModel,"localModel");
		that.getView().byId("idbookdate").setDateValue(new Date());
	var mParameters = {
			success: function(oData) {
    localModel.setSizeLimit(oData.results.length);
    that.getView().getModel("localModel").setProperty("/mainService",oData.results);
		$.each(oData.results, function(i, el){
	  if($.inArray(el.Location, locationArray) === -1) {
	  locationArray.push(el.Location);
	  }
      });
		finalArray.push({"Location":"Select"});
	$.each(locationArray,function(i,e){
		finalArray.push({"Location":e});
	})
      
      that.getView().getModel("localModel").setProperty("/LocationsData",finalArray);

			},
			error: function(errorResponse) {
			
			},
			async: true
		};
	  mainModel.read("/GeoLocationSet",mParameters);
		},this);
},

//Select Location
onLocationSelect:function(oEvent){
		var that = this;
	var locationSelectedKey = oEvent.getSource().getSelectedKey();
	var oModel = that.getView().getModel("localModel");
	var buildingArray = [];
	var finalArray = [];
	if(locationSelectedKey !== "Select"){
	$.each(oModel.getProperty("/mainService"),function(index,element){
		if(locationSelectedKey === element.Location){
			if($.inArray(element.Building, buildingArray) === -1) {
				buildingArray.push(element.Building);
				  }	
		}
	});	
	$.each(buildingArray,function(i,e){
		finalArray.push({"Building":e})
	});
	that.getView().byId("idBuildingselect").setEnabled(true);
	finalArray.unshift({"Building":"Select"});
	oModel.setProperty("/BuildingData",finalArray);
	}else{
	that.getView().byId("idBuildingselect").setEnabled(false);
	that.getView().byId("idBuildingselect").setSelectedKey("Select");
	that.getView().byId("idroomselect").setEnabled(false);
	that.getView().byId("idroomselect").setSelectedKey("Select");
	}
},

//Select Building
onBuildingSelect:function(oEvent){
		var that = this;
	var buildingSelectedKey = oEvent.getSource().getSelectedKey();
	var buildingEnabled = that.getView().byId("idBuildingselect").getEnabled();
	var oModel = that.getView().getModel("localModel");
	var confRoomArray = [];
	if(buildingSelectedKey !== "Select" && buildingEnabled === true){
	$.each(oModel.getProperty("/mainService"),function(index,element){
		if(buildingSelectedKey === element.Building){
			confRoomArray.push(element);
		}
	});	
	that.getView().byId("idroomselect").setEnabled(true);
	confRoomArray.unshift({"Confroom":"Select"});
	oModel.setProperty("/ConfroomData",confRoomArray);
	}else{
	that.getView().byId("idroomselect").setEnabled(false);
	that.getView().byId("idroomselect").setSelectedKey("Select");
	}
},

//table filter start
handleChangeSearch: function(oEvent) {

var tableId = this.byId("idtable");
var inputValue = oEvent.getSource().getValue();
var trimValue = inputValue.trim();
var filterArr = [];
var items = tableId.getBinding("items");
if(inputValue || inputValue.length>0){
	var filterList=[];
	var filter1 = new sap.ui.model.Filter("Building", sap.ui.model.FilterOperator.Contains, trimValue);
	filterList.push(filter1)
	var filter2 = new sap.ui.model.Filter("Location", sap.ui.model.FilterOperator.Contains, trimValue);
	filterList.push(filter2)
	filterArr.push(new sap.ui.model.Filter(filterList,false));
}

items.filter(filterArr);
},

/*var filter1 = new sap.ui.model.Filter("Building", sap.ui.model.FilterOperator.Contains, trimValue);
var filter2 = new sap.ui.model.Filter("Location", sap.ui.model.FilterOperator.Contains, trimValue);

filterArr = [filter1, filter2];
var finalFilter = new sap.ui.model.Filter({
filters: filterArr,
and: false
});
items.filter(finalFilter);
},*/


//create or book the room
onPressBook:function(){
	var oModel = this.getOwnerComponent().getModel();
	
	var testtitle =this.byId("idinpttitle").getValue();		
	var strttm= this.byId("idtimestart").getValue();
	var endtm= this.byId("idtimeend").getValue();	
	var testlction = this.byId("idlocationselect").getselectedKey;
	var testbldng = this.byId("idBuildingselect").getselectedKey;
	var testroom = this.byId("idroomselect").getselectedKey;		
	var testemail = this.byId("idinputemail").getValue();
	var testcno = this.byId("idinptpn").getValue();
	
	if ( testtitle == "" ){
		sap.m.MessageToast.show("Please enter Title");
		}else if(strttm==""){
			sap.m.MessageToast.show("Please enter Start Time");
			
		}else if(endtm==""){
			sap.m.MessageToast.show("Please enter End Time");			
		}else if(strttm>endtm){
			sap.m.MessageToast.show("End Time must be greater than Start time");			
		}else if( testemail == "" ){
			sap.m.MessageToast.show("Please enter Email Id");
		}else if( testcno == "" ){
			sap.m.MessageToast.show("Please enter Contact Number");
	}else {

	var date = new Date();
	var year = date.getFullYear().toString()
	var month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1).toString():(date.getMonth()+1).toString()
	var day = date.getDate()<10?"0"+date.getDate().toString():date.getDate().toString();
	var createDate = year+month+day;
	var oEntry = {};		
	oEntry.Description =this.byId("idinptdes").getValue();
	oEntry.Userid =this.byId("idinptusr").getText();
	oEntry.Location =this.byId("idlocationselect").getSelectedItem().getProperty("text");
	oEntry.Title =this.byId("idinpttitle").getValue();
	oEntry.Building =this.byId("idBuildingselect").getSelectedItem().getProperty("text");
	oEntry.Contactnum =this.byId("idinptpn").getValue();
	oEntry.Confroom =this.byId("idroomselect").getSelectedItem().getProperty("text");
	oEntry.Starttime =this.byId("idtimestart").getValue().replace(":","")+"00";
	oEntry.Endtime =this.byId("idtimeend").getValue().replace(":","")+"00";
	oEntry.Bookdate =this.byId("idbookdate").getValue().replace("-","").replace("-","");
	oEntry.Createdate=createDate;
	oEntry.Email =this.byId("idinputemail").getValue();	
	
	var sUrl = '/ReservationSet';
	oModel.create(sUrl,oEntry,{
		method: "POST",
		success: function(){sap.m.MessageToast.show("Your Conference Room is Booked Successfully");},
		error: function(){sap.m.MessageToast.show("Failed to Book the Room");}
	});	
	};
	},
	
		
// delete the booked room
	onPressDelete:function(){
		var oModel = this.getOwnerComponent().getModel();
		
		if(this.byId("idtable").getSelectedItem()=== null){
			return sap.m.MessageToast.show("Select Row to Delete");
		}
		var SelectedRowdata = this.byId("idtable").getSelectedItem().getBindingContext().getModel().getProperty(this.byId("idtable").getSelectedItem().getBindingContext().sPath);
		var oEntry = {};		
		oEntry.Description =SelectedRowdata.Description;
		oEntry.Userid =SelectedRowdata.Userid;
		oEntry.Location =SelectedRowdata.Location;
		oEntry.Title =SelectedRowdata.Title;
		oEntry.Building =SelectedRowdata.Building;
		oEntry.Contactnum =SelectedRowdata.Contactnum;
		oEntry.Confroom =SelectedRowdata.Confroom;
		oEntry.Starttime =SelectedRowdata.Starttime;
		oEntry.Endtime =SelectedRowdata.Endtime;
		oEntry.Bookdate =SelectedRowdata.Bookdate;
		oEntry.Createdate =SelectedRowdata.Createdate;
		oEntry.Email =SelectedRowdata.Email;	
		
		if(this.byId("idtable").getSelectedItem()!== null){
			 sap.m.MessageBox.show(
				      "Click Yes to confirm Delete, else No", {
				          icon: sap.m.MessageBox.Icon.INFORMATION,
				          title: "Confirm Delete",
				          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				          onClose: function(oAction) {
				          if(oAction==sap.m.MessageBox.Action.YES){
				     		
		
		var sUrl = "/ReservationSet(Userid='"+oEntry.Userid+"',Location='"+oEntry.Location+"'," +
				"Building='"+oEntry.Building+"',Confroom='"+oEntry.Confroom+"',Starttime='"+oEntry.Starttime+"'," +
				"Endtime='"+oEntry.Endtime+"',Bookdate='"+oEntry.Bookdate+"')";
		oModel.remove(sUrl,{
			
			success: function(){sap.m.MessageToast.show("your Booked Conference Room is Deleted");},
			error: function(){sap.m.MessageToast.show("Failed to Delete the Booked Room");}
		});
		}else{}
}
}
)
}
},
				
		
	
// icon tab button visible	
	handleIconTabBarSelect :function(oEvent){
		var skey = oEvent.getParameter("key"); 
		if (skey == "Reservation") 
		{
			/*this.getView().byId("userPanel").setVisible(false);
			this.getView().byId("iduserdtlform").setVisible(false);*/
			this.getView().byId("idcheckbtn").setVisible(false);
			this.getView().byId("idbookbtn").setVisible(false);
			this.getView().byId("iddeletebtn").setVisible(true);
			this.getView().byId("idprintbtn").setVisible(true);
			this.getView().byId("idmailbtn").setVisible(true);
		
		}
		else
		{
			/*this.getView().byId("userPanel").setVisible(true);
			this.getView().byId("iduserdtlform").setVisible(true);*/
			this.getView().byId("idcheckbtn").setVisible(true);
			this.getView().byId("idbookbtn").setVisible(true);
			this.getView().byId("iddeletebtn").setVisible(false);
			this.getView().byId("idprintbtn").setVisible(false);
			this.getView().byId("idmailbtn").setVisible(false);
		}
	},
	
	//Print Fragment
	onPressPrint: function() {
		this._Dialog = sap.ui.xmlfragment("ConferenceRoom.view.Print",this);
		this._Dialog.open();

	},
	// fragment close
	onClose: function() {
		this._Dialog.close();
	},
	
	//Fragment Print button
	onBtnprintSubmit:function(){
		alert("Print Submitted");
	}

	
	
	
	


});





