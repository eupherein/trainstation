$(document).ready(function () {



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDcSbdBb39Gzwi7iNLx8G7rd62mpxScD8k",
    authDomain: "trains-planes-and-automobiles.firebaseapp.com",
    databaseURL: "https://trains-planes-and-automobiles.firebaseio.com",
    projectId: "trains-planes-and-automobiles",
    storageBucket: "trains-planes-and-automobiles.appspot.com",
    messagingSenderId: "971193595915"
  };
  firebase.initializeApp(config);

  //declares variable for refernace of js to database
  var database = firebase.database();
  
  //declares varitables for when user inputs new data
  var trainName;
  var trainDestination;
  var trainTime;
  var trainFreq;
  var nextTrainFormatted;
  
  //beautify stuff
  var trainTimeConv;
 
  //current time
  var currentTime = moment();
  console.log("Current time: " + moment(currentTime).format("hh:mm"));
  var diffTime;
  
  //remainder
  var tRemainder;
  var tMinutesTillNext;
  var nextTrain;

  //add new train button
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    
    //gets user's submission
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();
    var trainTimeConv = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(trainTimeConv);
    //current time
     currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));
     diffTime = currentTime.diff(moment(trainTimeConv), "minutes");
    console.log("Difference in time: " + diffTime);
    //remainder
    tRemainder = diffTime % trainFreq;
    console.log(tRemainder);
    //minutes till next train
    tMinutesTillNext = trainFreq - tRemainder;
    console.log("Minutes till nex train: " + tMinutesTillNext);
    //next train
     nextTrain = moment().add(tMinutesTillNext, "minutes");
    console.log("ETA: " + moment(nextTrain).format("hh:mm"));
     nextTrainFormatted = moment(nextTrain).format("HH:MM");
    console.log("next train formatted: ", nextTrainFormatted);
    
   //gives all user entries an object to refer too 
    var trainObject = {
      trainName: trainName,
      trainDestination: trainDestination,
      trainTime: trainTime,
      trainFreq: trainFreq,
      nextTrainFormatted: nextTrainFormatted,
      tMinutesTillNext: tMinutesTillNext

    }


    // Uploads train stuff to the database
    database.ref().push(trainObject);


    alert("Trains!");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
  });


  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //stores all info from database to previously declared variables (20-37)
    var childTrainName = childSnapshot.val().trainName;
    var childTrainDestination = childSnapshot.val().trainDestination;
    var childTrainTime = childSnapshot.val().trainTime;
    var childTrainFreq = childSnapshot.val().trainFreq;
    var childNextFormatted = childSnapshot.val().nextTrain;
    var childMinutesUntilNextTrain = childSnapshot.val().tMinutesTillNext;

      //log train info 
      console.log(childTrainName, childTrainDestination, childTrainName, childTrainFreq);



    //append new train info to a new table row 
    $("#train-table > tbody").append("<tr><td>" + childTrainName + "</td><td>" + childTrainDestination + "</td><td>" + childTrainFreq + "</td><td>" + nextTrainFormatted + "</td><td>" + childMinutesUntilNextTrain + "</td></tr>")

  });


});

