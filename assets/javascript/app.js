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

  var database = firebase.database();

  //add employeed button
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //gets user's submission
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      freq: trainFreq
    };

    // Uploads train stuff to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    alert("Trains!");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
  });


  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

      //store info to a variable
      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().time;
      var trainFreq = childSnapshot.val().freq;

      //log train info
      console.log(trainName);
      console.log(trainDestination);
      console.log(trainTime);
      console.log(trainFreq);

      //beautify stuff
      var trainTimeConv = moment(trainTime, "hh:mm").subtract(1, "years");
      console.log(trainTimeConv);

      //current time
      var currentTime = moment();
      console.log("Current time: " + moment(currentTime).format("hh:mm"));

      var diffTime = moment().diff(moment(trainTimeConv), "minutes");
      console.log("Difference in time: " + diffTime);

      //remainder
      var tRemainder = diffTime % trainTime;
      console.log(tRemainder);

      //minutes till next train
      var tMinutesTillNext = trainTime - tRemainder;
      console.log("Minutes till nex train: " +tMinutesTillNext);

      //next train
      var nextTrain = moment().add(tMinutesTillNext, "minutes");
      console.log("ETA: " + moment(nextTrain).format("hh:mm"));
      
    
    
      
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFreq + "</td><td>" + trainTimeConv + "</td><td>" + tRemainder + "</td></tr>")

  });


}); 

