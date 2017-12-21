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

      //lot train info
      console.log(trainName);
      console.log(trainDestination);
      console.log(trainTime);
      console.log(trainFreq);

      //beautify stuff
      var trainStartBeaut = moment.unix(trainTime).format("MM/DD/YY");

      var trainCalc = moment().diff(moment.unix(trainTime, "X"), "time");
      console.log(trainCalc);

      //do math 
      var trainDiff;
      
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainStartBeaut + "</td><td>" + trainFreq + "</td></tr>")

  });


}); 

