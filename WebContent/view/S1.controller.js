jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("ConferenceRoom.util.Formatter");
sap.ui.core.mvc.Controller.extend("ConferenceRoom.view.S1", {
	
	
	
onInit:function(){
	
		var that = this;
		var mainModel = this.getOwnerComponent().getModel();
		sap.ui.core.UIComponent.getRouterFor(that).attachRouteMatched(that.handleRouteMatch,that)
},

handleRouteMatch:function(){
	var that = this;
	var mainModel = this.getOwnerComponent().getModel();
	
		var locationArray = [];
		var finalArray = [];
		var localModel = new sap.ui.model.json.JSONModel();
		
		that.getView().setModel(localModel,"localModel");
		that.getView().byId("idstartdate").setDateValue(new Date());
		/*that.getView().byId("idbookdate").setDateValue(new Date());*/
	var mParameters = {
			success: function(oData) {
   
    that.getView().getModel("localModel").setProperty("/mainService",oData.results);
		$.each(oData.results, function(i, el){
	  if($.inArray(el.Location, locationArray) === -1) {
	  locationArray.push(el.Location);
	  }
      });
		finalArray.push({"Location":"Select"});
	$.each(locationArray,function(i,e){
		finalArray.push({"Location":e});
	});
      that.getView().getModel("localModel").setProperty("/LocationsData",finalArray);
			},
			error: function(errorResponse) {
			
			},
			async: true
		};
	  mainModel.read("/GeoLocationSet",mParameters);
	  that.getView().getModel("localModel").setProperty("/BookBtn",false); 
	  that.getView().getModel("localModel").setProperty("/BookBtnenabled",false); 
	   that.getView().getModel("localModel").setProperty("/DeleteBtn",false);
	   that.getView().byId("idlocationselect").setSelectedKey("Select");
	   that.getView().byId("idBuildingselect").setSelectedKey("Select");
	   that.getView().byId("idroomselect").setSelectedKey("Select");
	   var afilters = [];
	   var userFilter = new sap.ui.model.Filter({
		   path:"Userid",
		   operator:sap.ui.model.FilterOperator.EQ,
		   value1:"FIORI_ADMIN"
		   });
	   afilters.push(userFilter);
		var mParameters = {
				filters:afilters,
				success: function(oData) {
					
					that.getView().getModel("localModel").setProperty("/tableData",oData.results);
					
				},
				error: function(errorResponse) {
				
				},
				async: true
			};
		  mainModel.read("/ReservationSet",mParameters);
		  that.getView().byId("idinpttitle").setValue("");
		  that.getView().byId("idtimestart").setValue("");
		  that.getView().byId("idtimeend").setValue("");
		  that.getView().byId("idinptdes").setValue("");
		  that.getView().byId("idlocationselect").setSelectedKey("Select");
		  that.getView().byId("idBuildingselect").setSelectedKey("Select");
		  that.getView().byId("idroomselect").setSelectedKey("Select"); 
		  that.getView().byId("idinputemail").setValue("");
		  that.getView().byId("idinptpn").setValue("");  
		  that.getView().byId("idcheckbox").getSelected(false);
		  
		 
},


//Select Location
onLocationSelect:function(oEvent){
		var that = this;
	var locationSelectedKey = oEvent.getSource().getSelectedKey();
		if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" 
			|| this.getView().byId("idroomselect").getSelectedKey() === "Select"){
	 that.getView().getModel("localModel").setProperty("/BookBtn",false); 
	}else{
	 that.getView().getModel("localModel").setProperty("/BookBtn",true); 	
	}
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
		if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue()||
	 this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Select")
		{
	 that.getView().getModel("localModel").setProperty("/BookBtn",false); 
	}else{
	 that.getView().getModel("localModel").setProperty("/BookBtn",true); 	
	}
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

//Check Room Availability
onPressCheck:function(){
		var that=this;
var oModel = that.getOwnerComponent().getModel();

var strtdte =this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
var enddte =this.getView().byId("idbookdate").getValue().replace("-","").replace("-","");
var dt = new Date();
var yr = dt.getFullYear().toString()
var mnth = (dt.getMonth()+1)<10?"0"+(dt.getMonth()+1).toString():(dt.getMonth()+1).toString()
var dy = dt.getDate()<10?"0"+dt.getDate().toString():dt.getDate().toString();
var crtdte = yr+mnth+dy;
var a= this.getView().byId("idcheckbox").getSelected();

var strttm =this.getView().byId("idtimestart").getValue().replace(":","").replace(" ","");
if(strttm.includes("AM")){
	strttm = strttm.replace("AM","00");
	}else{
	var hrs= strttm.slice(0,2);
	if(parseInt(hrs) < 12){
		hrs=parseInt(hrs)+12;
	
		if(hrs===24){
			hrs="00"
		}	
	}
	strttm = strttm.replace("PM","00").replace(/^.{2}/g, hrs.toString());
}

var endtm =this.getView().byId("idtimeend").getValue().replace(":","").replace(" ","");
if(endtm.includes("AM")){
	endtm = endtm.replace("AM","00");
	}else{
	var hrs= endtm.slice(0,2);
	if(parseInt(hrs) < 12){
		hrs=parseInt(hrs)+12;
	
		if(hrs===24){
			hrs="00"
		}	
	}
	endtm = endtm.replace("PM","00").replace(/^.{2}/g, hrs.toString());
}

if(strtdte<crtdte){
	sap.m.MessageToast.show("This day no longer exist");
}
//
else if(a===true && strtdte>enddte){
	sap.m.MessageToast.show("Enddate should not be lessthan StartDate");
	
}

else if(a===false && strttm>endtm){
	sap.m.MessageToast.show("End Time should be greater than Start time");			
}
else{
	
	
var date = new Date();
var year = date.getFullYear().toString()
var month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1).toString():(date.getMonth()+1).toString()
var day = date.getDate()<10?"0"+date.getDate().toString():date.getDate().toString();
var createDate = year+month+day;
var Description =this.getView().byId("idinptdes").getValue();
var Userid =this.getView().byId("idinptusr").getText();
var Location =this.getView().byId("idlocationselect").getSelectedItem().getProperty("text");
var Title =this.getView().byId("idinpttitle").getValue();
var Building =this.getView().byId("idBuildingselect").getSelectedItem().getProperty("text");
var Confroom =this.getView().byId("idroomselect").getSelectedItem().getProperty("text");
var Starttime =this.getView().byId("idtimestart").getValue().replace(":","").replace(" ","");

if(Starttime.includes("AM")){
	Starttime = Starttime.replace("AM","00");
	}else{
	var hrs= Starttime.slice(0,2);
	if(parseInt(hrs) < 12){
		hrs=parseInt(hrs)+12;
	
		if(hrs===24){
			hrs="00"
		}	
	}
		Starttime = Starttime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
}
var Endtime =this.getView().byId("idtimeend").getValue().replace(":","").replace(" ","");

if(Endtime.includes("AM")){
	Endtime = Endtime.replace("AM","00");
	}else{
	var hrs= Endtime.slice(0,2);
	if(parseInt(hrs) < 12){
		hrs=parseInt(hrs)+12;
	
		if(hrs===24){
			hrs="00"
		}	
	}
	Endtime = Endtime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
}
var Startdate =this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
var Enddate =this.getView().byId("idbookdate").getValue().replace("-","").replace("-","");
var Createdate=createDate;
var Email =this.getView().byId("idinputemail").getValue();	

var sUrl = "/CheckRoomAvailability?startdate='"+Startdate+"'&enddate='"+Enddate+"'&starttime='"+Starttime+"'&endtime='"+Endtime+"'&location='"+Location+"'&building='"+Building+"'&confroom='"+Confroom+"'" ;

oModel.read(sUrl,{		
		success: function(response){			
			sap.m.MessageToast.show("You can Book This Room");			
			that.getView().getModel("localModel").setProperty("/BookBtnenabled",true);
		},
		error: function(oError){		
				sap.m.MessageToast.show("This Room is Not Available");
				that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
			}
	});	
}
},

//book room
onPressBook:function(){
	var that=this;
	var oModel = that.getOwnerComponent().getModel();
	
	var date = new Date();
	var year = date.getFullYear().toString()
	var month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1).toString():(date.getMonth()+1).toString()
	var day = date.getDate()<10?"0"+date.getDate().toString():date.getDate().toString();
	var createDate = year+month+day;
	var Starttime=this.getView().byId("idtimestart").getValue().replace(":","").replace(" ","");

	if(Starttime.includes("AM")){
		Starttime = Starttime.replace("AM","00");
		}else{
		var hrs= Starttime.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
			Starttime = Starttime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}
	var Endtime= this.getView().byId("idtimeend").getValue().replace(":","").replace(" ","");
		if(Endtime.includes("AM")){
			Endtime = Endtime.replace("AM","00");
			}else{
			var hrs= Endtime.slice(0,2);
			if(parseInt(hrs) < 12){
				hrs=parseInt(hrs)+12;
			
				if(hrs===24){
					hrs="00"
				}	
			}
			Endtime = Endtime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
		}
	/*var year= date.getFullYear();
	var month=(date.getMonth()+1)<10?0+(date.getMonth()+1):(date.getMonth()+1);
	var day = date.getDate()<10?"0"+date.getDate():date.getDate();
	var createDate = year+month+day;*/
	
	var oEntry = {};		
	oEntry.Description =this.getView().byId("idinptdes").getValue();
	oEntry.Userid =this.getView().byId("idinptusr").getText();
	oEntry.Startdate =this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
	oEntry.Enddate =this.getView().byId("idbookdate").getValue().replace("-","").replace("-","");
	oEntry.Createdate=createDate;
	oEntry.Starttime =Starttime;
	oEntry.Endtime =Endtime;
	oEntry.Location =this.getView().byId("idlocationselect").getSelectedItem().getProperty("text");
	oEntry.Title =this.getView().byId("idinpttitle").getValue();
	oEntry.Building =this.getView().byId("idBuildingselect").getSelectedItem().getProperty("text");
	oEntry.Contactnum =this.getView().byId("idinptpn").getValue();
	oEntry.Confroom =this.getView().byId("idroomselect").getSelectedItem().getProperty("text");
	/*oEntry.Starttime =this.getView().byId("idtimestart").getValue().replace(":","")+"00";
	oEntry.Endtime =this.getView().byId("idtimeend").getValue().replace(":","")+"00";*/
	oEntry.Email =this.getView().byId("idinputemail").getValue();	
	oEntry.Alldayevent=this.getView().byId("idcheckbox").getSelected();
	
	var stdate=this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
	
	if(stdate!== null){
		 sap.m.MessageBox.show(
			      "Click Yes to confirm Booking, else No", {
			          icon: sap.m.MessageBox.Icon.INFORMATION,
			          title: "Confirm Booking",
			          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
			          onClose: function(oAction) {
			          if(oAction==sap.m.MessageBox.Action.YES){
	
	var sUrl = '/ReservationSet';
	oModel.create(sUrl,oEntry,{
		method: "POST",
		success: function(response){
			sap.m.MessageToast.show("Your Conference Room is Booked Successfully");
		that.handleRouteMatch()},
		error: function(oError){
			sap.m.MessageToast.show("Failed to Book the Room");}
	});	
	}
	}})
	}
},


			
// delete room
onPressDelete:function(){
		var that=this;
		var oModel = that.getOwnerComponent().getModel();
		
		if(this.getView().byId("idtable").getSelectedItem()=== null){
			return sap.m.MessageToast.show("Select Row to Delete");
		}
		var SelectedRowdata = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
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
		oEntry.Startdate =SelectedRowdata.Startdate;
		oEntry.Enddate =SelectedRowdata.Enddate;
		oEntry.Createdate =SelectedRowdata.Createdate;
		oEntry.Email =SelectedRowdata.Email;	
		
		if(this.getView().byId("idtable").getSelectedItem()!== null){
			 sap.m.MessageBox.show(
				      "Click Yes to confirm Delete, else No", {
				          icon: sap.m.MessageBox.Icon.INFORMATION,
				          title: "Confirm Delete",
				          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				          onClose: function(oAction) {
				          if(oAction==sap.m.MessageBox.Action.YES){
				     		
		
		var sUrl = "/ReservationSet(Userid='"+oEntry.Userid+"',Location='"+oEntry.Location+"'," +
				"Building='"+oEntry.Building+"',Confroom='"+oEntry.Confroom+"',Starttime='"+oEntry.Starttime+"'," +
				"Endtime='"+oEntry.Endtime+"',Startdate='"+oEntry.Startdate+"',Enddate='"+oEntry.Enddate+"')";
		oModel.remove(sUrl,{
			
			success: function(){
				sap.m.MessageToast.show("your Booked Conference Room is Deleted");
				that.handleRouteMatch()},
			error: function(){
				sap.m.MessageToast.show("Failed to Delete the Booked Room");}
		});
		}else{
		}
}})
}
},


//update fragment open
onPressUpdate:function(){
	var that = this;
	var SelectedRowdata = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
	getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
		
	var updateBookingData = [];
	updateBookingData.push(SelectedRowdata);
	
//	this.updateBookingData = updateBookinData;

	this.sUpdateUrl = "/ReservationSet(Userid='"+updateBookingData[0].Userid+"',Location='"+updateBookingData[0].Location+"'," +
	"Building='"+updateBookingData[0].Building+"',Confroom='"+updateBookingData[0].Confroom+"',Starttime='"+updateBookingData[0].Starttime+"'," +
	"Endtime='"+updateBookingData[0].Endtime+"',Startdate='"+updateBookingData[0].Startdate+"',Enddate='"+updateBookingData[0].Enddate+"')";
	
	var localModel = that.getView().getModel("localModel");
	var dialogModel = new sap.ui.model.json.JSONModel();
	dialogModel.setData({"dialogArray":updateBookingData});
	if(!this._Dialog){
		this._Dialog = sap.ui.xmlfragment("ConferenceRoom.view.Fragment.Update",this);
		sap.ui.getCore().byId("idlocationselectfrag").setModel(localModel,"localModel");
			sap.ui.getCore().byId("idBuildingselectfrag").setModel(localModel,"localModel");
				sap.ui.getCore().byId("idroomselectfrag").setModel(localModel,"localModel");
		this._Dialog.setModel(dialogModel).open();	
	}else{
			sap.ui.getCore().byId("idlocationselectfrag").setModel(localModel,"localModel");
			sap.ui.getCore().byId("idBuildingselectfrag").setModel(localModel,"localModel");
				sap.ui.getCore().byId("idroomselectfrag").setModel(localModel,"localModel");
		this._Dialog.setModel(dialogModel).open();	
	}
		
},
//Update fragment close
onClose: function() {
	this._Dialog.close();
},

//Submit updated room
onBtnupdateSubmit:function(){
	
	var that=this;
	var oModel = that.getOwnerComponent().getModel();
	//validations
	var strtdte =sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-","");
	var enddte =sap.ui.getCore().byId("idenddtefrag").getValue().replace("-","").replace("-","");
	var dt = new Date();
	var yr = dt.getFullYear().toString()
	var mnth = (dt.getMonth()+1)<10?"0"+(dt.getMonth()+1).toString():(dt.getMonth()+1).toString()
	var dy = dt.getDate()<10?"0"+dt.getDate().toString():dt.getDate().toString();
	var crtdte = yr+mnth+dy;
	var b= sap.ui.getCore().byId("idcheckboxfrag").getSelected();

	var strttm =sap.ui.getCore().byId("idtimestartfrag").getValue().replace(":","").replace(" ","");
	if(strttm.includes("AM")){
		strttm = strttm.replace("AM","00");
		}else{
		var hrs= strttm.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		strttm = strttm.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}

	var endtm =sap.ui.getCore().byId("idtimeendfrag").getValue().replace(":","").replace(" ","");
	if(endtm.includes("AM")){
		endtm = endtm.replace("AM","00");
		}else{
		var hrs= endtm.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		endtm = endtm.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}

	if(strtdte<crtdte){
		sap.m.MessageToast.show("This day no longer exist");
	}
	
	else if(strtdte>enddte){
		sap.m.MessageToast.show("Enddate should not be lessthan StartDate");
		
	}

	else if(b===false && strttm>endtm){
		sap.m.MessageToast.show("End Time should be greater than Start time");			
	}
	else{
	// end validations
	
	var date = new Date();
	var year = date.getFullYear().toString()
	var month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1).toString():(date.getMonth()+1).toString()
	var day = date.getDate()<10?"0"+date.getDate().toString():date.getDate().toString();
	var createDate = year+month+day;
	var Starttime=sap.ui.getCore().byId("idtimestartfrag").getValue().replace(":","").replace(" ","");
	if(Starttime.includes("AM")){
		Starttime = Starttime.replace("AM","00");
		}else{
		var hrs= Starttime.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
			Starttime = Starttime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}
	var Endtime= sap.ui.getCore().byId("idtimeendfrag").getValue().replace(":","").replace(" ","");
		if(Endtime.includes("AM")){
			Endtime = Endtime.replace("AM","00");
			}else{
			var hrs= Endtime.slice(0,2);
			if(parseInt(hrs) < 12){
				hrs=parseInt(hrs)+12;
			
				if(hrs===24){
					hrs="00"
				}	
			}
			Endtime = Endtime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
		}

	
	var oEntry = {};	
	oEntry.Description =this.getView().byId("idinptdes").getValue();
	oEntry.Userid =this.getView().byId("idinptusr").getText();
	oEntry.Startdate =sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-","");
	oEntry.Enddate =sap.ui.getCore().byId("idenddtefrag").getValue().replace("-","").replace("-","");
	oEntry.Createdate=createDate;
	oEntry.Starttime =Starttime;
	oEntry.Endtime =Endtime;
	oEntry.Location =sap.ui.getCore().byId("idlocationselectfrag").getSelectedItem().getProperty("text");
	oEntry.Title =sap.ui.getCore().byId("idinputtitlefrag").getValue();
	oEntry.Building =sap.ui.getCore().byId("idBuildingselectfrag").getSelectedItem().getProperty("text");
	oEntry.Contactnum =sap.ui.getCore().byId("idconnumfrag").getValue();
	oEntry.Confroom =sap.ui.getCore().byId("idroomselectfrag").getSelectedItem().getProperty("text");
	oEntry.Email =sap.ui.getCore().byId("idmailfrag").getValue();
	oEntry.Alldayevent=sap.ui.getCore().byId("idcheckboxfrag").getSelected();
		
//	var sUrl = "/ReservationSet(Userid='"+this.updateBookingData[0].Userid+"',Location='"+this.updateBookingData[0].Location+"'," +
//	"Building='"+this.updateBookingData[0].Building+"',Confroom='"+this.updateBookingData[0].Confroom+"',Starttime='"+this.updateBookingData[0].Starttime+"'," +
//	"Endtime='"+this.updateBookingData[0].Endtime+"',Startdate='"+this.updateBookingData[0].Startdate+"',Enddate='"+this.updateBookingData[0].Enddate+"')";
	
	oModel.update(this.sUpdateUrl,oEntry,{
		
		success: function(response){
			sap.m.MessageToast.show("Your Conference Room details are Updated");
		that.handleRouteMatch()},
		error: function(oError){
			sap.m.MessageToast.show("Failed to update the Room Details");}
	});
}
},



//Table Search Filter
handleChangeSearch: function(oEvent) {
	   var tableId = this.getView().byId("idtable");
	   var inputValue = oEvent.getParameter("query");
	   var trimValue = inputValue.trim();
	   var filterArr = [];
	   var items = tableId.getBinding("items");
	   var filter1 = new sap.ui.model.Filter("Building", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter2 = new sap.ui.model.Filter("Location", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter3 = new sap.ui.model.Filter("Confroom", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter4 = new sap.ui.model.Filter("Createdate", sap.ui.model.FilterOperator.Contains, trimValue);
	   /*var filter5 = new sap.ui.model.Filter("Enddate", sap.ui.model.FilterOperator.Contains, trimValue);*/
	   var filter6 = new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.Contains, trimValue);
	   filterArr = [filter1, filter2, filter3, filter4, filter6];

	   var finalFilter = new sap.ui.model.Filter({
	    filters: filterArr,
	    and: false
	   });
	   items.filter(finalFilter);
	  },
	  
// Table Row select Confirmation
onTableSelected:function(oEvt){
	var that = this;
	var rowSelected = oEvt.getSource().getSelectedItem();
	if(rowSelected.length !== 0){
  that.getView().getModel("localModel").setProperty("/DeleteBtn",true); 	
	}else{
that.getView().getModel("localModel").setProperty("/DeleteBtn",false); 		
	}
},

//Table Sorting
onpresssorter:function(){
	this._oDialog = sap.ui.xmlfragment("ConferenceRoom.view.Fragment.sort",this);
	this._oDialog.open();
jQuery.sap.syncStyleClass("sapUiSizeCompact",this.getView(),this._oDialog);
},

handleConfirm:function(oEvent){	 
	var oView = this.getView();
	var oTable = oView.byId("idtable");

	var mParams = oEvent.getParameters();
	var oBinding = oTable.getBinding("items");
	
	//var vGroup;
	var sPath;
	var bDescending;	
	var aSorters = [];	
	
	sPath = mParams.sortItem.getKey();
	bDescending = mParams.sortDescending;
	aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
	oBinding.sort(aSorters);	
},

// Title Validation 
	Validation: function(oEvt){
		var that = this;
		if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Select"){
			that.getView().getModel("localModel").setProperty("/BookBtn",false); 
		}else{
		that.getView().getModel("localModel").setProperty("/BookBtn",true); 	
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
			this.getView().byId("idupdatebtn").setVisible(true);
		
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
			this.getView().byId("idupdatebtn").setVisible(false);
		}
	},
	
//Print Fragment open
	/*onPressPrint: function() {
		var SelectedRowdata = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
		
		var array = [];
		array.push(SelectedRowdata);
		var dialogModel = new sap.ui.model.json.JSONModel();
		dialogModel.setData({"dialogArray":array});
		if(!this._Dialog){
			this._Dialog = sap.ui.xmlfragment("ConferenceRoom.view.Fragment.Print",this);
			//sap.ui.getCore().byId("id1").setText("")
			this._Dialog.setModel(dialogModel).open();	
		}else{
			this._Dialog.setModel(dialogModel).open();	
		}
		},
		*/
// print fragment close
	/*onClose: function() {
		this._Dialog.close();
	},*/
	
		
//Print page open
	/*onBtnprintSubmit:function(){	
		
		            var printContents = document.getElementById("idprintform").innerHTML;
		             var win = window.open("", "PrintWindow");
		             win.document.write("<div class='page'>" + printContents + "</div>");
		             win.print();
		                  
		      },*/	
onPressPrint:function(){  
        
	      /*                var printContents = document.getElementById("idprintform").innerHTML;*/
		var selectedrow = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
		
		var header ="<center><table  style = 'padding-left: 100px; border: 2px solid grey;' width = '95%'>" +
      "<center><h1 ><u>Conference Room Booking Details</h1></u> </center>" +
                                      "<tr><td><p  style = 'padding-top: 18px;'><b>User Name   :</p></b></td> <td style ='padding-top: 18px; padding-left: 100px;'>" + selectedrow.Userid + 
                                       "</td><tr>" + "<tr><td><p style = 'padding-top: 18px;'><b>Title   :</p></b></td><td style ='padding-top: 18px; padding-left: 100px;'> " + selectedrow.Title+ 
                                       "</td></tr><tr>" + "<td><p style = 'padding-top: 18px;'><b>Created Date   :</p></b></td><td style ='padding-top: 18px; padding-left: 100px;'>" + ConferenceRoom.util.Formatter.changeDateFormat(selectedrow.Createdate)+
                                       "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Meeting Start Date   :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>" + ConferenceRoom.util.Formatter.changeDateFormat(selectedrow.Startdate) + 
                                      "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Meeting End Date   :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>" + ConferenceRoom.util.Formatter.changeDateFormat(selectedrow.Enddate) + 
                                       "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Meeting Start Time   :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>"  + ConferenceRoom.util.Formatter.changeTimeFormat(selectedrow.Starttime) +
                                      "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Meeting End Time   :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>" + ConferenceRoom.util.Formatter.changeTimeFormat(selectedrow.Endtime) + 
                                       "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Location   :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'> " + selectedrow.Location +
                                      "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Building   :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>" + selectedrow.Building +
                                      "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Conference Room   :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>" + selectedrow.Confroom +
                                      "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>E-Mail  :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>" + selectedrow.Email +
                                      "</td></tr><tr><td><p style = 'padding-top: 18px;'><b>Contact Number  :</p></b></td><td style ='padding-top: 18px;padding-left: 100px;'>" + selectedrow.Contactnum +
                                      "</td></tr><tr><td><p style = 'padding-top: 18px;padding-bottom: 10px;'><b>Meeting Description  :</p></b></td><td style ='padding-bottom: 10px;padding-top: 18px;padding-left: 100px;'>" + selectedrow.Description + 
      "</td></tr> </table><center> <br>";
        
	        var ctrlString = "width = 500px, height = 600px";	        
	        var win = window.open("", "PrintWindow", ctrlString);
	        win.document.write("<div class='page'>" + header + "</div>");
	        win.print();
	        win.close();  
	      },

	
//send Email Button
	      onPressEmail:function(){
	  		var selectedrow = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
	  		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
	  		
	  		var a="Hi Team,"+"\n"+"\n";
	  		a=a+"Title			:  "+ selectedrow.Title+"\n";
	  		a=a+"Created Date		:  " + ConferenceRoom.util.Formatter.changeDateFormat(selectedrow.Createdate)+"\n";
	  		a=a+"Meeting Start Date	:  " + ConferenceRoom.util.Formatter.changeDateFormat(selectedrow.Startdate)+"\n";
	  		a=a+"Meeting End Date   	:  " + ConferenceRoom.util.Formatter.changeDateFormat(selectedrow.Enddate)+"\n";
	  		a=a+"Meeting Start Time	:  " + ConferenceRoom.util.Formatter.changeTimeFormat(selectedrow.Starttime)+"\n";
	  		a=a+"Meeting End Time	:  " + ConferenceRoom.util.Formatter.changeTimeFormat(selectedrow.Endtime)+"\n";
	  		a=a+"Location		:  " + selectedrow.Location+"\n";
	  		a=a+"Building		:  " + selectedrow.Building+"\n";
	  		a=a+"Conference Room	:  " + selectedrow.Confroom+"\n";
	  		a=a+"Contact Number	:  " + selectedrow.Contactnum+"\n";
	  		a=a+"Description		:  " + selectedrow.Description+"\n"+"\n"+"\n";
	  		a=a+"Thanks & Regards,"
	  		
	  				
	  		sap.m.URLHelper.triggerEmail(selectedrow.Email, "Conference Room Booking Details", a);
	  	},
	  	
	  	
	
// Event Check Box
handleSelect : function(oEvent) {
	
	var a= oEvent.getSource().getSelected();
	
	
	if(a===true){
	this.getView().byId("idbookdate").setEnabled(true);
	this.getView().byId("idtimestart").setEnabled(false);	
	this.getView().byId("idtimeend").setEnabled(false);
	this.getView().byId("idtimestart").setValue("00:01 AM");
	this.getView().byId("idtimeend").setValue("11:59 PM");
	this.getView().byId("idbookdate").setDateValue(new Date());
	/*var startdate = this.getView().byId("idstartdate").getValue();
	var enddate =  this.getView().byId("idstartdate").getValue();
	if(startdate<enddate){
		sap.m.MessageToast.show("End date must be Greater than startdate");
		
	}*/
		
	}else {
		this.getView().byId("idbookdate").setEnabled(false);	
		this.getView().byId("idtimestart").setEnabled(true);	
		this.getView().byId("idtimeend").setEnabled(true);
		this.getView().byId("idbookdate").setValue("");
		/*var dte= new Date();
		var yr=dte.getFullYear();
		var mnt=dte.getMonth();
		var dy=dte.getDate();
		var nwdte=yr+mnt+dy;*/
		
		/*this.getView().byId("idbookdate").setValue("");*/
		/*this.getView().byId("idbookdate").setDateValue(new Date());*/
		}

},

handleSelectfrag:function(oEvent){
var b= oEvent.getSource().getSelected();
var selectedrow = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);

		
	if(b===true){
	sap.ui.getCore().byId("idenddtefrag").setEnabled(true);
	sap.ui.getCore().byId("idtimestartfrag").setValue(selectedrow.Starttime);	
	sap.ui.getCore().byId("idtimeendfrag").setValue(selectedrow.Endtime);
	sap.ui.getCore().byId("idtimestartfrag").setEnabled(false);	
	sap.ui.getCore().byId("idtimeendfrag").setEnabled(false);
	
	
			
	}else {
		sap.ui.getCore().byId("idenddtefrag").setEnabled(true);	
		sap.ui.getCore().byId("idtimestartfrag").setEnabled(true);	
		sap.ui.getCore().byId("idtimeendfrag").setEnabled(true);
		sap.ui.getCore().byId("idtimestartfrag").setValue(selectedrow.Starttime);	
		sap.ui.getCore().byId("idtimeendfrag").setValue(selectedrow.Endtime);
		
		sap.ui.getCore().byId("idenddtefrag").setValue(selectedrow.Enddate);
/*		sap.ui.getCore().byId("idtimestartfrag").setValue("SelectedRowdata.Starttime");
		sap.ui.getCore().byId("idtimeendfrag").setValue("SelectedRowdata.Starttime");*/
		
		
		}
	
}


	
	


});