const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');
const moment = require("moment-timezone")


admin.initializeApp(functions.config().firebase);
admin.database.enableLogging(true);


// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

exports.incoming = functions.https.onRequest((request, response) => {
  var twiml = new twilio.twiml.VoiceResponse();

  var chicago_tz    = moment.tz("America/Chicago");
  //var chicago_tz    = moment.tz("Pacific/Honolulu");

  var current_hour =  chicago_tz.format("H")
  var destination = functions.config().twilio.sip.destination;
  var ring = false;

  var en_response = "Hello. Strange phone is currently turned off. Please try again tomorrow";
  var jp_response ="只今、ストレンジフォンは営業時間外です。";


  if (current_hour > 9) {
    if (current_hour < 20) {
            ring = true;
    }
  }

  if (ring){
    call_attributes = {
        "record":"record-from-ringing"
    }
    twiml.dial(call_attributes).sip(destination)

  }else{
    en_object = {
      "voice":"woman",
      "language":"en-US"
    }
    twiml.say(en_response, en_object)
    jp_object = {
      "voice":"alice",
      "language":"ja-JP"
    }
    twiml.say(jp_response, jp_object)

  }
  response.set('content-type', 'text/xml');
  response.send(twiml.toString());

})

exports.status = functions.https.onRequest((request, response) => {
  console.log(request.body)
  response.set('content-type', 'text/xml');
  response.send("<status/>")
})

exports.outgoing = functions.https.onRequest((request, response) => {
  console.log(request.body)

  var cid_number = functions.config().twilio.cid;
  var destination = request.body.Called
  var twiml = new twilio.twiml.VoiceResponse();

  destination = destination.split("@")[0].split("sip:1")[1]

  if (destination == null){
    twiml.say("Invalid number");
  }else{
    call_attributes = {
        "timeout":10, 
        "callerId":cid_number, 
        "record":"record-from-ringing"
    }
    twiml.dial(number=destination, call_attributes)
  }
  console.log(twiml.toString());
  
  response.set('content-type', 'text/xml');
  response.send(twiml.toString());
})

