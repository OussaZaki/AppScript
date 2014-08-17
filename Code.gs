function onFormSubmit(e) {
  var timestamp = e.values[0];
  var yourName = e.values[1];
  var toAddress = e.values[2];
  var visitDate = e.values[3];
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
   
  
  var c = CalendarApp.getCalendarById(toAddress);
  var eventDate = new Date('August 16, 2014');
  var eventTitle = "Code Jam Training";
  var event = c.createAllDayEvent(eventTitle,eventDate);
  
    var meetingTitle = "Follow-up";
   //Meeting time is calculated by adding 7 days,
    var meetingTime = new Date(eventDate.valueOf()+7*24*60*60*1000+visitDate.valueOf());
   //Meeting End time is calculated by adding 2 hours.
    var meetingEndTime = new Date(meetingTime.valueOf()+2*60*60*1000);
    //Create the events
    c.createEvent(meetingTitle, meetingTime, meetingEndTime);
}