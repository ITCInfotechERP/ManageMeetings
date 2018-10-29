/*jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("ConferenceRoom.util.Formatter");
sap.ui.core.mvc.Controller.extend("ConferenceRoom.view.S1", {*/
	
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"ConferenceRoom/util/Formatter",
	"sap/m/MessageBox",
	"ConferenceRoom/util/columns",
	"sap/m/TablePersoController"
	
], function(Controller, JSONModel,Formatter, MessageBox,columns,TablePersoController) {
	"use strict";
	//var z=0;
	return Controller.extend("ConferenceRoom.controller.S1", {	
		
		Formatter: Formatter,
			
	/*	presslink:function(oEvent){
			if(z==5){
				this.getView().byId("idlink").setHref("");
				alert("maximum reached");
			}else{
				z++;
				}
		},*/
	
onInit:function(){
	/*var oModel = new JSONModel(this._data);
	this.getView().setModel(oModel);*/
	
		var that = this;
		var mainModel = this.getOwnerComponent().getModel();
		sap.ui.core.UIComponent.getRouterFor(that).attachRouteMatched(that.handleRouteMatch,that)
		//that.handleRouteMatch();
},

/*onInit:function(){
	var that = this;
	var mainModel = this.getOwnerComponent().getModel();
	sap.ui.core.UIComponent.getRouterFor(that).attachRouteMatched(that.handleRouteMatch,that)
},
*/
handleRouteMatch:function(){
	var that = this;
	var mainModel = this.getOwnerComponent().getModel();
	
		var locationArray = [];
		var buildingArray = [];
		var roomArray=[];
		var finalArray = [];
		var finalbulArray = [];
		var finalroomArray = [];
		
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
		$.each(oData.results, function(i, el){
			   if($.inArray(el.Building, buildingArray) === -1) {
				  buildingArray.push(el.Building);
				  }
		      });
		$.each(oData.results, function(i, el){
			   if($.inArray(el.Confroom, roomArray) === -1) {
				   roomArray.push(el.Confroom);
				  }
		      });
		/*finalArray.push({"Location":"Select"});
		finalbulArray.push({"Building":"Select"});*/
	$.each(locationArray,function(i,e){
		finalArray.push({"Location":e});
	});
	$.each(buildingArray,function(i,e){
		finalbulArray.push({"Building":e});
	});
	$.each(roomArray,function(i,e){
		finalroomArray.push({"Confroom":e});
	});
	finalroomArray.unshift({"Confroom":"Select"});
	finalroomArray.push({"Confroom":"Others"});
      that.getView().getModel("localModel").setProperty("/LocationsData",finalArray);
      that.getView().getModel("localModel").setProperty("/BuildingData",finalbulArray);
      that.getView().getModel("localModel").setProperty("/ConfroomData",finalroomArray);
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
	 
	  
	   //var userId=document.getElementById("username").value.toUpperCase() //add user
	   //that.getView().getModel("localModel").setProperty("/userId",userId); 
	   var afilters = [];
	   var userFilter = new sap.ui.model.Filter({
		   path:"Userid",
		   operator:sap.ui.model.FilterOperator.EQ,
		  value1:"FIORI_ADMIN" //assign user
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
		  /*that.getView().byId("idlocationselect").setSelectedKey("Select");
		  that.getView().byId("idBuildingselect").setSelectedKey("Select");*/
		  that.getView().byId("idroomselect").setSelectedKey("Select"); 
		  /*that.getView().byId("idinputemail").setValue("");*/
		  that.getView().byId("idinptpn").setValue("");  
		  that.getView().byId("idcheckbox").setSelected(false);
		  that.getView().byId("idbookdate").setValue();
		  that.getView().byId("idbookdate").setEnabled(false);
		  that.getView().byId("idtimestart").setEnabled(true);
		  that.getView().byId("idtimeend").setEnabled(true);
		 /*that.getView().byId("idlocationselectall").setSelectedKey("Select");
          that.getView().byId("idBuildingselectall").setSelectedKey("Select");*/
          that.getView().byId("idroomselectall").setSelectedKey("Select");
          that.getView().byId("PC1").setVisible(false);
          that.getView().byId("idcustominpt").setValue();
          that.getView().byId("idcustominpt").setVisible(false);
          
          that.getView().byId("idinputall").setValue();
          that.getView().byId("idinputall").setVisible(false);
          that.getView().byId("idcheckbox").setEnabled(true);
          	that.getView().byId("idreccheck").setSelected(false);
          	that.getView().byId("idreccheck").setEnabled(true);
			that.getView().byId("idlblstartdate").setText("Start Date");
			that.getView().byId("idlblbookdate").setText("End Date");
			that.getView().byId("idradio1").setVisible(false);
			that.getView().byId("idradio2").setVisible(false);
			that.getView().byId("idradio1").setSelected(false);
			that.getView().byId("idradio2").setSelected(false);
					
			that.getView().byId("idradiodaily1").setVisible(false);
			that.getView().byId("idradiodaily2").setVisible(false);
			that.getView().byId("iddailyinput").setVisible(false);
			that.getView().byId("iddailyinput").setValue("1");
			that.getView().byId("idtxtinput").setVisible(false);
			that.getView().byId("idweektext").setVisible(false);
			that.getView().byId("idtextweek").setVisible(false);
			that.getView().byId("idtextweek").setValue("1");
			that.getView().byId("idtextweekon").setVisible(false);
			that.getView().byId("idsun").setVisible(false);
			that.getView().byId("idmon").setVisible(false);
			that.getView().byId("idtue").setVisible(false);
			that.getView().byId("idwed").setVisible(false);
			that.getView().byId("idthu").setVisible(false);
			that.getView().byId("idfri").setVisible(false);
			that.getView().byId("idsat").setVisible(false);
          
         //var confRoomArray=[];
         /* $.each(that.getView().getModel("localModel").getProperty("/mainService"),function(index,element){
      		if(buildingSelectedKey === element.Building){
      			confRoomArray.push(element);
      		}
      	});	
      	that.getView().byId("idroomselect").setEnabled(true);*/
      	//confRoomArray.unshift({"Confroom":"Select"});
      	//confRoomArray.push({"Confroom":"ROOM 11"});
      	//confRoomArray.push({"Confroom":"ROOM 14"});
      	//confRoomArray.push({"Confroom":"Others"});
      	//that.getView().getModel("localModel").setProperty("/ConfroomData",confRoomArray);
      
          
          that._Column = new sap.m.TablePersoController({
  			table: that.getView().byId("idtable"),
  			componentName: "demoApp",
  			persoService: columns
  		}).activate(); 
		
},

onPersoButtonPressed:function(oEvent){
this._Column.openDialog();
},

onTablePersoRefresh : function(oEvent) {
	columns.resetPersData();
	this._Column.refresh();
},
	
/*onTablePersoRefresh : function() {
		columns.resetPersData();
		this._Column.refresh();
	},*/


//Select Location
onLocationSelect:function(oEvent){
		var that = this;
	var locationSelectedKey = oEvent.getSource().getSelectedKey();
	/*if((this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
		this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" ||
		this.getView().byId("idroomselect").getSelectedKey() === "Select") || this.getView().byId("idroomselect").getSelectedKey() === "Others")
	{	
		if(this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!="")
		{			
			that.getView().getModel("localModel").setProperty("/BookBtn",true);
		}else{
		that.getView().getModel("localModel").setProperty("/BookBtn",false);
		}
	
	}else{
		
			that.getView().getModel("localModel").setProperty("/BookBtn",true);
			}*/
	/*if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Others")
		{
			if(this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
				that.getView().getModel("localModel").setProperty("/BookBtn",true);
			}else{
			that.getView().getModel("localModel").setProperty("/BookBtn",false); 
			that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
		}
		}else{
		that.getView().getModel("localModel").setProperty("/BookBtn",true); 	
		}*/
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
	that.getView().byId("idcustominpt").setVisible(false);
		
	}
},

//Select Building
onBuildingSelect:function(oEvent){
		var that = this;
	var buildingSelectedKey = oEvent.getSource().getSelectedKey();
	/*if((this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
		this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" ||
		this.getView().byId("idroomselect").getSelectedKey() === "Select") || this.getView().byId("idroomselect").getSelectedKey() === "Others")
	{	
		if(this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!="")
		{			
			that.getView().getModel("localModel").setProperty("/BookBtn",true);
		}else{
		that.getView().getModel("localModel").setProperty("/BookBtn",false);
		}
	
	}else{
		
			that.getView().getModel("localModel").setProperty("/BookBtn",true);
			}*/
	/*if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Others")
		{
			if(this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
				that.getView().getModel("localModel").setProperty("/BookBtn",true);
			}else{
			that.getView().getModel("localModel").setProperty("/BookBtn",false); 
			that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
		}
		}else{
		that.getView().getModel("localModel").setProperty("/BookBtn",true); 	
		}*/
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
	/*confRoomArray.unshift({"Confroom":"Others"});*/	
	confRoomArray.unshift({"Confroom":"Select"});
	confRoomArray.push({"Confroom":"Others"});	
	oModel.setProperty("/ConfroomData",confRoomArray);
	
	}else{
	that.getView().byId("idroomselect").setEnabled(false);
	that.getView().byId("idroomselect").setSelectedKey("Select");
	}
	
	
},
/*onRoomSelect:function(oEvent){
	var roomSelectedKey = oEvent.getSource().getSelectedKey();
	if(roomSelectedKey==="Others"){
		this.getView().byId("idcustominpt").setVisible(true);
	}else {
		this.getView().byId("idcustominpt").setVisible(true);
	}
},*/


//Title Validation 
Validation: function(oEvt){
	var that = this;
	

		if(this.getView().byId("idinpttitle").getValue()===""){    
			sap.m.MessageBox.show("Enter Meeting Title...");
		    this.getView().byId("idinpttitle").setValueState(sap.ui.core.ValueState.Error);
		 }else{
			 this.getView().byId("idinpttitle").setValueState();
		}
		if(this.getView().byId("idtimestart").getValue()===""){	
			this.getView().byId("idtimestart").setValueState(sap.ui.core.ValueState.Error);
		}else{
			this.getView().byId("idtimestart").setValueState();
		}


	
	/*else if (this.getView().byId("idtimeend").getValue()==="") {
		this.getView().byId("idtimeend").setValueState(sap.ui.core.ValueState.Error);
	 }*/
	/*if (this.getView().byId("idtimestart").getValue()==="") {
		    //sap.m.MessageBox.show("Enter Start Time...");
		this.getView().byId("idtimestart").setValueState(sap.ui.core.ValueState.Error);
	 }else {
		 this.getView().byId("idtimestart").setValueState();
	 }
		
	if (this.getView().byId("idtimeend").getValue()==="") {
	    //sap.m.MessageBox.show("Enter Start Time...");
	this.getView().byId("idtimeend").setValueState(sap.ui.core.ValueState.Error);
 }else {
	 this.getView().byId("idtimeend").setValueState();
 }
	
	if (this.getView().byId("idroomselect").getSelectedKey()==="Select" || this.getView().byId("idroomselect").getSelectedKey()==="Others") {
	    //sap.m.MessageBox.show("Enter Start Time...");
		if (this.getView().byId("idroomselect").getSelectedKey()==="Others" && this.getView().byId("idcustominpt").getValue()!="") {
			this.getView().byId("idroomselect").setValueState();
			this.getView().byId("idcustominpt").setValueState();
		}else { 
		this.getView().byId("idroomselect").setValueState(sap.ui.core.ValueState.Error);
	this.getView().byId("idcustominpt").setValueState(sap.ui.core.ValueState.Error);}
 }else {
	 this.getView().byId("idroomselect").setValueState();
 }*/
	
	
	//this.getView().byId("idtimestart").setValue("10:40PM");
	/*var Starttime =this.getView().byId("idtimestart").getValue().replace(":","").replace(" ","");
	if(Starttime.includes("AM")){
		Starttime = Starttime.replace("AM","00");
		if(Starttime.slice(0,2)==="12"){
			Starttime=Starttime.replace(Starttime.slice(0,2),"00")}
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
	
	if(Starttime.slice(2,4)=="00"){
		Starttime=Starttime.replace(Starttime.slice(2,4),"30")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else if(Starttime.slice(2,4)=="15"){
		Starttime=Starttime.replace(Starttime.slice(2,4),"45")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else if(Starttime.slice(2,4)=="30"){
		var a= parseInt(Starttime.slice(0,2));
		a=a+1;
		if(a<10){
		a= "0"+a
		}else{
			a=""+a
		}
		Starttime=Starttime.replace(Starttime.slice(0,2),a)
		Starttime=Starttime.replace(Starttime.slice(2,4),"00")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else if(Starttime.slice(2,4)=="45"){
		var a= parseInt(Starttime.slice(0,2));
		a=a+1;
		if(a<10){
			a= "0"+a
			}else{
				a=""+a
			}
		Starttime=Starttime.replace(Starttime.slice(0,2),a)
		Starttime=Starttime.replace(Starttime.slice(2,4),"15")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else {
		
		this.getView().byId("idtimeend").setValue(Starttime);
	}*/
	
	
	if(this.getView().byId("idroomselect").getSelectedKey()==="Others"){
		this.getView().byId("idcustominpt").setVisible(true);
	}else {
		this.getView().byId("idcustominpt").setVisible(false);
		this.getView().byId("idcustominpt").setValue();
	}
		
	if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idroomselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Others")
	{	
		if(this.getView().byId("idinpttitle").getValue().length != 0 && this.getView().byId("idtimestart").getValue().length != 0 && 
				this.getView().byId("idtimeend").getValue().length != 0 &&
				this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
			that.getView().getModel("localModel").setProperty("/BookBtn",true)
			
		}else{
				that.getView().getModel("localModel").setProperty("/BookBtn",false);
				that.getView().getModel("localModel").setProperty("/BookBtnenabled",false)
			
				}
		
	}else{
				that.getView().getModel("localModel").setProperty("/BookBtn",true);
			
			}


   /* if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
            this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Select")
            {
            that.getView().getModel("localModel").setProperty("/BookBtn",false); 
            that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
      }else{
      that.getView().getModel("localModel").setProperty("/BookBtn",true);     
      }
},*/
		
		/*if(this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
			that.getView().getModel("localModel").setProperty("/BookBtn",true);
		}else{
		that.getView().getModel("localModel").setProperty("/BookBtn",false); 
		that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
		}
	}
	else{
	that.getView().getModel("localModel").setProperty("/BookBtn",true); 	
	}*/

	
},

customValidation:function(oEvt){
	var that=this;
	
	if(this.getView().byId("idinpttitle").getValue()===""){    
		sap.m.MessageBox.show("Enter Meeting Title...");
	    this.getView().byId("idinpttitle").setValueState(sap.ui.core.ValueState.Error);
	 }else{
		 this.getView().byId("idinpttitle").setValueState();
	}
	if(this.getView().byId("idtimestart").getValue()===""){	
		this.getView().byId("idtimestart").setValueState(sap.ui.core.ValueState.Error);
	}else{
		this.getView().byId("idtimestart").setValueState();
	}
	
/*	if (this.getView().byId("idinpttitle").getValue()==="") {
	    sap.m.MessageBox.show("Enter Meeting Title...");
	    this.getView().byId("idinpttitle").setValueState(sap.ui.core.ValueState.Error);
 }else{
	 this.getView().byId("idinpttitle").setValueState();
 }
if (this.getView().byId("idtimestart").getValue()==="") {
	    //sap.m.MessageBox.show("Enter Start Time...");
	this.getView().byId("idtimestart").setValueState(sap.ui.core.ValueState.Error);
 }else {
	 this.getView().byId("idtimestart").setValueState();
 }
	
if (this.getView().byId("idtimeend").getValue()==="") {
    //sap.m.MessageBox.show("Enter Start Time...");
this.getView().byId("idtimeend").setValueState(sap.ui.core.ValueState.Error);
}else {
 this.getView().byId("idtimeend").setValueState();
}*/

/*if (this.getView().byId("idroomselect").getSelectedKey()==="Select" || this.getView().byId("idroomselect").getSelectedKey()==="Others") {
    //sap.m.MessageBox.show("Enter Start Time...");
	if (this.getView().byId("idroomselect").getSelectedKey()==="Others" && this.getView().byId("idcustominpt").getValue()!="") {
		this.getView().byId("idroomselect").setValueState();
		this.getView().byId("idcustominpt").setValueState();
	}else { 
	this.getView().byId("idroomselect").setValueState(sap.ui.core.ValueState.Error);
this.getView().byId("idcustominpt").setValueState(sap.ui.core.ValueState.Error);}
}else {
 this.getView().byId("idroomselect").setValueState();
}*/
	
	
	if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idroomselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Others")
	{	
		if(this.getView().byId("idinpttitle").getValue().length != 0 && this.getView().byId("idstartdate").getValue().length != 0 &&
				this.getView().byId("idtimestart").getValue().length != 0 &&
				this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
			that.getView().getModel("localModel").setProperty("/BookBtn",true);
			}
		else{
			that.getView().getModel("localModel").setProperty("/BookBtn",false);
			that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
		}
		
	}else{
	
		that.getView().getModel("localModel").setProperty("/BookBtn",false);
		that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
	}
},


ValidationEnddate:function(oEvt){
	var that=this;
	
	if(this.getView().byId("idinpttitle").getValue()===""){    
		sap.m.MessageBox.show("Enter Meeting Title...");
	    this.getView().byId("idinpttitle").setValueState(sap.ui.core.ValueState.Error);
	 }else{
		 this.getView().byId("idinpttitle").setValueState();
	}
	if(this.getView().byId("idtimestart").getValue()===""){	
		this.getView().byId("idtimestart").setValueState(sap.ui.core.ValueState.Error);
	}else{
		this.getView().byId("idtimestart").setValueState();
	}
	
	var Starttime =this.getView().byId("idtimestart").getValue().replace(" ","");
	if(Starttime.slice(3,5)==="00"){
		Starttime=Starttime.replace(Starttime.slice(3,5),"30")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else if(Starttime.slice(3,5)==="15"){
		Starttime=Starttime.replace(Starttime.slice(3,5),"45")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else if(Starttime.slice(3,5)==="30"){
		var a= parseInt(Starttime.slice(0,2));
		if(a===11){
			if(a===11 && Starttime.slice(5,7)==="AM"){
			Starttime=Starttime.replace(Starttime.slice(5,7),"PM");
			}else{
			Starttime=Starttime.replace(Starttime.slice(5,7),"AM");
			}			
		}
		a=a+1;
		if(a<13){
			if(a<10){
				a= "0"+a;
			}
			else{
				a=""+a;
			}
		}else{
			a=a-12;
			a="0"+a;
		}
		Starttime=Starttime.replace(Starttime.slice(0,2),a)
		Starttime=Starttime.replace(Starttime.slice(3,5),"00")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else if(Starttime.slice(3,5)==="45"){
		var a= parseInt(Starttime.slice(0,2));
		if(a===11){
			if(a===11 && Starttime.slice(5,7)==="AM"){
			Starttime=Starttime.replace(Starttime.slice(5,7),"PM");
			}else{
			Starttime=Starttime.replace(Starttime.slice(5,7),"AM");
			}			
		}		
		a=a+1;
		if(a<13){
			if(a<10){
				a= "0"+a;
			}
			else{
				a=""+a;
			}
		}else{
			a=a-12;
			a="0"+a;
		}
		Starttime=Starttime.replace(Starttime.slice(0,2),a)
		Starttime=Starttime.replace(Starttime.slice(3,5),"15")
		this.getView().byId("idtimeend").setValue(Starttime);
	}else {		
		this.getView().byId("idtimeend").setValue(Starttime);
	}
	
	if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idroomselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Others")
	{	
		if(this.getView().byId("idinpttitle").getValue().length != 0 && this.getView().byId("idtimestart").getValue().length != 0 && 
				this.getView().byId("idtimeend").getValue().length != 0 &&
				this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
			that.getView().getModel("localModel").setProperty("/BookBtn",true)
			
		}else{
				that.getView().getModel("localModel").setProperty("/BookBtn",false);
				that.getView().getModel("localModel").setProperty("/BookBtnenabled",false)
			
				}
		
	}else{
				that.getView().getModel("localModel").setProperty("/BookBtn",true);
			
			}

	
},
ValidationsingleEnddate:function(oEvt){
	var that=this;
	if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
			this.getView().byId("idroomselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Others")
	{	
		if(this.getView().byId("idinpttitle").getValue().length != 0 && this.getView().byId("idtimestart").getValue().length != 0 && 
				this.getView().byId("idtimeend").getValue().length != 0 &&
				this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
			that.getView().getModel("localModel").setProperty("/BookBtn",true)
			
		}else{
				that.getView().getModel("localModel").setProperty("/BookBtn",false);
				that.getView().getModel("localModel").setProperty("/BookBtnenabled",false)
			
				}
		
	}else{
				that.getView().getModel("localModel").setProperty("/BookBtn",true);
			
			}
},


/*inputValidation:function(oEvt){
	if(this.getView().byId("idinpttitle").getValue().length === 0 || this.getView().byId("idstartdate").getValue().length === 0 || 
			   this.getView().byId("idtimestart").getValue().length === 0 || this.getView().byId("idtimeend").getValue().length === 0||
		 this.getView().byId("idlocationselect").getSelectedKey() === "Select" || this.getView().byId("idBuildingselect").getSelectedKey() === "Select" 
		|| this.getView().byId("idroomselect").getSelectedKey() === "Select" || this.getView().byId("idroomselect").getSelectedKey() === "Others")
	{
		if(this.getView().byId("idroomselect").getSelectedKey() === "Others" && this.getView().byId("idcustominpt").getValue()!=""){
			that.getView().getModel("localModel").setProperty("/BookBtn",true);
		}else{
		that.getView().getModel("localModel").setProperty("/BookBtn",false); 
		that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
		}
	}
	else{
	that.getView().getModel("localModel").setProperty("/BookBtn",true); 	
	}
},*/
	
//Email Validation
/*validate:function()
{
var email = this.getView().byId("idinputemail").getValue();
var mailregex = /^\w+[\w-+\.]*\@(itcinfotech.com)/;
  if (!mailregex.test(email)) {
    sap.m.MessageBox.show(email + " is not a valid email address");
this.getView().byId("idinputemail").setValueState(sap.ui.core.ValueState.Error);
      }else{
    	  this.getView().byId("idinputemail").setValueState();
      }
},

validatefrag:function()
{
var email = sap.ui.getCore().byId("idmailfrag").getValue();
var mailregex = /^\w+[\w-+\.]*\@(itcinfotech.com)/;
  if (!mailregex.test(email)) {
    sap.m.MessageBox.show(email + " is not a valid email address");
    sap.ui.getCore().byId("idmailfrag").setValueState(sap.ui.core.ValueState.Error);
      }else{
    	  sap.ui.getCore().byId("idmailfrag").setValueState();
      }
},*/

//Check Room Availability
onPressCheck:function(){
var that=this;
var oModel = that.getOwnerComponent().getModel();

var Startdate =this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
var ostartdate=parseInt(this.getView().byId("idstartdate").getValue().replace("-","").replace("-",""));
var Enddate =this.getView().byId("idbookdate").getValue().replace("-","").replace("-","");
var oenddate =parseInt(this.getView().byId("idbookdate").getValue().replace("-","").replace("-",""));
var sCurrentDate = new Date();
var sCurrentHours = sCurrentDate.getHours().toString();
var sCurrentMinutes = sCurrentDate.getMinutes()<10?"0"+sCurrentDate.getMinutes().toString():sCurrentDate.getMinutes().toString();
var sCurrenttime= sCurrentHours+sCurrentMinutes+"00";
var ocurrenttime= parseInt(sCurrentHours+sCurrentMinutes+"00");

var sCurrentyear = sCurrentDate.getFullYear().toString();
var sCurrentmonth = (sCurrentDate.getMonth()+1)<10?"0"+(sCurrentDate.getMonth()+1).toString():(sCurrentDate.getMonth()+1).toString();
var sCurrentday = sCurrentDate.getDate()<10?"0"+sCurrentDate.getDate().toString():sCurrentDate.getDate().toString();
var sCreatedate = sCurrentyear+sCurrentmonth+sCurrentday;
var ocreatedate = parseInt(sCurrentyear+sCurrentmonth+sCurrentday);

var a= this.getView().byId("idcheckbox").getSelected();

var Starttime =this.getView().byId("idtimestart").getValue().replace(":","").replace(" ","");
	if(Starttime.includes("AM")){
		Starttime = Starttime.replace("AM","00");
		if(Starttime.slice(0,2)==="12"){
			Starttime=Starttime.replace(Starttime.slice(0,2),"00")}
		/*var hrs=Starttime.slice(0,2);
		if(parseInt(hrs)===12){
			hrs=parseInt(hrs)-12;
			Starttime=Starttime.slice(0,2)+hrs.toString();
		}*/
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
var ostrttime =this.getView().byId("idtimestart").getValue().replace(":","").replace(" ","");
if(ostrttime.includes("AM")){
	ostrttime = ostrttime.replace("AM","00");
	if(ostrttime.slice(0,2)==="12"){
		ostrttime=ostrttime.replace(ostrttime.slice(0,2),"00")}
	}else{
	var hrs= ostrttime.slice(0,2);
	if(parseInt(hrs) < 12){
		hrs=parseInt(hrs)+12;
	
		if(hrs===24){
			hrs="00"
		}	
	}
	ostrttime = ostrttime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
}
var ostarttime=parseInt(ostrttime);

var Endtime =this.getView().byId("idtimeend").getValue().replace(":","").replace(" ","");
if(Endtime.includes("AM")){
	Endtime = Endtime.replace("AM","00");
	if(Endtime.slice(0,2)==="12"){
		Endtime=Endtime.replace(Endtime.slice(0,2),"00")}
	
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
var oendtme =this.getView().byId("idtimeend").getValue().replace(":","").replace(" ","");
if(oendtme.includes("AM")){
	oendtme = oendtme.replace("AM","00");
	if(oendtme.slice(0,2)==="12"){
		oendtme=oendtme.replace(oendtme.slice(0,2),"00")}
	}else{
	var hrs= oendtme.slice(0,2);
	if(parseInt(hrs) < 12){
		hrs=parseInt(hrs)+12;
	
		if(hrs===24){
			hrs="00"
		}	
	}
	oendtme = oendtme.replace("PM","00").replace(/^.{2}/g, hrs.toString());
}
var oendtime=parseInt(oendtme);

if(ostartdate<ocreatedate){
	sap.m.MessageToast.show("Meeting Start Date Cannot be in Past");
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}
else if(a===true && ostartdate===ocreatedate){
	sap.m.MessageToast.show("All Day Event cannot be set for current Date");
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}
else if(a===true && ostartdate>oenddate){
	sap.m.MessageToast.show("Meeting End Date cannot be less than Meeting Start Date");
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}
else if((a===false && ostartdate===ocreatedate) && ostarttime<ocurrenttime){
	sap.m.MessageToast.show("Meeting Start Time cannot be in Past");
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}
else if(a===false && ostarttime===oendtime){
	sap.m.MessageToast.show("Meeting Start Time cannot be equal to Meeting End Time");	
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}
else if(a===false && ostarttime>oendtime){
	sap.m.MessageToast.show("Meeting End Time cannot be less than Meeting Start time");	
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}
else if((this.getView().byId("idinptpn").getValue().length!= "") && (this.getView().byId("idinptpn").getValue().length<10)){
	sap.m.MessageToast.show("Enter Valid 10 Digit mobile Number");
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}else if((this.getView().byId("idinptpn").getValue().length!= "") && (this.getView().byId("idinptpn").getValue().length>10)){
	sap.m.MessageToast.show("Enter Valid 10 Digit mobile Number");
	that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
}else{	
	

var Userid =this.getView().byId("idinptusr").getText();
//var Userid	= document.getElementById("username").value.toUpperCase();
var Title =this.getView().byId("idinpttitle").getValue();
var Createdate=sCreatedate;
var Startdate =Startdate;
var Enddate =Enddate;
if(Enddate==""){
	Enddate=Startdate;
}
var Starttime =Starttime;
var Endtime =Endtime;
var Location =this.getView().byId("idlocationselect").getSelectedItem().getProperty("text");
var Building =this.getView().byId("idBuildingselect").getSelectedItem().getProperty("text");
var Confroom =this.getView().byId("idroomselect").getSelectedItem().getProperty("text");
/*var Email =this.getView().byId("idinputemail").getValue();*/
var Contactnum =this.getView().byId("idinptpn").getValue();
var Description =this.getView().byId("idinptdes").getValue();
var Alldayevent=this.getView().byId("idcheckbox").getSelected();
var Rflag =this.getView().byId("idreccheck").getSelected();
if(Rflag===true){
	Rflag="X";
}else{
	Rflag="";
}
var Rpattern="";
var Rrule="";

if(this.getView().byId("idradio1").getSelected()===true){
	var Rpattern=this.getView().byId("idradio1").getText().toUpperCase();
	if(this.getView().byId("idradiodaily1").getSelected()===true){
		var Rrule= this.getView().byId("idradiodaily1").getText().toUpperCase()+" "+this.getView().byId("iddailyinput").getValue()+
					" "+this.getView().byId("idtxtinput").getText().toUpperCase();
		}else{
		var Rrule=this.getView().byId("idradiodaily2").getText().toUpperCase();
		}
}
if(this.getView().byId("idradio2").getSelected()===true){
	var Rpattern=this.getView().byId("idradio2").getText().toUpperCase()
	var mon=this.getView().byId("idmon").getSelected();
	var tue=this.getView().byId("idtue").getSelected();
	var wed=this.getView().byId("idwed").getSelected();
	var thu=this.getView().byId("idthu").getSelected();
	var fri=this.getView().byId("idfri").getSelected();
	var sat=this.getView().byId("idsat").getSelected();
	var sun=this.getView().byId("idsun").getSelected();
	
	if(mon===true){
		mon=1+",";
	}else{mon="";}
	if(tue===true){
		tue=2+",";
	}else{tue="";}
	if(wed===true){
		wed=3+",";
	}else{wed="";}
	if(thu===true){
		thu=4+",";
	}else{thu="";}
	if(fri===true){
		fri=5+",";
	}else{fri="";}
	if(sat===true){
		sat=6+",";
	}else{sat="";}
	if(sun===true){
		sun=7+",";
	}else{sun="";}
	var Rrule=this.getView().byId("idweektext").getText().toUpperCase()+" "+this.getView().byId("idtextweek").getValue()+" "+
	this.getView().byId("idtextweekon").getText().toUpperCase()+" "+mon+tue+wed+thu+fri+sat+sun;
}


var sUrl = "/CheckRoomAvailability?startdate='"+Startdate+"'&enddate='"+Enddate+"'&starttime='"+Starttime+"'&endtime='"+Endtime+"'" +
			"&location='"+Location+"'&building='"+Building+"'&confroom='"+Confroom+"'&rflag='"+Rflag+"'&rpattern='"+Rpattern+"'" +
			"&rrule='"+Rrule+"'" ;
var oHeaders = { 'X-Requested-With': 'X', 'Accept' : 'application/json', }; 
oModel.setHeaders(oHeaders);

oModel.read(sUrl,{		
		success: function(oData, response){			
			sap.m.MessageToast.show("Conference Room is Available");			
			that.getView().getModel("localModel").setProperty("/BookBtnenabled",true);
		},
		error: function(oError){
			
				sap.m.MessageToast.show("Conference Room is Not Available");
				that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
				var el = document.createElement('html');
				el.innerHTML = oError.response.body;
				var aResponseContent = el.getElementsByTagName('li');                   
				for (var k = 0; k < aResponseContent.length; k++)
				{                      
					var ResponseTxt = ResponseTxt + "\n" + aResponseContent[k].textContent;
				
				}
				sap.m.MessageBox.show(ResponseTxt);
				/*sap.m.MessageToast.show(oError.response.statusText);
				sap.m.MessageToast.show(oError.response.statusCode);*/
			}
	});	
}
},

onPressBook:function(){
	var that = this;
	 sap.m.MessageBox.confirm(
		      "Confirm Create Meeting..", {
		          icon: sap.m.MessageBox.Icon.WARNING,
		          title: "Create Meeting",
		          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
		          onClose: function(oAction) {
		          if(oAction==="OK"){
		        	  that.onbtnPressBook();
		          }
		        	  }
		          });
},

//book room
onbtnPressBook:function(){
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
		if(Starttime.slice(0,2)==="12"){
			Starttime=Starttime.replace(Starttime.slice(0,2),"00")}
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
			if(Endtime.slice(0,2)==="12"){
				Endtime=Endtime.replace(Endtime.slice(0,2),"00")}
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
		
	var Startdate=this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
	var Enddate =this.getView().byId("idbookdate").getValue().replace("-","").replace("-","");
	if(Enddate===""){
		Enddate=Startdate;
	}
	
	var oEntry = {};		
	oEntry.Userid =this.getView().byId("idinptusr").getText();
	//oEntry.Userid=document.getElementById("username").value.toUpperCase();
	oEntry.Title =this.getView().byId("idinpttitle").getValue();
	oEntry.Startdate =Startdate;
	oEntry.Enddate =Enddate;
	oEntry.Createdate=createDate;
	oEntry.Starttime =Starttime;
	oEntry.Endtime =Endtime;
	oEntry.Location =this.getView().byId("idlocationselect").getSelectedItem().getProperty("text");	
	oEntry.Building =this.getView().byId("idBuildingselect").getSelectedItem().getProperty("text");
	oEntry.Confroom =this.getView().byId("idroomselect").getSelectedItem().getProperty("text");
	if(oEntry.Confroom==="Others"){
		oEntry.Confroom=this.getView().byId("idcustominpt").getValue();
	}
	/*oEntry.Email =this.getView().byId("idinputemail").getValue();*/
	oEntry.Contactnum =this.getView().byId("idinptpn").getValue();
	oEntry.Description =this.getView().byId("idinptdes").getValue();
	oEntry.Alldayevent=this.getView().byId("idcheckbox").getSelected();
	oEntry.Rflag =this.getView().byId("idreccheck").getSelected();
	if(oEntry.Rflag===true){
		oEntry.Rflag="X";
	}else{
		oEntry.Rflag="";
	}
	oEntry.Rpattern="";
	oEntry.Rrule="";
	if(this.getView().byId("idradio1").getSelected()===true){
		oEntry.Rpattern=this.getView().byId("idradio1").getText().toUpperCase();
		if(this.getView().byId("idradiodaily1").getSelected()===true){
			oEntry.Rrule= this.getView().byId("idradiodaily1").getText().toUpperCase()+" "+this.getView().byId("iddailyinput").getValue()+
						" "+this.getView().byId("idtxtinput").getText().toUpperCase();
			}else{
			oEntry.Rrule=this.getView().byId("idradiodaily2").getText().toUpperCase();
			}
	}
	if(this.getView().byId("idradio2").getSelected()===true){
		oEntry.Rpattern=this.getView().byId("idradio2").getText().toUpperCase()
		var mon=this.getView().byId("idmon").getSelected();
		var tue=this.getView().byId("idtue").getSelected();
		var wed=this.getView().byId("idwed").getSelected();
		var thu=this.getView().byId("idthu").getSelected();
		var fri=this.getView().byId("idfri").getSelected();
		var sat=this.getView().byId("idsat").getSelected();
		var sun=this.getView().byId("idsun").getSelected();
		
		if(mon===true){
			mon=1+",";
		}else{mon="";}
		if(tue===true){
			tue=2+",";
		}else{tue="";}
		if(wed===true){
			wed=3+",";
		}else{wed="";}
		if(thu===true){
			thu=4+",";
		}else{thu="";}
		if(fri===true){
			fri=5+",";
		}else{fri="";}
		if(sat===true){
			sat=6+",";
		}else{sat="";}
		if(sun===true){
			sun=7+",";
		}else{sun="";}
		oEntry.Rrule=this.getView().byId("idweektext").getText().toUpperCase()+" "+this.getView().byId("idtextweek").getValue()+" "+
		this.getView().byId("idtextweekon").getText().toUpperCase()+" "+mon+tue+wed+thu+fri+sat+sun;
	}
	

	//mail 
	/*var odate = new Date();
	var oyear = odate.getFullYear();
	var omonth = (odate.getMonth()+1)<10?"0"+(odate.getMonth()+1):(odate.getMonth()+1);
	var oday = odate.getDate()<10?"0"+odate.getDate():odate.getDate();
	var date=oday+"-"+omonth+"-"+oyear
	var ostdate=this.getView().byId("idstartdate").getValue();
	var ostdateyear=ostdate.slice(0,4);
	var ostdatemonth=ostdate.slice(5,7);
	var ostdateday=ostdate.slice(8,10);
	var ostdatereal=ostdateday+"-"+ostdatemonth+"-"+ostdateyear;
		
	var oenddte=this.getView().byId("idbookdate").getValue();
	var oenddteyear=oenddte.slice(0,4);
	var oenddtemonth=oenddte.slice(5,7);
	var oenddteday=oenddte.slice(8,10);
	var oenddtereal=oenddteday+"-"+oenddtemonth+"-"+oenddteyear;
	
	if(oenddtereal==="--"){oenddtereal=ostdatereal;}*/
	/*var a="Hi Team,"+"\n"+"\n";*/
/*		
		var a="Meeting Title		:  "+ oEntry.Title+"\n";
		a=a+"Created Date		:  " + date+"\n";
		a=a+"Meeting Start Date	:  " + ostdatereal+"\n";
		a=a+"Meeting End Date   	:  " + oenddtereal+"\n";
		a=a+"Meeting Start Time	:  " + this.getView().byId("idtimestart").getValue()+"\n";
		a=a+"Meeting End Time	:  " + this.getView().byId("idtimeend").getValue()+"\n";
		a=a+"Location		:  " + oEntry.Location+"\n";
		a=a+"Building		:  " + oEntry.Building+"\n";
		a=a+"Conference Room	:  " + oEntry.Confroom+"\n";
		a=a+"Contact Number	:  " + oEntry.Contactnum+"\n";
		a=a+"Description		:  " + oEntry.Description+"\n"+"\n"+"\n";
		a=a+"Thanks & Regards,"*/
	//
	
	
	var sUrl = '/ReservationSet';
	var oHeaders = { 'X-Requested-With': 'X', 'Accept' : 'application/json', }; 
	oModel.setHeaders(oHeaders);
	
	oModel.create(sUrl,oEntry,{
		method: "POST",
		success: function(oData,response){
			sap.m.MessageToast.show("Meeting Created Successfully");
			//sap.m.URLHelper.triggerEmail(oEntry.Email,"Conference Room Booking Details", "Hi Team,"+"\n"+"\n" +"Meeting ID		:" +"  "+oData.Meetingid+"\n"+a);
			that.handleRouteMatch()},
		error: function(oError){
			sap.m.MessageToast.show("Meeting Creation Failed");
			that.getView().getModel("localModel").setProperty("/BookBtnenabled",false);
			that.getView().getModel("localModel").setProperty("/BookBtn",true); 
			}
	});	
	
},

onPressDelete:function(){
	var that = this;
	 sap.m.MessageBox.confirm(
		      "Confirm Cancel Meeting..", {
		          icon: sap.m.MessageBox.Icon.WARNING,
		          title: "Cancel Meeting",
		          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
		          onClose: function(oAction) {
		          if(oAction==="OK"){
		        	  that.onbtnPressDelete();
		          }
		        	  }
		          });
},
			
// delete room
onbtnPressDelete:function(){
		var that=this;
		var oModel = that.getOwnerComponent().getModel();
		
		if(this.getView().byId("idtable").getSelectedItem()=== null){
			return sap.m.MessageToast.show("Select Row to Delete");
		}
		var SelectedRowdata = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
		var oEntry = {};		
		oEntry.Description =SelectedRowdata.Description;
		oEntry.Meetingid =SelectedRowdata.Meetingid;
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
		oEntry.Rflag =SelectedRowdata.Rflag;
		oEntry.Rpattern =SelectedRowdata.Rpattern;
		oEntry.Rrule =SelectedRowdata.Rrule;
		/*oEntry.Email =SelectedRowdata.Email;*/	
		
		var sUrl = "/ReservationSet(Meetingid='"+oEntry.Meetingid+"',Userid='"+oEntry.Userid+"',Location='"+oEntry.Location+"'," +
				"Building='"+oEntry.Building+"',Confroom='"+oEntry.Confroom+"',Starttime='"+oEntry.Starttime+"'," +
				"Endtime='"+oEntry.Endtime+"',Startdate='"+oEntry.Startdate+"',Enddate='"+oEntry.Enddate+"')";
		
		var oHeaders = { 'X-Requested-With': 'X', 'Accept' : 'application/json', }; 
		oModel.setHeaders(oHeaders);
		  
		oModel.remove(sUrl,{
			
			success: function(){
				sap.m.MessageToast.show("your Booked Conference Room is Canceled");
				that.handleRouteMatch()},
			error: function(){
				sap.m.MessageToast.show("Failed to Cancel the Booked Room");}
		});

},


//update fragment open
onPressUpdate:function(){
	var that = this;
	var valid = '';
	var SelectedRowdata = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
	getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
	var dialogModel = new sap.ui.model.json.JSONModel();
	dialogModel.setDefaultBindingMode("OneWay"); //add binding
	var updateBookingData = [];
	updateBookingData.push(SelectedRowdata);

	
	var locationArray = [];
	var buildingArray = [];
	var conferenceRoomArray = [];
	var locationFinal = [];
	var buildingArrayFinal = [];
	var localModel = that.getView().getModel("localModel");
		$.each(localModel.getProperty("/mainService"),function(index,element){
		if($.inArray(element.Location, locationArray) === -1) {
	  locationArray.push(element.Location);
	  }
	if(SelectedRowdata.Location === element.Location){
	if($.inArray(element.Building, buildingArray) === -1) {
	buildingArray.push(element.Building);
		}	
		}
		if(SelectedRowdata.Building === element.Building){		// add
			if(element.Confroom === SelectedRowdata.Confroom){
				valid = "true";
			}
		conferenceRoomArray.push(element);
		}
	});
		conferenceRoomArray.push({"Confroom":"Others"});
	$.each(locationArray,function(i,e){
		locationFinal.push({"Location":e})
	});
	$.each(buildingArray,function(i,e){
		buildingArrayFinal.push({"Building":e})
	});
//	this.updateBookingData = updateBookinData;

	this.sUpdateUrl = "/ReservationSet(Meetingid='"+updateBookingData[0].Meetingid+"',Userid='"+updateBookingData[0].Userid+"',Location='"+updateBookingData[0].Location+"'," +
	"Building='"+updateBookingData[0].Building+"',Confroom='"+updateBookingData[0].Confroom+"',Starttime='"+updateBookingData[0].Starttime+"'," +
	"Endtime='"+updateBookingData[0].Endtime+"',Startdate='"+updateBookingData[0].Startdate+"',Enddate='"+updateBookingData[0].Enddate+"')";
	
	/*var dialogModel = new sap.ui.model.json.JSONModel();
	dialogModel.setData({"dialogArray":updateBookingData});*/
	var allday=updateBookingData[0].Alldayevent;
	var Rpattern=updateBookingData[0].Rpattern;
	var Rrule=updateBookingData[0].Rrule;
	var Rflag=updateBookingData[0].Rflag;
	if(!this._Dialog){
		this._Dialog = sap.ui.xmlfragment("ConferenceRoom.view.Fragment.Update",this);
		this._Dialog.setModel(dialogModel,"DialogModel");
		this._Dialog.getModel("DialogModel").setProperty("/dialogArray",updateBookingData);
		
		/*if(allday===true){
			this._Dialog.getModel("DialogModel").setProperty("/EnableTrue",true);
			sap.ui.getCore().byId("idtimestartfrag").setEnabled(false);
			sap.ui.getCore().byId("idtimeendfrag").setEnabled(false);
		}else{
			sap.ui.getCore().byId("idenddtefrag").setEnabled(false);
		}*/
		this._Dialog.getModel("DialogModel").setProperty("/LocationsData",locationFinal);
		this._Dialog.getModel("DialogModel").setProperty("/BuildingData",buildingArrayFinal);
		this._Dialog.getModel("DialogModel").setProperty("/ConfroomData",conferenceRoomArray);
			if(valid === "true"){
				this._Dialog.getModel("DialogModel").setProperty("/inputVisible",false);
				this._Dialog.getModel("DialogModel").setProperty("/confroomselectedkey",SelectedRowdata.Confroom);
		}else{
			this._Dialog.getModel("DialogModel").setProperty("/inputVisible",true);
			this._Dialog.getModel("DialogModel").setProperty("/confroomselectedkey","Others");
		}
			//
			if(allday===true || allday===false){
				sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
				sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
				sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
				sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);
				sap.ui.getCore().byId("idweektextfrag").setVisible(false);
				sap.ui.getCore().byId("idtextweekfrag").setVisible(false);	
				sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
				sap.ui.getCore().byId("idmonfrag").setVisible(false);
				sap.ui.getCore().byId("idtuefrag").setVisible(false);
				sap.ui.getCore().byId("idwedfrag").setVisible(false);
				sap.ui.getCore().byId("idthufrag").setVisible(false);
				sap.ui.getCore().byId("idfrifrag").setVisible(false);
				sap.ui.getCore().byId("idsatfrag").setVisible(false);
				sap.ui.getCore().byId("idsunfrag").setVisible(false);
			}
			if(Rflag==="X"){
				sap.ui.getCore().byId("idenddtefrag").setEnabled(true);
			}			
			if(Rpattern==="DAILY"){
				sap.ui.getCore().byId("idradio1frag").setSelected(true);
				sap.ui.getCore().byId("idradiodaily1frag").setVisible(true);
				sap.ui.getCore().byId("iddailyinputfrag").setVisible(true);
				sap.ui.getCore().byId("idtxtinputfrag").setVisible(true);
				sap.ui.getCore().byId("idradiodaily2frag").setVisible(true);
				if(Rrule.slice(0,10)!="EVERY WEEK"){
					sap.ui.getCore().byId("idradiodaily1frag").setSelected(true);
					sap.ui.getCore().byId("iddailyinputfrag").setValue(Rrule.slice(6,8));
				}else{
					sap.ui.getCore().byId("idradiodaily2frag").setVisible(true);
					sap.ui.getCore().byId("idradiodaily2frag").setSelected(true);
					sap.ui.getCore().byId("iddailyinputfrag").setValue("1");
				}
				sap.ui.getCore().byId("idweektextfrag").setVisible(false);
				sap.ui.getCore().byId("idtextweekfrag").setVisible(false);	
				sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
				sap.ui.getCore().byId("idmonfrag").setVisible(false);
				sap.ui.getCore().byId("idtuefrag").setVisible(false);
				sap.ui.getCore().byId("idwedfrag").setVisible(false);
				sap.ui.getCore().byId("idthufrag").setVisible(false);
				sap.ui.getCore().byId("idfrifrag").setVisible(false);
				sap.ui.getCore().byId("idsatfrag").setVisible(false);
				sap.ui.getCore().byId("idsunfrag").setVisible(false);
			}
			if(Rpattern==="WEEKLY"){
				sap.ui.getCore().byId("idradio2frag").setSelected(true);
				sap.ui.getCore().byId("idweektextfrag").setVisible(true);
				sap.ui.getCore().byId("idtextweekfrag").setVisible(true);
				sap.ui.getCore().byId("idtextweekfrag").setValue(Rrule.slice(6,8));
				sap.ui.getCore().byId("idtextweekonfrag").setVisible(true);
				sap.ui.getCore().byId("idmonfrag").setVisible(true);
				sap.ui.getCore().byId("idtuefrag").setVisible(true);
				sap.ui.getCore().byId("idwedfrag").setVisible(true);
				sap.ui.getCore().byId("idthufrag").setVisible(true);
				sap.ui.getCore().byId("idfrifrag").setVisible(true);
				sap.ui.getCore().byId("idsatfrag").setVisible(true);
				sap.ui.getCore().byId("idsunfrag").setVisible(true);
				if(Rrule.slice(9,29).includes("1")){
					sap.ui.getCore().byId("idmonfrag").setSelected(true);
				}
				if(Rrule.slice(9,29).includes("2")){
					sap.ui.getCore().byId("idtuefrag").setSelected(true);
				}
				if(Rrule.slice(9,29).includes("3")){
					sap.ui.getCore().byId("idwedfrag").setSelected(true);
				}
				if(Rrule.slice(9,29).includes("4")){
					sap.ui.getCore().byId("idthufrag").setSelected(true);
				}
				if(Rrule.slice(9,29).includes("5")){
					sap.ui.getCore().byId("idfrifrag").setSelected(true);
				}
				if(Rrule.slice(9,29).includes("6")){
					sap.ui.getCore().byId("idsatfrag").setSelected(true);
				}
				if(Rrule.slice(9,29).includes("7")){
					sap.ui.getCore().byId("idsunfrag").setSelected(true);
				}
				sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
				sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
				sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
				sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);		
			}	
				this._Dialog.open();
		
	}else{
		
		this._Dialog.setModel(dialogModel,"DialogModel");
		this._Dialog.getModel("DialogModel").setProperty("/dialogArray",updateBookingData);
	/*	this._Dialog.getModel().setProperty("/LocationsData",locationArray);
		this._Dialog.getModel().setProperty("/BuildingData",buildingArray);*/
		this._Dialog.getModel("DialogModel").setProperty("/LocationsData",locationFinal);
		this._Dialog.getModel("DialogModel").setProperty("/BuildingData",buildingArrayFinal);
		this._Dialog.getModel("DialogModel").setProperty("/ConfroomData",conferenceRoomArray);
		if(valid === "true"){
			this._Dialog.getModel("DialogModel").setProperty("/inputVisible",false);
			this._Dialog.getModel("DialogModel").setProperty("/confroomselectedkey",SelectedRowdata.Confroom);
		}else{
		this._Dialog.getModel("DialogModel").setProperty("/inputVisible",true);
		this._Dialog.getModel("DialogModel").setProperty("/confroomselectedkey","Others");
		}
		/*this._Dialog.getModel().refresh(true);*/
		
		if(allday===true || allday===false){
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);
			sap.ui.getCore().byId("idweektextfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(false);	
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
			sap.ui.getCore().byId("idmonfrag").setVisible(false);
			sap.ui.getCore().byId("idtuefrag").setVisible(false);
			sap.ui.getCore().byId("idwedfrag").setVisible(false);
			sap.ui.getCore().byId("idthufrag").setVisible(false);
			sap.ui.getCore().byId("idfrifrag").setVisible(false);
			sap.ui.getCore().byId("idsatfrag").setVisible(false);
			sap.ui.getCore().byId("idsunfrag").setVisible(false);
		}
		if(Rflag==="X"){
			sap.ui.getCore().byId("idenddtefrag").setEnabled(true);
		}
		if(Rpattern==="DAILY"){
			sap.ui.getCore().byId("idradio1frag").setSelected(true);
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(true);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(true);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(true);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(true);
			if(Rrule.slice(0,10)!="EVERY WEEK"){
				sap.ui.getCore().byId("idradiodaily1frag").setSelected(true);
				sap.ui.getCore().byId("iddailyinputfrag").setValue(Rrule.slice(6,8));
			}else{
				sap.ui.getCore().byId("idradiodaily2frag").setVisible(true);
				sap.ui.getCore().byId("idradiodaily2frag").setSelected(true);
				sap.ui.getCore().byId("iddailyinputfrag").setValue();
			}
			sap.ui.getCore().byId("idweektextfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(false);	
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
			sap.ui.getCore().byId("idmonfrag").setVisible(false);
			sap.ui.getCore().byId("idtuefrag").setVisible(false);
			sap.ui.getCore().byId("idwedfrag").setVisible(false);
			sap.ui.getCore().byId("idthufrag").setVisible(false);
			sap.ui.getCore().byId("idfrifrag").setVisible(false);
			sap.ui.getCore().byId("idsatfrag").setVisible(false);
			sap.ui.getCore().byId("idsunfrag").setVisible(false);
		}
		if(Rpattern==="WEEKLY"){
			sap.ui.getCore().byId("idradio2frag").setSelected(true);
			sap.ui.getCore().byId("idweektextfrag").setVisible(true);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(true);
			sap.ui.getCore().byId("idtextweekfrag").setValue(Rrule.slice(6,8));
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(true);
			sap.ui.getCore().byId("idmonfrag").setVisible(true);
			sap.ui.getCore().byId("idtuefrag").setVisible(true);
			sap.ui.getCore().byId("idwedfrag").setVisible(true);
			sap.ui.getCore().byId("idthufrag").setVisible(true);
			sap.ui.getCore().byId("idfrifrag").setVisible(true);
			sap.ui.getCore().byId("idsatfrag").setVisible(true);
			sap.ui.getCore().byId("idsunfrag").setVisible(true);
			if(Rrule.slice(9,29).includes("1")){
				sap.ui.getCore().byId("idmonfrag").setSelected(true);
			}
			if(Rrule.slice(9,29).includes("2")){
				sap.ui.getCore().byId("idtuefrag").setSelected(true);
			}
			if(Rrule.slice(9,29).includes("3")){
				sap.ui.getCore().byId("idwedfrag").setSelected(true);
			}
			if(Rrule.slice(9,29).includes("4")){
				sap.ui.getCore().byId("idthufrag").setSelected(true);
			}
			if(Rrule.slice(9,29).includes("5")){
				sap.ui.getCore().byId("idfrifrag").setSelected(true);
			}
			if(Rrule.slice(9,29).includes("6")){
				sap.ui.getCore().byId("idsatfrag").setSelected(true);
			}
			if(Rrule.slice(9,29).includes("7")){
				sap.ui.getCore().byId("idsunfrag").setSelected(true);
			}
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);		
		}	
		this._Dialog.open();	
	}
		
},

//Update fragment close
onClose: function() {
	/*var tableId=this.getView().byId("idtable");
	var model=tableId.getModel();
	model.updateBindings();*/
	this._Dialog.close();
	
	;
},

onroomselectfrag:function( oEvent){

var selectedrow = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
			getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
	var roomSelectedKey = oEvent.getSource().getSelectedKey();
	if(roomSelectedKey!="Others"){
		sap.ui.getCore().byId("idcustominpufrag").setValue(selectedrow.Confroom);
		sap.ui.getCore().byId("idcustominpufrag").setVisible(false);
	}else{
	
		sap.ui.getCore().byId("idcustominpufrag").setValue(selectedrow.Confroom);
		sap.ui.getCore().byId("idcustominpufrag").setVisible(true);
	}
	
},

onBtnupdateSubmit:function(){
	var that = this;
	 sap.m.MessageBox.confirm(
		      "Confirm Update Meeting Details..", {
		          icon: sap.m.MessageBox.Icon.WARNING,
		          title: "Update Meeting Details",
		          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
		          onClose: function(oAction) {
		          if(oAction==="OK"){
		        	  that.onupdateSubmit();
		          }
		        	  }
		          });
	
},
//Submit updated room
onupdateSubmit:function(){	
	var that=this;
	var oModel = that.getOwnerComponent().getModel();
	
	//validations
	var Startdate =sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-","");
	var ostartdate =parseInt(sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-",""));
	var Enddate =sap.ui.getCore().byId("idenddtefrag").getValue().replace("-","").replace("-","");
	var oenddate =parseInt(sap.ui.getCore().byId("idenddtefrag").getValue().replace("-","").replace("-",""));
	var sCurrentDate = new Date();
	var sCurrentHours = sCurrentDate.getHours().toString();
	var sCurrentMinutes = sCurrentDate.getMinutes()<10?"0"+sCurrentDate.getMinutes().toString():sCurrentDate.getMinutes().toString();
	var sCurrenttime= sCurrentHours+sCurrentMinutes+"00";
	var ocurrenttime= parseInt(sCurrentHours+sCurrentMinutes+"00");
	
	var sCurrentyear = sCurrentDate.getFullYear().toString();
	var sCurrentmonth = (sCurrentDate.getMonth()+1)<10?"0"+(sCurrentDate.getMonth()+1).toString():(sCurrentDate.getMonth()+1).toString();
	var sCurrentday = sCurrentDate.getDate()<10?"0"+sCurrentDate.getDate().toString():sCurrentDate.getDate().toString();
	var sCreatedate = sCurrentyear+sCurrentmonth+sCurrentday;
	var ocreatedate = parseInt(sCurrentyear+sCurrentmonth+sCurrentday);
	
	var a= sap.ui.getCore().byId("idcheckboxfrag").getSelected();

	var Starttime =sap.ui.getCore().byId("idtimestartfrag").getValue().replace(":","").replace(" ","");
	if(Starttime.includes("AM")){
		Starttime = Starttime.replace("AM","00");
		}else if(Starttime.includes("PM")){
		var hrs= Starttime.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		Starttime = Starttime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}
	
	var ostrttime =sap.ui.getCore().byId("idtimestartfrag").getValue().replace(":","").replace(" ","");
	if(ostrttime.includes("AM")){
		ostrttime = ostrttime.replace("AM","00");
		}else if(ostrttime.includes("PM")){
		var hrs= ostrttime.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		ostrttime = ostrttime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}
	var ostarttime = parseInt(ostrttime);
	

	var Endtime =sap.ui.getCore().byId("idtimeendfrag").getValue().replace(":","").replace(" ","");
	if(Endtime.includes("AM")){
		Endtime = Endtime.replace("AM","00");
		}else if(Endtime.includes("PM")){
		var hrs= Endtime.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		Endtime = Endtime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}
	var oedtme =sap.ui.getCore().byId("idtimeendfrag").getValue().replace(":","").replace(" ","");
	if(oedtme.includes("AM")){
		oedtme = oedtme.replace("AM","00");
		}else if(oedtme.includes("PM")){
		var hrs= oedtme.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		oedtme = oedtme.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}
	var oendtime=parseInt(oedtme);

	if(ostartdate<ocreatedate){
		sap.m.MessageToast.show("Meeting Start Date Cannot be in Past");
	}

	else if(a===true && ostartdate>oenddate){
		sap.m.MessageToast.show("Meeting End Date cannot be less than Meeting Start Date");
		
	}
	else if((a===false && ostartdate===ocreatedate) && ostarttime<ocurrenttime){
		sap.m.MessageToast.show("Meeting Start Time cannot be in Past");
	}else if(a===false && ostarttime===oendtime){
		sap.m.MessageToast.show("Meeting Start Time cannot be equal to Meeting End Time");	
	}
	else if(a===false && ostarttime>oendtime){
		sap.m.MessageToast.show("Meeting End Time cannot be less than Meeting Start time");			
	}else if(sap.ui.getCore().byId("idconnumfrag").getValue().length!= "" && sap.ui.getCore().byId("idconnumfrag").getValue().length!= 10){
		sap.m.MessageToast.show("Enter valid 10 Digit Mobile Number");
	}
	else{
	// end validations
	var SelectedRowdata = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
	var oEntry = {};	
	
	oEntry.Userid =this.getView().byId("idinptusr").getText();
	//oEntry.Userid =document.getElementById("username").value.toUpperCase();
	oEntry.Meetingid=SelectedRowdata.Meetingid;
	oEntry.Title =sap.ui.getCore().byId("idinputtitlefrag").getValue();
	oEntry.Description =sap.ui.getCore().byId("idinputdesfrag").getValue();
	oEntry.Startdate =Startdate;
	oEntry.Enddate =Enddate
	oEntry.Createdate=sCreatedate
	oEntry.Starttime =Starttime;
	oEntry.Endtime =Endtime;
	oEntry.Location =sap.ui.getCore().byId("idlocationselectfrag").getSelectedItem().getProperty("text");
	oEntry.Building =sap.ui.getCore().byId("idBuildingselectfrag").getSelectedItem().getProperty("text");
	oEntry.Confroom =sap.ui.getCore().byId("idroomselectfrag").getSelectedItem().getProperty("text");
	if(oEntry.Confroom==="Others"){
		oEntry.Confroom=sap.ui.getCore().byId("idcustominpufrag").getValue();
	}
	/*oEntry.Email =sap.ui.getCore().byId("idmailfrag").getValue();*/
	oEntry.Contactnum =sap.ui.getCore().byId("idconnumfrag").getValue();
	oEntry.Alldayevent=sap.ui.getCore().byId("idcheckboxfrag").getSelected();
	oEntry.Rflag=sap.ui.getCore().byId("idreccheckfrag").getSelected();	
	if(oEntry.Rflag===true){
		oEntry.Rflag="X";
	}else{
		oEntry.Rflag="";
	}
	oEntry.Rpattern="";
	oEntry.Rrule="";
	if(sap.ui.getCore().byId("idradio1frag").getSelected()===true){
		oEntry.Rpattern=sap.ui.getCore().byId("idradio1frag").getText().toUpperCase();
		if(sap.ui.getCore().byId("idradiodaily1frag").getSelected()===true){
			oEntry.Rrule= sap.ui.getCore().byId("idradiodaily1frag").getText().toUpperCase()+" "+sap.ui.getCore().byId("iddailyinputfrag").getValue()+
						" "+sap.ui.getCore().byId("idtxtinputfrag").getText().toUpperCase();
			}else{
			oEntry.Rrule=sap.ui.getCore().byId("idradiodaily2frag").getText().toUpperCase();
			}
	}

	if(sap.ui.getCore().byId("idradio2frag").getSelected()===true){
		oEntry.Rpattern=sap.ui.getCore().byId("idradio2frag").getText().toUpperCase()
		var mon=sap.ui.getCore().byId("idmonfrag").getSelected();
		var tue=sap.ui.getCore().byId("idtuefrag").getSelected();
		var wed=sap.ui.getCore().byId("idwedfrag").getSelected();
		var thu=sap.ui.getCore().byId("idthufrag").getSelected();
		var fri=sap.ui.getCore().byId("idfrifrag").getSelected();
		var sat=sap.ui.getCore().byId("idsatfrag").getSelected();
		var sun=sap.ui.getCore().byId("idsunfrag").getSelected();
		
		if(mon===true){
			mon=1+",";
		}else{mon="";}
		if(tue===true){
			tue=2+",";
		}else{tue="";}
		if(wed===true){
			wed=3+",";
		}else{wed="";}
		if(thu===true){
			thu=4+",";
		}else{thu="";}
		if(fri===true){
			fri=5+",";
		}else{fri="";}
		if(sat===true){
			sat=6+",";
		}else{sat="";}
		if(sun===true){
			sun=7;
		}else{sun="";}
		oEntry.Rrule=sap.ui.getCore().byId("idweektextfrag").getText().toUpperCase()+" "+sap.ui.getCore().byId("idtextweekfrag").getValue()+" "+
		sap.ui.getCore().byId("idtextweekonfrag").getText().toUpperCase()+" "+mon+tue+wed+thu+fri+sat+sun;
	}
	
//	var sUrl = "/ReservationSet(Userid='"+this.updateBookingData[0].Userid+"',Location='"+this.updateBookingData[0].Location+"'," +
//	"Building='"+this.updateBookingData[0].Building+"',Confroom='"+this.updateBookingData[0].Confroom+"',Starttime='"+this.updateBookingData[0].Starttime+"'," +
//	"Endtime='"+this.updateBookingData[0].Endtime+"',Startdate='"+this.updateBookingData[0].Startdate+"',Enddate='"+this.updateBookingData[0].Enddate+"')";
	
	/*var stdate=sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-","");*/
	/*if(stdate!=null){
		alert("Confirm Update Booking");*/	
	/*if(stdate!==""){
		 sap.m.MessageBox.show(
			      "Click Yes to confirm Update Booking, else No", {
			          icon: sap.m.MessageBox.Icon.INFORMATION,
			          title: "Confirm Update Booking",
			          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
			          onClose: function(oAction) {
			          if(oAction===sap.m.MessageBox.Action.YES){*/
	//mail 
	/*var odate = new Date();
	var oyear = odate.getFullYear();
	var omonth = (odate.getMonth()+1)<10?"0"+(odate.getMonth()+1):(odate.getMonth()+1);
	var oday = odate.getDate()<10?"0"+odate.getDate():odate.getDate();
	var date=oday+"-"+omonth+"-"+oyear
	
	var ostdate=sap.ui.getCore().byId("idstrtdatefrg").getValue();
	var ostdateyear=ostdate.slice(0,4);
	var ostdatemonth=ostdate.slice(4,6);
	var ostdateday=ostdate.slice(6,8);
	var ostdatereal=ostdateday+"-"+ostdatemonth+"-"+ostdateyear;
		
	var oenddte=sap.ui.getCore().byId("idenddtefrag").getValue();
	var oenddteyear=oenddte.slice(0,4);
	var oenddtemonth=oenddte.slice(4,6);
	var oenddteday=oenddte.slice(6,8);
	var oenddtereal=oenddteday+"-"+oenddtemonth+"-"+oenddteyear;
	
	if(oenddtereal==="--"){oenddtereal=ostdatereal;}
	if(a===false){oEntry.Enddate=oEntry.Startdate;}
	
	var a="Hi Team,"+"\n"+"\n"
		a=a+"Meeting ID		:  "+ SelectedRowdata.Meetingid+"\n";
		a=a+"Meeting Title		:  "+ oEntry.Title+"\n";
		a=a+"Created Date		:  " +ConferenceRoom.util.Formatter.changeDateFormat(oEntry.Createdate)+"\n";
		a=a+"Meeting Start Date	:  " + ConferenceRoom.util.Formatter.changeDateFormat(oEntry.Startdate)+"\n";
		a=a+"Meeting End Date   	:  " + ConferenceRoom.util.Formatter.changeDateFormat(oEntry.Enddate)+"\n";
		a=a+"Meeting Start Time	:  " + ConferenceRoom.util.Formatter.changeTimeFormat(oEntry.Starttime)+"\n";
		a=a+"Meeting End Time	:  " + ConferenceRoom.util.Formatter.changeTimeFormat(oEntry.Endtime)+"\n";
		a=a+"Location		:  " + oEntry.Location+"\n";
		a=a+"Building		:  " + oEntry.Building+"\n";
		a=a+"Conference Room	:  " + oEntry.Confroom+"\n";
		a=a+"Contact Number	:  " + oEntry.Contactnum+"\n";
		a=a+"Description		:  " + oEntry.Description+"\n"+"\n"+"\n";
		a=a+"Thanks & Regards,"*/
	//
	
			        	  
	var oHeaders = { 'X-Requested-With': 'X', 'Accept' : 'application/json', }; 
	oModel.setHeaders(oHeaders);
	  
	oModel.update(this.sUpdateUrl,oEntry,{
		success: function(oData,response){
			sap.m.MessageToast.show("Your Meeting has been Successfully Updated");
			that._Dialog.close();
			//sap.m.URLHelper.triggerEmail(oEntry.Email, "Conference Room Booking Details",a);
			that.handleRouteMatch()},
		error: function(oError){
			sap.m.MessageToast.show("Failed to update the Room Details, Already booked..");}
	});
}		      	
},

//Check Availability Submit button
/*onPresssubmitCheck:function(){
	var that=this;
	var oModel = that.getOwnerComponent().getModel();

	var Startdate =sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-","");
	var Enddate =sap.ui.getCore().byId("idenddtefrag").getValue().replace("-","").replace("-","");
	var sCurrentDate = new Date();
	var sCurrentHours = sCurrentDate.getHours().toString();
	var sCurrentMinutes = sCurrentDate.getMinutes()<10?"0"+sCurrentDate.getMinutes().toString():sCurrentDate.getMinutes().toString();
	var sCurrenttime= sCurrentHours+sCurrentMinutes+"00";

	var sCurrentyear = sCurrentDate.getFullYear().toString();
	var sCurrentmonth = (sCurrentDate.getMonth()+1)<10?"0"+(sCurrentDate.getMonth()+1).toString():(sCurrentDate.getMonth()+1).toString();
	var sCurrentday = sCurrentDate.getDate()<10?"0"+sCurrentDate.getDate().toString():sCurrentDate.getDate().toString();
	var sCreatedate = sCurrentyear+sCurrentmonth+sCurrentday;
	var a= sap.ui.getCore().byId("idcheckboxfrag").getSelected();

	var Starttime =sap.ui.getCore().byId("idtimestartfrag").getValue().replace(":","").replace(" ","");
	if(Starttime.includes("AM")){
		Starttime = Starttime.replace("AM","00");
		}else if(Starttime.includes("PM")){
		var hrs= Starttime.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		Starttime = Starttime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}

	var Endtime =sap.ui.getCore().byId("idtimeendfrag").getValue().replace(":","").replace(" ","");
	if(Endtime.includes("AM")){
		Endtime = Endtime.replace("AM","00");
		}else if(Endtime.includes("PM")){
		var hrs= Endtime.slice(0,2);
		if(parseInt(hrs) < 12){
			hrs=parseInt(hrs)+12;
		
			if(hrs===24){
				hrs="00"
			}	
		}
		Endtime = Endtime.replace("PM","00").replace(/^.{2}/g, hrs.toString());
	}

	if(Startdate<sCreatedate){
		sap.m.MessageToast.show("This day no longer exist");
	}

	else if(a===true && Startdate>Enddate){
		sap.m.MessageToast.show("Enddate should be Greater than StartDate");
		
	}
	else if((a===false && Startdate===sCreatedate) && Starttime<sCurrenttime){
		sap.m.MessageToast.show("Start Time should always be greater than current time");
	}
	else if(a===false && Starttime>Endtime){
		sap.m.MessageToast.show("End Time should be greater than Start time");			
	}
	else{
	// end validations
		
	//var Userid =this.getView().byId("idinptusr").getText();
	var Userid =document.getElementById("username").value.toUpperCase()
	var Title =sap.ui.getCore().byId("idinputtitlefrag").getValue();
	var Createdate=sCreatedate;
	var Startdate =Startdate;
	var Enddate =Enddate;
	if(Enddate==""){
		Enddate=Startdate;
	}
	var Starttime =Starttime;
	var Endtime =Endtime;
	var Location =sap.ui.getCore().byId("idlocationselectfrag").getSelectedItem().getProperty("text");
	var Building =sap.ui.getCore().byId("idBuildingselectfrag").getSelectedItem().getProperty("text");
	var Confroom =sap.ui.getCore().byId("idroomselectfrag").getSelectedItem().getProperty("text");
	var Email =sap.ui.getCore().byId("idmailfrag").getValue();
	var Contactnum =sap.ui.getCore().byId("idconnumfrag").getValue();
	var Description =this.getView().byId("idinptdes").getValue();
	var Alldayevent=sap.ui.getCore().byId("idcheckboxfrag").getSelected();

	var sUrl = "/CheckRoomAvailability?startdate='"+Startdate+"'&enddate='"+Enddate+"'&starttime='"+Starttime+"'&endtime='"+Endtime+"'" +
				"&location='"+Location+"'&building='"+Building+"'&confroom='"+Confroom+"'" ;
	var oHeaders = { 'X-Requested-With': 'X', 'Accept' : 'application/json', }; 
	oModel.setHeaders(oHeaders);

	oModel.read(sUrl,{		
			success: function(response){			
				sap.m.MessageToast.show("You can Update This Room");			
				sap.ui.getCore().byId("idbtnupdatesubmit").setEnabled(true);
			},
			error: function(oError){
				
					sap.m.MessageToast.show("This Room Updation is Not Available");
					sap.ui.getCore().byId("idbtnupdatesubmit").setEnabled(false);
					
				}
		});	
	}
	},*/


//Table Search Filter
handleChangeSearch: function(oEvent) {
	   var tableId = this.getView().byId("idtable");
	   var inputValue = oEvent.getParameter("query");
	   var trimValue = inputValue.trim();
	   var filterArr = [];
	   var items = tableId.getBinding("items");
	   var filter1 = new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter2 = new sap.ui.model.Filter("Createdate", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter3 = new sap.ui.model.Filter("Startdate", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter4 = new sap.ui.model.Filter("Enddate", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter5 = new sap.ui.model.Filter("Location", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter6 = new sap.ui.model.Filter("Building", sap.ui.model.FilterOperator.Contains, trimValue);
	   var filter7 = new sap.ui.model.Filter("Confroom", sap.ui.model.FilterOperator.Contains, trimValue);
	   filterArr = [filter1, filter2, filter3, filter4, filter5, filter6, filter7];

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
 
  
	}else {
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


	
// icon tab button visible	
	handleIconTabBarSelect :function(oEvent){
	var that=this;
		var skey = oEvent.getParameter("key"); 
		if (skey === "MyReservations")
		 {
			
			this.getView().byId("idupdatebtn").setVisible(true);
			this.getView().byId("iddeletebtn").setVisible(true);
			this.getView().byId("idprintbtn").setVisible(true);
			/*this.getView().byId("idmailbtn").setVisible(true);*/
			this.getView().byId("idcheckbtn").setVisible(false);
			this.getView().byId("idbookbtn").setVisible(false);
			this.getView().byId("idtable").removeSelections(true);
			that.getView().getModel("localModel").setProperty("/DeleteBtn",false);
			/*that.getView().getModel("localModel").setProperty("/DeleteBtn",false); 
			this.getView().byId("idlocationselectall").setSelectedKey("Select");
			this.getView().byId("idBuildingselectall").setSelectedKey("Select");
			this.getView().byId("idroomselectall").setSelectedKey("Select");
			this.getView().byId("PC1").setVisible(false);*/
			
			
			
		 }else if(skey === "NewReservation")
		{
			
			this.getView().byId("idcheckbtn").setVisible(true);
			this.getView().byId("idbookbtn").setVisible(true);
			this.getView().byId("iddeletebtn").setVisible(false);
			this.getView().byId("idprintbtn").setVisible(false);
			/*this.getView().byId("idmailbtn").setVisible(false);*/
			this.getView().byId("idupdatebtn").setVisible(false);
			/*this.getView().byId("idlocationselectall").setSelectedKey("Select");
			this.getView().byId("idBuildingselectall").setSelectedKey("Select");
			this.getView().byId("idroomselectall").setSelectedKey("Select");
			this.getView().byId("PC1").setVisible(false);*/
			
			
		} 
		else
		{
			this.getView().byId("idcheckbtn").setVisible(false);
			this.getView().byId("idbookbtn").setVisible(false);
			this.getView().byId("iddeletebtn").setVisible(false);
			this.getView().byId("idprintbtn").setVisible(false);
			/*this.getView().byId("idmailbtn").setVisible(false);*/
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
	     /* onPressEmail:function(){
	  		var selectedrow = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
	  		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
	  		
	  		var a="Hi Team,"+"\n"+"\n";
	  		a=a+"Meeting Id		:  "+ selectedrow.Meetingid+"\n";
	  		a=a+"Meeting Title		:  "+ selectedrow.Title+"\n";
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
	  	
	  	*/
	
// Event Check Box
handleSelect : function(oEvent) {
	
	var a= oEvent.getSource().getSelected();
	var strtdte =this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
	
	/*var sCurrentDate = new Date();
	var sCurrentHours = sCurrentDate.getHours().toString();
	var sCurrentMinutes=(sCurrentDate.getMinutes()+5)<10?"0"+(sCurrentDate.getMinutes()+5).toString():(sCurrentDate.getMinutes()+5).toString();
	//var sCurrentMinutes = sCurrentDate.getMinutes()<10?"0"+sCurrentDate.getMinutes().toString():sCurrentDate.getMinutes().toString();
	var sCurrenttime= sCurrentHours+sCurrentMinutes+"00";
	
	var sCurrentyear = sCurrentDate.getFullYear().toString();
	var sCurrentmonth = (sCurrentDate.getMonth()+1)<10?"0"+(sCurrentDate.getMonth()+1).toString():(sCurrentDate.getMonth()+1).toString();
	var sCurrentday = sCurrentDate.getDate()<10?"0"+sCurrentDate.getDate().toString():sCurrentDate.getDate().toString();
	var sCreatedate = sCurrentyear+sCurrentmonth+sCurrentday;*/
		
	if(a===true){
		
	this.getView().byId("idreccheck").setEnabled(false);	
	this.getView().byId("idbookdate").setEnabled(true);
	this.getView().byId("idtimestart").setEnabled(false);	
	this.getView().byId("idtimeend").setEnabled(false);
	this.getView().byId("idtimestart").setValue("09:00 AM");
	this.getView().byId("idtimeend").setValue("06:00 PM");
	this.getView().byId("idbookdate").setValue(strtdte);
	/*if(strtdte===sCreatedate){
		this.getView().byId("idtimestart").setValue(sCurrenttime);
		this.getView().byId("idtimeend").setValue("11:59 PM");
	}*/
	/*var startdate = this.getView().byId("idstartdate").getValue();
	var enddate =  this.getView().byId("idstartdate").getValue();
	if(startdate<enddate){
		sap.m.MessageToast.show("End date must be Greater than startdate");
		
	}*/
		
	}else {
		this.getView().byId("idreccheck").setEnabled(true);
		var dt = new Date();
		var sCurrentHours = dt.getHours();
		var sCurrentMinutes = dt.getMinutes();
		var sCurrenttime= ""+sCurrentHours+sCurrentMinutes+"00";
		this.getView().byId("idbookdate").setEnabled(false);	
		this.getView().byId("idtimestart").setEnabled(true);	
		this.getView().byId("idtimeend").setEnabled(true);
		this.getView().byId("idtimestart").setValue(sCurrenttime);	
		this.getView().byId("idtimeend").setValue(sCurrenttime);	
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
var a= oEvent.getSource().getSelected();


var selectedrow = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
	getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);
var strtdte =sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-","");
		
	if(a===true){
	sap.ui.getCore().byId("idreccheckfrag").setEnabled(false);
	sap.ui.getCore().byId("idenddtefrag").setEnabled(true);
	sap.ui.getCore().byId("idenddtefrag").setValue(strtdte);
	sap.ui.getCore().byId("idtimestartfrag").setValue("00:01 AM");	
	sap.ui.getCore().byId("idtimeendfrag").setValue("11:59 PM");
	sap.ui.getCore().byId("idtimestartfrag").setEnabled(false);	
	sap.ui.getCore().byId("idtimeendfrag").setEnabled(false);
	
	
			
	}else {
		sap.ui.getCore().byId("idreccheckfrag").setEnabled(true);
		sap.ui.getCore().byId("idenddtefrag").setEnabled(false);	
		sap.ui.getCore().byId("idtimestartfrag").setEnabled(true);	
		sap.ui.getCore().byId("idtimeendfrag").setEnabled(true);
		sap.ui.getCore().byId("idtimestartfrag").setValue(selectedrow.Starttime);	
		sap.ui.getCore().byId("idtimeendfrag").setValue(selectedrow.Endtime);
		
		
		}
	
},


//Select location All
onLocationSelectall:function(oEvent){
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
that.getView().byId("idBuildingselectall").setEnabled(true);
finalArray.unshift({"Building":"Select"});
oModel.setProperty("/BuildingData",finalArray);
}else{
that.getView().byId("idBuildingselectall").setEnabled(false);
that.getView().byId("idBuildingselectall").setSelectedKey("Select");
that.getView().byId("idroomselectall").setEnabled(false);
that.getView().byId("idroomselectall").setSelectedKey("Select");
/*that.getView().byId("idinputall").setVisible(false);
that.getView().byId("idinputall").setValue();*/
that.getView().byId("PC1").setVisible(false);
}
},

//Select Building All
onBuildingSelectall:function(oEvent){
	var that = this;
var buildingSelectedKey = oEvent.getSource().getSelectedKey();

var buildingEnabled = that.getView().byId("idBuildingselectall").getEnabled();
var oModel = that.getView().getModel("localModel");
var confRoomArray = [];
if(buildingSelectedKey !== "Select" && buildingEnabled === true){
$.each(oModel.getProperty("/mainService"),function(index,element){
	if(buildingSelectedKey === element.Building){
		confRoomArray.push(element);
	}
});	
that.getView().byId("idroomselectall").setEnabled(true);
confRoomArray.unshift({"Confroom":"Select"});
/*confRoomArray.push({"Confroom":"Others"});*/
oModel.setProperty("/ConfroomData",confRoomArray);
}else{
that.getView().byId("idroomselectall").setEnabled(false);
that.getView().byId("idroomselectall").setSelectedKey("Select");
}
},

onRoomSelectall:function(oEvent){
	var that = this;
	
	if(that.getView().byId("idroomselectall").getSelectedKey()=== "Others"){
		that.getView().byId("PC1").setVisible(false);
		that.getView().byId("idinputall").setVisible(true);
		that.getView().byId("idinputall").setValue();
	}else{
		that.getView().byId("idinputall").setVisible(false);
	}
	
	
	
	if(that.getView().byId("idroomselectall").getSelectedKey()!== "Select" && that.getView().byId("idroomselectall").getSelectedKey()!= "Others")
	{
		that.getView().byId("PC1").setVisible(true);
		that.onallreservation();
	}else{
		that.getView().byId("PC1").setVisible(false);
	}
	
	
	
},

inputValidation:function(oEvt){
	var that=this;
	if(that.getView().byId("idroomselectall").getSelectedKey()=== "Others" && that.getView().byId("idinputall").getValue()!=""){
		that.getView().byId("PC1").setVisible(true);
		that.onallreservation();
	}else{
		that.getView().byId("PC1").setVisible(false);
			}
},

onallreservation:function(){
	var that=this;
	var mainModel = this.getOwnerComponent().getModel();
	
	//var Confroom=this.getView().byId("idroomselectall").getSelectedKey();
	var Confroom=that.getView().byId("idroomselectall").getSelectedKey();
	
	if(that.getView().byId("idroomselectall").getSelectedKey()==="Others"){
		Confroom=that.getView().byId("idinputall").getValue();
	}
	
	var allConfroomArray=[];
	var allreserArray=[];
	var finalreservArray = [];
	var sortArray = [];
 
   var afilters = [];
   var userFilter = new sap.ui.model.Filter({
	   path:"Confroom",
	   operator:sap.ui.model.FilterOperator.EQ,
	   value1:Confroom
	   });	   
   afilters.push(userFilter);
  	var mParameters = {
			filters:afilters,
			success: function(oData) {
				
				$.each(oData.results,function(index,element){
					if($.inArray(element.Confroom, allConfroomArray) === -1) {
						allConfroomArray.push(element.Confroom);
						  }
					element.allStartdate=new Date(element.Startdate.slice(0,4),(parseInt(element.Startdate.slice(4,6))-1).toString(),element.Startdate.slice(6,8),element.Starttime.slice(0,2),
					element.Starttime.slice(2,4),element.Starttime.slice(4,6));
					element.allEnddate=new Date(element.Enddate.slice(0,4),(parseInt(element.Enddate.slice(4,6))-1).toString(),element.Enddate.slice(6,8),element.Endtime.slice(0,2),
							element.Endtime.slice(2,4),element.Endtime.slice(4,6));
					
					allreserArray.push(element);
				});
				
				$.each(allConfroomArray,function(index,element){
					$.each(allreserArray,function(i,e){
						if(element === e.Confroom){
							sortArray.push(e);
						}
					});
					finalreservArray.push({"conferenceRoom":element,"appointments":sortArray});
				});
				
				
	 				that.getView().getModel("localModel").setProperty("/people",finalreservArray);

				 				//that.getView().getModel("localModel").setProperty("/people",testingArray);
				//that.getView().getModel("localModel").setProperty("/allreservations",allreserArray);
				that.getView().getModel("localModel").setProperty("/Startdate",new Date());
				
				},
			error: function(errorResponse) {
			
			},
			async: true
		};
	  mainModel.read("/ReservationSet",mParameters);
	  	
},

//Planing calendar select appointments alert
handleAppointmentSelect: function (oEvent) {
	var oAppointment = oEvent.getParameter("appointment");
	if (oAppointment) {
		var sSelected = oAppointment.getSelected() ? "selected" : "deselected";
		var oyearStart=oAppointment.getStartDate().getFullYear();
		var oMonthStart=(oAppointment.getStartDate().getMonth()+1)<10?"0"+(oAppointment.getStartDate().getMonth()+1):(oAppointment.getStartDate().getMonth()+1);
		var oDateStart=(oAppointment.getStartDate().getDate())<10?"0"+(oAppointment.getStartDate().getDate()):(oAppointment.getStartDate().getDate());
		var oFullDateStart=oDateStart+"/"+oMonthStart+"/"+oyearStart;
		var sFullDateStart=""+oyearStart+oMonthStart+oDateStart;
		var ohoursStart=(oAppointment.getStartDate().getHours())<10?"0"+(oAppointment.getStartDate().getHours()):(oAppointment.getStartDate().getHours());
		var ominutesStart=(oAppointment.getStartDate().getMinutes())<10?"0"+(oAppointment.getStartDate().getMinutes()):(oAppointment.getStartDate().getMinutes());
		var ofullTimeStart=ohoursStart+":"+ominutesStart;
		var sfullTimeStart=""+ohoursStart+ominutesStart+"00";
		
		var oyearEnd=oAppointment.getEndDate().getFullYear();
		var oMonthEnd=(oAppointment.getEndDate().getMonth()+1)<10?"0"+(oAppointment.getEndDate().getMonth()+1):(oAppointment.getEndDate().getMonth()+1);
		var oDateEnd=(oAppointment.getEndDate().getDate())<10?"0"+(oAppointment.getEndDate().getDate()):(oAppointment.getEndDate().getDate());
		var oFullDateEnd=oDateEnd+"/"+oMonthEnd+"/"+oyearEnd;
		var sFullDateEnd=""+oyearEnd+oMonthEnd+oDateEnd;
	
		var ohoursEnd=(oAppointment.getEndDate().getHours())<10?"0"+(oAppointment.getEndDate().getHours()):(oAppointment.getEndDate().getHours());
		var ominutesEnd=(oAppointment.getEndDate().getMinutes())<10?"0"+(oAppointment.getEndDate().getMinutes()):(oAppointment.getEndDate().getMinutes());
		var ofulltimeend=ohoursEnd+":"+ominutesEnd;
		var sfulltimeend=""+ohoursEnd+ominutesEnd+"00";
			
		sap.m.MessageBox.show("Meeting was Created By User: " +oAppointment.getText() 
							 +". \n Title: " +oAppointment.getTitle()
							 +". \n Start Date: " +ConferenceRoom.util.Formatter.changeDateFormat(sFullDateStart)
							 +". \n End Date : " +ConferenceRoom.util.Formatter.changeDateFormat(sFullDateEnd)
							 +". \n Start Time: " +ConferenceRoom.util.Formatter.changeTimeFormat(sfullTimeStart) 
							 +". \n End Time : " +ConferenceRoom.util.Formatter.changeTimeFormat(sfulltimeend));
	} else {
		var aAppointments = oEvent.getParameter("appointments");
		var sValue = aAppointments.length + " Appointments selected";
		MessageBox.show(sValue);
	}
},

handleIntervalSelect: function (oEvent) {
	var that=this;
	
	var mainModel = this.getOwnerComponent().getModel();
	var oStartDate = oEvent.getParameter("startDate");
	var oEndDate = oEvent.getParameter("endDate");
	var oStartTime=oStartDate.getHours()
	var title=oEvent.getParameter("Title");
	//var oEndTime = ""+oEndDate.getHours()+oEndDate.getMinutes()+"00";*/
	
	if(!that.createDialog){
		that.createDialog = sap.ui.xmlfragment("ConferenceRoom.view.Fragment.Create",that);
		sap.ui.getCore().byId("idstartdatecreate").setDateValue(oStartDate);
		sap.ui.getCore().byId("idbookdatecreate").setDateValue(oEndDate);
		sap.ui.getCore().byId("idtimestartcreate").setDateValue(oStartDate);
		sap.ui.getCore().byId("idtimeendcreate").setDateValue(oEndDate);
		if(oStartTime===0){
			sap.ui.getCore().byId("idcheckboxcreate").setSelected(true);
			sap.ui.getCore().byId("idtimestartcreate").setEnabled(false);
			sap.ui.getCore().byId("idtimeendcreate").setEnabled(false);
			sap.ui.getCore().byId("idbookdatecreate").setEnabled(true);
		}else{
			sap.ui.getCore().byId("idcheckboxcreate").setSelected(false);
			sap.ui.getCore().byId("idtimestartcreate").setEnabled(true);
			sap.ui.getCore().byId("idtimeendcreate").setEnabled(true);
			sap.ui.getCore().byId("idbookdatecreate").setEnabled(false);
		}
				//that.createdata();
		that.createDialog.open();
		sap.ui.getCore().byId("idinpttitlecreate").setValue()
		sap.ui.getCore().byId("idinptdescreate").setValue();
		sap.ui.getCore().byId("idinptpncreate").setValue();
		
	
	}else{
		sap.ui.getCore().byId("idstartdatecreate").setDateValue(oStartDate);
		sap.ui.getCore().byId("idbookdatecreate").setDateValue(oEndDate);
		sap.ui.getCore().byId("idtimestartcreate").setDateValue(oStartDate);
		sap.ui.getCore().byId("idtimeendcreate").setDateValue(oEndDate);
		if(oStartTime===0){
			sap.ui.getCore().byId("idcheckboxcreate").setSelected(true);
			sap.ui.getCore().byId("idtimestartcreate").setEnabled(false);
			sap.ui.getCore().byId("idtimeendcreate").setEnabled(false);
			sap.ui.getCore().byId("idbookdatecreate").setEnabled(true);
		}else{
			sap.ui.getCore().byId("idcheckboxcreate").setSelected(false);
			sap.ui.getCore().byId("idtimestartcreate").setEnabled(true);
			sap.ui.getCore().byId("idtimeendcreate").setEnabled(true);
			sap.ui.getCore().byId("idbookdatecreate").setEnabled(false);
		}
		//that.createdata();
		that.createDialog.open();
		sap.ui.getCore().byId("idinpttitlecreate").setValue()
		sap.ui.getCore().byId("idinptdescreate").setValue();
		sap.ui.getCore().byId("idinptpncreate").setValue();
	}
	
},

onClosecreate: function() {
	var that=this;
that.createDialog.close();

},

handleSelectCreate : function(oEvent) {
	
	var a= oEvent.getSource().getSelected();
	var strtdte =sap.ui.getCore().byId("idstartdatecreate").getValue().replace("-","").replace("-","");
			
	if(a===true){
	sap.ui.getCore().byId("idbookdatecreate").setEnabled(true);
	sap.ui.getCore().byId("idtimestartcreate").setEnabled(false);	
	sap.ui.getCore().byId("idtimeendcreate").setEnabled(false);
	sap.ui.getCore().byId("idtimestartcreate").setValue("00:00 AM");
	sap.ui.getCore().byId("idtimeendcreate").setValue("11:59 PM");
	sap.ui.getCore().byId("idbookdatecreate").setValue(strtdte);
		
	}else {
		var dt = new Date();
		var sCurrentHours = dt.getHours();
		var sCurrentMinutes = dt.getMinutes();
		var sCurrenttime= ""+sCurrentHours+sCurrentMinutes+"00";
		sap.ui.getCore().byId("idbookdatecreate").setEnabled(false);	
		sap.ui.getCore().byId("idtimestartcreate").setEnabled(true);	
		sap.ui.getCore().byId("idtimeendcreate").setEnabled(true);
		sap.ui.getCore().byId("idtimestartcreate").setValue(sCurrenttime);	
		sap.ui.getCore().byId("idtimeendcreate").setValue(sCurrenttime);	
		sap.ui.getCore().byId("idbookdatecreate").setValue("");
		}

},

/*createdata:function(){
	var that=this;
	var mainModel = this.getOwnerComponent().getModel();
	///
	var createlocationArray = [];
	var createbuildingArray = [];
	var createroomArray=[];
	var createfinalArray = [];
	var createfinalbulArray = [];
	var createfinalroomArray = [];
	
	var createlocalModel = new sap.ui.model.json.JSONModel();
	
	sap.ui.getCore().setModel(createlocalModel,"createlocalModel");
	var mParameters = {
		success: function(oData) {

	sap.ui.getCore().getModel("createlocalModel").setProperty("/mainService",oData.results);
	$.each(oData.results, function(i, el){
  if($.inArray(el.Location, createlocationArray) === -1) {
  createlocationArray.push(el.Location);
  }
   });
	$.each(oData.results, function(i, el){
		   if($.inArray(el.Building, createbuildingArray) === -1) {
			  createbuildingArray.push(el.Building);
			  }
	      });
	$.each(oData.results, function(i, el){
		   if($.inArray(el.Confroom, createroomArray) === -1) {
			   createroomArray.push(el.Confroom);
			  }
	      });
$.each(createlocationArray,function(i,e){
	createfinalArray.push({"Location":e});
});
$.each(createbuildingArray,function(i,e){
	createfinalbulArray.push({"Building":e});
});
$.each(createroomArray,function(i,e){
	createfinalroomArray.push({"Confroom":e});
});
createfinalroomArray.unshift({"Confroom":"Select"});
createfinalroomArray.push({"Confroom":"Others"});
sap.ui.getCore().getModel("createlocalModel").setProperty("/createLocationsData",createfinalArray);
sap.ui.getCore().getModel("createlocalModel").setProperty("/createBuildingData",createfinalbulArray);
sap.ui.getCore().getModel("createlocalModel").setProperty("/createConfroomData",createfinalroomArray);
		},
		error: function(errorResponse) {
		
		},
		async: true
	};
  mainModel.read("/GeoLocationSet",mParameters);
},
*/

onPressBookCreate:function(){
	var that = this;
	 sap.m.MessageBox.confirm(
		      "Confirm Create Meeting..", {
		          icon: sap.m.MessageBox.Icon.WARNING,
		          title: "Create Meeting",
		          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
		          onClose: function(oAction) {
		          if(oAction==="OK"){
		        	  that.onbtnPressBookCreate();
		          }
		        	  }
		          });
},

//book room
onbtnPressBookCreate:function(){
	var that=this;
	var oModel = that.getOwnerComponent().getModel();
	
	
	var Startdate =sap.ui.getCore().byId("idstartdatecreate").getValue().replace("-","").replace("-","");
	var ostartdate=parseInt(sap.ui.getCore().byId("idstartdatecreate").getValue().replace("-","").replace("-",""));
	var Enddate =sap.ui.getCore().byId("idbookdatecreate").getValue().replace("-","").replace("-","");
	var oenddate =parseInt(sap.ui.getCore().byId("idbookdatecreate").getValue().replace("-","").replace("-",""));
	var sCurrentDate = new Date();
	var sCurrentHours = sCurrentDate.getHours().toString();
	var sCurrentMinutes = sCurrentDate.getMinutes()<10?"0"+sCurrentDate.getMinutes().toString():sCurrentDate.getMinutes().toString();
	var sCurrenttime= sCurrentHours+sCurrentMinutes+"00";
	var ocurrenttime= parseInt(sCurrentHours+sCurrentMinutes+"00");

	var sCurrentyear = sCurrentDate.getFullYear().toString();
	var sCurrentmonth = (sCurrentDate.getMonth()+1)<10?"0"+(sCurrentDate.getMonth()+1).toString():(sCurrentDate.getMonth()+1).toString();
	var sCurrentday = sCurrentDate.getDate()<10?"0"+sCurrentDate.getDate().toString():sCurrentDate.getDate().toString();
	var sCreatedate = sCurrentyear+sCurrentmonth+sCurrentday;
	var ocreatedate = parseInt(sCurrentyear+sCurrentmonth+sCurrentday);

	var a= sap.ui.getCore().byId("idcheckboxcreate").getSelected();

	var Starttime =sap.ui.getCore().byId("idtimestartcreate").getValue().replace(":","").replace(" ","");
		if(Starttime.includes("AM")){
			Starttime = Starttime.replace("AM","00");
			if(Starttime.slice(0,2)==="12"){
				Starttime=Starttime.replace(Starttime.slice(0,2),"00")}
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
	var ostarttime=parseInt(Starttime);

	var Endtime =sap.ui.getCore().byId("idtimeendcreate").getValue().replace(":","").replace(" ","");
	if(Endtime.includes("AM")){
		Endtime = Endtime.replace("AM","00");
		if(Endtime.slice(0,2)==="12"){
			Endtime=Endtime.replace(Endtime.slice(0,2),"00")}
		
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
	
	var oendtime=parseInt(Endtime);

	if(sap.ui.getCore().byId("idinpttitlecreate").getValue()===""){
		sap.m.MessageToast.show("Enter meeting Title..");
	} else	if(ostartdate<ocreatedate){
		sap.m.MessageToast.show("Meeting Start Date Cannot be in Past");
	}
	else if(a===true && ostartdate===ocreatedate){
		sap.m.MessageToast.show("All Day Event cannot be set for current Date");
	
	}
	else if(a===true && ostartdate>oenddate){
		sap.m.MessageToast.show("Meeting End Date cannot be less than Meeting Start Date");

	}
	else if((a===false && ostartdate===ocreatedate) && ostarttime<ocurrenttime){
		sap.m.MessageToast.show("Meeting Start Time cannot be in Past");
		
	}
	else if(a===false && ostarttime===oendtime){
		sap.m.MessageToast.show("Meeting Start Time cannot be equal to Meeting End Time");	
		
	}
	else if(a===false && ostarttime>oendtime){
		sap.m.MessageToast.show("Meeting End Time cannot be less than Meeting Start time");	
	}
	else if((sap.ui.getCore().byId("idinptpncreate").getValue().length!= "") && (sap.ui.getCore().byId("idinptpncreate").getValue().length!=10)){
		sap.m.MessageToast.show("Enter Valid 10 Digit mobile Number");
	}else{

			
	var Startdate=sap.ui.getCore().byId("idstartdatecreate").getValue().replace("-","").replace("-","");
	var Enddate =sap.ui.getCore().byId("idbookdatecreate").getValue().replace("-","").replace("-","");
	if(Enddate===""){
		Enddate=Startdate;
	}
	
	var oEntry = {};		
	oEntry.Userid =this.getView().byId("idinptusr").getText();
	oEntry.Title =sap.ui.getCore().byId("idinpttitlecreate").getValue();
	oEntry.Startdate =Startdate;
	oEntry.Enddate =Enddate;
	if(oEntry.Enddate===""){
		oEntry.Enddate=Startdate;
	}
	oEntry.Createdate=sCreatedate
	oEntry.Starttime =Starttime;
	oEntry.Endtime =Endtime;
	oEntry.Location =this.getView().byId("idlocationselectall").getSelectedItem().getProperty("text");	
	oEntry.Building =this.getView().byId("idBuildingselectall").getSelectedItem().getProperty("text");
	oEntry.Confroom =this.getView().byId("idroomselectall").getSelectedItem().getProperty("text");
	if(oEntry.Confroom==="Others"){
		oEntry.Confroom=this.getView().byId("idinputall").getValue();
	}
	oEntry.Contactnum =sap.ui.getCore().byId("idinptpncreate").getValue();
	oEntry.Description =sap.ui.getCore().byId("idinptdescreate").getValue();
	oEntry.Alldayevent=sap.ui.getCore().byId("idcheckboxcreate").getSelected();
	
	
	var sUrl = '/ReservationSet';
	var oHeaders = { 'X-Requested-With': 'X', 'Accept' : 'application/json', }; 
	oModel.setHeaders(oHeaders);
	
	oModel.create(sUrl,oEntry,{
		method: "POST",
		success: function(oData,response){
			sap.m.MessageToast.show("Meeting Created Successfully");
			that.createDialog.close();
			that.handleRouteMatch()},
		error: function(oError){
			sap.m.MessageToast.show("This Meeting is not availbale for Given Period");
			 
			}
	});	
	}
	},
	

handleSelectRecurrence:function(oEvent){
		var a= oEvent.getSource().getSelected();
		var strtdte =this.getView().byId("idstartdate").getValue().replace("-","").replace("-","");
		if(a==true){
			
			this.getView().byId("idcheckbox").setEnabled(false);
			this.getView().byId("idlblstartdate").setText("Rec Start Date");
			this.getView().byId("idlblbookdate").setText("Rec End Date");
			this.getView().byId("idbookdate").setEnabled(true);
			this.getView().byId("idbookdate").setValue(strtdte);
			this.getView().byId("idradio1").setVisible(true);
			this.getView().byId("idradio2").setVisible(true);
			this.getView().byId("idradio1").setSelected(false);
			this.getView().byId("idradio2").setSelected(false);
			
			this.getView().byId("idradiodaily1").setVisible(false);
			this.getView().byId("idradiodaily2").setVisible(false);
			this.getView().byId("iddailyinput").setVisible(false);
			this.getView().byId("idtxtinput").setVisible(false);
			this.getView().byId("idweektext").setVisible(false);
			this.getView().byId("idtextweek").setVisible(false);
			this.getView().byId("idtextweekon").setVisible(false);
			this.getView().byId("idsun").setVisible(false);
			this.getView().byId("idmon").setVisible(false);
			this.getView().byId("idtue").setVisible(false);
			this.getView().byId("idwed").setVisible(false);
			this.getView().byId("idthu").setVisible(false);
			this.getView().byId("idfri").setVisible(false);
			this.getView().byId("idsat").setVisible(false);
		}else {
			
			this.getView().byId("idcheckbox").setEnabled(true);
			
			this.getView().byId("idlblstartdate").setText("Start Date");
			this.getView().byId("idlblbookdate").setText("End Date");
			this.getView().byId("idbookdate").setEnabled(false);
			this.getView().byId("idbookdate").setValue();
			this.getView().byId("idradio1").setVisible(false);
			this.getView().byId("idradio2").setVisible(false);
			this.getView().byId("idradio1").setSelected(false);
			this.getView().byId("idradio2").setSelected(false);
			
			
			this.getView().byId("idradiodaily1").setVisible(false);
			this.getView().byId("idradiodaily2").setVisible(false);
			this.getView().byId("iddailyinput").setVisible(false);
			this.getView().byId("idtxtinput").setVisible(false);
			this.getView().byId("idweektext").setVisible(false);
			this.getView().byId("idtextweek").setVisible(false);
			this.getView().byId("idtextweekon").setVisible(false);
			this.getView().byId("idsun").setVisible(false);
			this.getView().byId("idmon").setVisible(false);
			this.getView().byId("idtue").setVisible(false);
			this.getView().byId("idwed").setVisible(false);
			this.getView().byId("idthu").setVisible(false);
			this.getView().byId("idfri").setVisible(false);
			this.getView().byId("idsat").setVisible(false);
		}
	},
	
	radio1Select:function(oEvent){
		var a= oEvent.getSource().getSelected();
		if(a==true){
			this.getView().byId("idradiodaily1").setVisible(true);
			this.getView().byId("idradiodaily2").setVisible(true);
			this.getView().byId("iddailyinput").setVisible(true);
			this.getView().byId("idtxtinput").setVisible(true);
			this.getView().byId("idweektext").setVisible(false);
			this.getView().byId("idtextweek").setVisible(false);
			this.getView().byId("idtextweekon").setVisible(false);
			this.getView().byId("idsun").setVisible(false);
			this.getView().byId("idmon").setVisible(false);
			this.getView().byId("idtue").setVisible(false);
			this.getView().byId("idwed").setVisible(false);
			this.getView().byId("idthu").setVisible(false);
			this.getView().byId("idfri").setVisible(false);
			this.getView().byId("idsat").setVisible(false);
		}else {
			this.getView().byId("idradiodaily1").setVisible(false);
			this.getView().byId("idradiodaily2").setVisible(false);
			this.getView().byId("iddailyinput").setVisible(false);
			this.getView().byId("idtxtinput").setVisible(false);
			
			this.getView().byId("idweektext").setVisible(true);
			this.getView().byId("idtextweek").setVisible(true);
			this.getView().byId("idtextweekon").setVisible(true);
			this.getView().byId("idsun").setVisible(true);
			this.getView().byId("idmon").setVisible(true);
			this.getView().byId("idtue").setVisible(true);
			this.getView().byId("idwed").setVisible(true);
			this.getView().byId("idthu").setVisible(true);
			this.getView().byId("idfri").setVisible(true);
			this.getView().byId("idsat").setVisible(true);
		}
		
	},
	
	radio2Select:function(oEvent){
		var a= oEvent.getSource().getSelected();
		if(a==true){
			this.getView().byId("idweektext").setVisible(true);
			this.getView().byId("idtextweek").setVisible(true);
			this.getView().byId("idtextweekon").setVisible(true);
			this.getView().byId("idsun").setVisible(true);
			this.getView().byId("idmon").setVisible(true);
			this.getView().byId("idtue").setVisible(true);
			this.getView().byId("idwed").setVisible(true);
			this.getView().byId("idthu").setVisible(true);
			this.getView().byId("idfri").setVisible(true);
			this.getView().byId("idsat").setVisible(true);
			
			this.getView().byId("idradiodaily1").setVisible(false);
			this.getView().byId("idradiodaily2").setVisible(false);
			this.getView().byId("iddailyinput").setVisible(false);
			this.getView().byId("idtxtinput").setVisible(false);
		}else {
			this.getView().byId("idweektext").setVisible(false);
			this.getView().byId("idtextweek").setVisible(false);
			this.getView().byId("idtextweekon").setVisible(false);
			this.getView().byId("idsun").setVisible(false);
			this.getView().byId("idmon").setVisible(false);
			this.getView().byId("idtue").setVisible(false);
			this.getView().byId("idwed").setVisible(false);
			this.getView().byId("idthu").setVisible(false);
			this.getView().byId("idfri").setVisible(false);
			this.getView().byId("idsat").setVisible(false);
			
			this.getView().byId("idradiodaily1").setVisible(true);
			this.getView().byId("idradiodaily2").setVisible(true);
			this.getView().byId("iddailyinput").setVisible(true);
			this.getView().byId("idtxtinput").setVisible(true);
		}
		
	},
	
	
	handleSelectRecurrencefrag:function(oEvent){
		var a= oEvent.getSource().getSelected();
		
		var selectedrow = this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").
		getModel().getProperty(this.getView().byId("idtable").getSelectedItem().getBindingContext("localModel").sPath);

		var strtdte =sap.ui.getCore().byId("idstrtdatefrg").getValue().replace("-","").replace("-","");
		if(a==true){
			
			sap.ui.getCore().byId("idcheckboxfrag").setEnabled(false);
			sap.ui.getCore().byId("idlblstartdatefrag").setText("Rec Start Date");
			sap.ui.getCore().byId("idlblenddatefrag").setText("Rec End Date");
			sap.ui.getCore().byId("idenddtefrag").setEnabled(true);
			sap.ui.getCore().byId("idenddtefrag").setValue(strtdte);
			sap.ui.getCore().byId("idradio1frag").setVisible(true);
			sap.ui.getCore().byId("idradio2frag").setVisible(true);
			sap.ui.getCore().byId("idradio1frag").setSelected(false);
			sap.ui.getCore().byId("idradio2frag").setSelected(false);
			
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
			sap.ui.getCore().byId("idweektextfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
			sap.ui.getCore().byId("idsunfrag").setVisible(false);
			sap.ui.getCore().byId("idmonfrag").setVisible(false);
			sap.ui.getCore().byId("idtuefrag").setVisible(false);
			sap.ui.getCore().byId("idwedfrag").setVisible(false);
			sap.ui.getCore().byId("idthufrag").setVisible(false);
			sap.ui.getCore().byId("idfrifrag").setVisible(false);
			sap.ui.getCore().byId("idsatfrag").setVisible(false);
		}else {
			
			sap.ui.getCore().byId("idcheckboxfrag").setEnabled(true);
			
			sap.ui.getCore().byId("idlblstartdatefrag").setText("Start Date");
			sap.ui.getCore().byId("idlblenddatefrag").setText("End Date");
			sap.ui.getCore().byId("idenddtefrag").setEnabled(false);
			sap.ui.getCore().byId("idenddtefrag").setValue(strtdte);
			sap.ui.getCore().byId("idenddtefrag").setValue();
			sap.ui.getCore().byId("idradio1frag").setVisible(false);
			sap.ui.getCore().byId("idradio2frag").setVisible(false);
			sap.ui.getCore().byId("idradio1frag").setSelected(false);
			sap.ui.getCore().byId("idradio2frag").setSelected(false);
			
			
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
			sap.ui.getCore().byId("idweektextfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
			sap.ui.getCore().byId("idsunfrag").setVisible(false);
			sap.ui.getCore().byId("idmonfrag").setVisible(false);
			sap.ui.getCore().byId("idtuefrag").setVisible(false);
			sap.ui.getCore().byId("idwedfrag").setVisible(false);
			sap.ui.getCore().byId("idthufrag").setVisible(false);
			sap.ui.getCore().byId("idfrifrag").setVisible(false);
			sap.ui.getCore().byId("idsatfrag").setVisible(false);
		}
	},
	
	radio1Selectfrag:function(oEvent){
		var a= oEvent.getSource().getSelected();
		if(a==true){
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(true);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(true);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(true);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(true);
			sap.ui.getCore().byId("idweektextfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
			sap.ui.getCore().byId("idsunfrag").setVisible(false);
			sap.ui.getCore().byId("idmonfrag").setVisible(false);
			sap.ui.getCore().byId("idtuefrag").setVisible(false);
			sap.ui.getCore().byId("idwedfrag").setVisible(false);
			sap.ui.getCore().byId("idthufrag").setVisible(false);
			sap.ui.getCore().byId("idfrifrag").setVisible(false);
			sap.ui.getCore().byId("idsatfrag").setVisible(false);
		}else {
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
			
			sap.ui.getCore().byId("idweektextfrag").setVisible(true);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(true);
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(true);
			sap.ui.getCore().byId("idsunfrag").setVisible(true);
			sap.ui.getCore().byId("idmonfrag").setVisible(true);
			sap.ui.getCore().byId("idtuefrag").setVisible(true);
			sap.ui.getCore().byId("idwedfrag").setVisible(true);
			sap.ui.getCore().byId("idthufrag").setVisible(true);
			sap.ui.getCore().byId("idfrifrag").setVisible(true);
			sap.ui.getCore().byId("idsatfrag").setVisible(true);
		}
		
	},
	
	radio2Selectfrag:function(oEvent){
		var a= oEvent.getSource().getSelected();
		if(a==true){
			sap.ui.getCore().byId("idweektextfrag").setVisible(true);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(true);
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(true);
			sap.ui.getCore().byId("idsunfrag").setVisible(true);
			sap.ui.getCore().byId("idmonfrag").setVisible(true);
			sap.ui.getCore().byId("idtuefrag").setVisible(true);
			sap.ui.getCore().byId("idwedfrag").setVisible(true);
			sap.ui.getCore().byId("idthufrag").setVisible(true);
			sap.ui.getCore().byId("idfrifrag").setVisible(true);
			sap.ui.getCore().byId("idsatfrag").setVisible(true);
			
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(false);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(false);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(false);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(false);
		}else {
			sap.ui.getCore().byId("idweektextfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekfrag").setVisible(false);
			sap.ui.getCore().byId("idtextweekonfrag").setVisible(false);
			sap.ui.getCore().byId("idsunfrag").setVisible(false);
			sap.ui.getCore().byId("idmonfrag").setVisible(false);
			sap.ui.getCore().byId("idtuefrag").setVisible(false);
			sap.ui.getCore().byId("idwedfrag").setVisible(false);
			sap.ui.getCore().byId("idthufrag").setVisible(false);
			sap.ui.getCore().byId("idfrifrag").setVisible(false);
			sap.ui.getCore().byId("idsatfrag").setVisible(false);
			
			sap.ui.getCore().byId("idradiodaily1frag").setVisible(true);
			sap.ui.getCore().byId("idradiodaily2frag").setVisible(true);
			sap.ui.getCore().byId("iddailyinputfrag").setVisible(true);
			sap.ui.getCore().byId("idtxtinputfrag").setVisible(true);
		}
		
	},
	
	/*onPressrec:function(){
		if(!this.recurrDialog){
			this.recurrDialog = sap.ui.xmlfragment("ConferenceRoom.view.Fragment.Recurrence",this);
			//.byId("id1").setText("")
			this.recurrDialog.open();	
		}else{
			this.recurrDialog.open();	
		}
	},

//print fragment close
	onCloserecurr: function() {
	this.recurrDialog.close();
},*/
	
	

	});
});