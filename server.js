var express = require('express');
var moment = require('moment');
// set the application port
// process.env.PORT is whatever Heroku says the port should be
var port = process.env.PORT || 8080;

var app = express();

app.get('/:input', (req, res) => {
  //Use moment to determine which format the date is in
  date = req.params.input;
  if (isNaN(date)) { //check for Unix
    let dateObject = {};
    if(moment(date).isValid()) {
      dateObject.Date = date;
    } else {dateObject.Date = null;}
    dateObject.Unix = moment(date);
    res.send(dateObject);
  } else {
    let dateObject = {};
    if(moment(parseInt(date)).isValid()) {
      dateObject.Unix = date;
    } else {dateObject.Unix = null;}
    dateObject.Date = moment(parseInt(date).format("dddd, MMMM Do YYYY"));
    res.send(dateObject);
  }
});



app.listen(port, () => {
  console.log("listening on " + port);
});