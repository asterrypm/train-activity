// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDXpLXchZHHxLLRcaKf2rVAPnBBuWv4qNk",
    authDomain: "train-project-ea895.firebaseapp.com",
    databaseURL: "https://train-project-ea895.firebaseio.com",
    projectId: "train-project-ea895",
    storageBucket: "",
    messagingSenderId: "344921288630"
  };
  
  firebase.initializeApp(config);

  var trainDatabase = firebase.database();

//Add on click for Submit button for new train
  $("#addTrain").on("click",function() {
  	event.preventDefault();
 

 //Create variables to collect user input
	var tnName = $("#train-name-input").val().trim();
	var tnDestination = $("#destination-input").val().trim();
	var tnFirstTrain = moment($("#firstTrain-input").val().trim(),"HH:mm").subtract(10,"years").format("x");
	var tnFrequency = $("#frequency-input").val().trim();

//Create a local 'temporary' object for holding train data
 var newTrain = {
    name: tnName,
    destination: tnDestination,
  	firstTrain: tnFirstTrain,
  	frequency: tnFrequency
 	
 };

 //Upload train data to Firebase
 trainDatabase.ref().push(newTrain);

 //log to console
 console.log(newTrain.name);
 console.log(newTrain.destination);
 console.log(newTrain.firstTrain);
 console.log(newTrain.frequency);
 
 alert("New Train Added");

 //Clears all of the user input fields
 $("#train-name-input").val("");
 $("#destination-input").val("");
 $("#firstTrain-input").val("");
 $("#frequency-input").val("");

//Calculate next train arrival
  return false;
});

//Create Firebase event for adding train to database and adding a row to the html
trainDatabase.ref().on("child_added",function(childSnapshot, prevChildKey) {
	
console.log(childSnapshot.val());

//Store everything in a variable

var tnName = childSnapshot.val().name;
var tnDestination = childSnapshot.val().destination;
var tnFirstTrain = childSnapshot.val().firstTrain;
var tnFrequency = childSnapshot.val().frequency;

var remainder = moment().diff(moment.unix(tnFirstTrain),"minutes")%tnFrequency;
var minutes =tnFrequency - remainder;
var tnArrival = moment().add(minutes,"m").format("hh:mm A");

console.log(remainder);
console.log(minutes);
console.log(tnArrival);


$("#train-table > tbody").append("<tr><td>" + tnName + "</td><td>" + tnDestination +
	"</td><td>" + tnFrequency + "</td><td>" + tnArrival + "</td><td>" + minutes + "</td></tr>");
	


});










	 