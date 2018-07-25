jQuery.sap.declare("ConferenceRoom.util.Formatter");

ConferenceRoom.util.Formatter = {
	changeDateFormat:function(value){
		var year = value.slice(0,4);
		var month = value.slice(4,6);
		var date = value.slice(6,8);
		var fullMonth = '';
		switch(month){
		case "01":
          fullMonth	= "Jan";
          break;
          	case "02":
          fullMonth	= "Feb";
          break;
          	case "03":
          fullMonth	= "Mar";
          break;
          	case "04":
          fullMonth	= "Apr";
          break;
          	case "05":       
         fullMonth	= "May";
          break;
          	case "06":
          fullMonth	= "Jun";
          break;
          	case "07":
          fullMonth	= "Jul";
          break;
          	case "08":
          fullMonth	= "Aug";
          break;
           	case "09":
          fullMonth	= "Sep";
          break;
           	case "10":
          fullMonth	= "Oct";
          break;
           	case "11":
          fullMonth	= "Nov";
          break;
           	case "12":
          fullMonth	= "Dec";
          break;
          
}
return fullMonth + " "+date+","+year;
	},
	
	changeTimeFormat:function(value){
	var hrs = value.slice(0,2);
	var timeHrs = "";
	var timeFormat = "";
	if(parseInt(hrs) > 12 && parseInt(hrs) < 24){
		timeHrs = parseInt(hrs) - 12; 
		if(timeHrs.toString().length === 1){
    timeHrs = "0"+timeHrs.toString();
		}
		timeFormat = "PM";
	}else if(parseInt(hrs) === 12){
		  timeHrs = hrs;
			timeFormat = "PM";
	}else if(parseInt(hrs) === 24){
		 timeHrs = "00";
			timeFormat = "AM";
	}else{
		 timeHrs = hrs;
		timeFormat = "AM";
	}
	return timeHrs +":"+value.slice(2,4)+" "+timeFormat;
}

};