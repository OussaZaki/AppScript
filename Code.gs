function onFormSubmit(e) {
  var timestamp = e.values[0];
  var yourName = e.values[1];
  var toAddress = e.values[2];
  var visitDate = e.values[3];
  var university = e.values[4];
  var subject = "Confirmation for Code Jam training Event";
  var emailBody = "Thank you for your registartion to our event Code Jam Training, submitted on " + timestamp +
      "\n\nThe details you entered were as follows: " +
      "\nYour Name: " + yourName +
      "\nYour Email: " + toAddress +
      "\nFree hours for follow-Up: " + visitDate;

  var htmlBody = "Thank you for your registartion to our event <b>Code Jam Training</b>, submitted on <i>" + timestamp +
      "</i><br/>&nbsp;<br/>The details you entered were as follows: " +
      "<br/><font color=\"red\">Your Name:</font> " + yourName +
      "<br/>Your Email: " + toAddress +
      "<br/>Free hours for follow-Up: " + visitDate;

  var optAdvancedArgs = {name: "Club Ambassador Program", htmlBody: htmlBody};
  GmailApp.sendEmail(toAddress, subject, emailBody, optAdvancedArgs);
   
  // get the calendar from the email (didnt work for gsa-mena mail but working for a normal gmail account)
  var c = CalendarApp.getCalendarById(toAddress);
  Logger.log('%s', c);
  
  // Create the Event
  var eventDate = new Date('August 16, 2014');
  var eventTitle = "Code Jam Training";
  var event = c.createAllDayEvent(eventTitle,eventDate);
  event.setLocation("Univesity Cadi Ayyad");
  
  // Create the Meeting
    var meetingTitle = "Follow-up";
   //Meeting time is calculated by adding 7 days,
    var meetingTime = new Date(eventDate.valueOf()+7*24*60*60*1000+visitDate.valueOf());
   //Meeting End time is calculated by adding 2 hours.
    var meetingEndTime = new Date(meetingTime.valueOf()+2*60*60*1000);
    //Create the events
    var meeting = c.createEvent(meetingTitle, meetingTime, meetingEndTime);
    meeting.setLocation(university);
    
  //Map localisation, Still working on it 
  var response = Maps.newGeocoder().geocode(university);
  for (var i = 0; i < response.results.length; i++) {
    var result = response.results[i];
    Logger.log('%s: %s, %s', result.formatted_address, result.geometry.location.lat,
       result.geometry.location.lng);
  }
  
}

