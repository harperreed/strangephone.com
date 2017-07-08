const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');
const moment = require("moment-timezone")
const firebase = require('firebase')
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


admin.initializeApp(functions.config().firebase);
admin.database.enableLogging(true);


/* Firebase call storage */

store_outgoing_call = function(callSid) {
  var client = new twilio(functions.config().twilio.account.sid, functions.config().twilio.account.authtoken);
  var d = new Date().toString()

  client.calls(callSid).fetch(function(err, call) {
    callOject = {}
    callOject.accountSid = call.accountSid
    callOject.annotation = call.annotation
    callOject.answeredBy = call.answeredBy
    callOject.callerName = call.callerName
    callOject.dateCreated = call.dateCreated
    callOject.dateUpdated = call.dateUpdated
    callOject.dateStored = d
    callOject.direction = call.direction
    callOject.duration = call.duration
    callOject.endTime = call.endTime
    callOject.forwardedFrom = call.forwardedFrom
    callOject.from = call.from
    callOject.fromFormatted = call.fromFormatted
    callOject.groupSid = call.groupSid
    callOject.parentCallSid = call.parentCallSid
    callOject.phoneNumberSid = call.phoneNumberSid
    callOject.price = call.price
    callOject.priceUnit = call.priceUnit
    callOject.sid = call.sid
    callOject.startTime = call.startTime
    callOject.timeStamp = firebase.database.ServerValue.TIMESTAMP
    
    callOject.direction = "outbound"

    if (call.to.indexOf("sip:")!=-1){
      callOject.to = "+1" + call.to.split("@")[0].split("sip:1")[1]
      callOject.toFormatted = call.to.split("@")[0].split("sip:1")[1]
      callOject.direction = "outbound"
      callOject.from = "+81345894757"
      callOject.fromFormatted = '+81 3-4589-4757'

    }else{
      callOject.to = call.to
      callOject.toFormatted = call.toFormatted
    }

    callOject.toFormatted = phoneUtil.format(phoneUtil.parse(callOject.toFormatted,'US'), PNF.INTERNATIONAL);



    //phoneNumberSid

    r = call.recordings().list(function(err, recordings){
      recordingObject = {}
      recording = recordings[0]
      recordingObject = {}
      recordingObject.accountSid = recording.accountSid
      recordingObject.dateCreated = recording.dateCreated
      recordingObject.dateUpdated = recording.dateUpdated
      recordingObject.callSid = recording.callSid
      recordingObject.duration = recording.duration
      recordingObject.sid = recording.sid
      recordingObject.price = recording.price
      recordingObject.recording_url = "https://api.twilio.com/2010-04-01/Accounts/"+recording.accountSid+"/Recordings/"+recording.sid+".mp3";
      callOject.recording = recordingObject


      admin.database().ref('outgoing-calls/' + callSid).set(callOject);
    });
  });
}

store_incoming_call = function(body){
  var d = new Date().toString()
  incoming_call = {}
  incoming_call.AccountSid = body.AccountSid;
  incoming_call.ApiVersion = body.ApiVersion;
  incoming_call.CallSid = body.CallSid;
  incoming_call.CallStatus = body.CallStatus;
  incoming_call.Called = body.Called;
  incoming_call.CalledCity = body.CalledCity;
  incoming_call.CalledCountry = body.CalledCountry;
  incoming_call.CalledState = body.CalledState;
  incoming_call.CalledZip = body.CalledZip;
  incoming_call.Caller = body.Caller;
  incoming_call.CallerCity = body.CallerCity;
  incoming_call.CallerCountry = body.CallerCountry;
  incoming_call.CallerState = body.CallerState;
  incoming_call.CallerZip = body.CallerZip;
  incoming_call.DateStored = d
  incoming_call.TimeStamp = firebase.database.ServerValue.TIMESTAMP
  incoming_call.DialCallDuration = body.DialCallDuration;
  incoming_call.DialCallSid = body.DialCallSid;
  incoming_call.DialCallStatus = body.DialCallStatus;
  incoming_call.DialSipCallId = body.DialSipCallId;
  incoming_call.DialSipResponseCode = body.DialSipResponseCode;
  incoming_call.Direction = body.Direction;
  incoming_call.From = body.From;
  incoming_call.FromCity = body.FromCity;
  incoming_call.FromCountry = body.FromCountry;
  incoming_call.FromState = body.FromState;
  incoming_call.FromZip = body.FromZip;
  incoming_call.RecordingDuration = body.RecordingDuration;
  incoming_call.RecordingSid = body.RecordingSid;
  incoming_call.RecordingUrl = body.RecordingUrl;
  incoming_call.To = body.To;
  incoming_call.ToCity = body.ToCity;
  incoming_call.ToCountry = body.ToCountry;
  incoming_call.ToState = body.ToState;
  incoming_call.ToZip = body.ToZip;


  admin.database().ref('incoming-calls/' + incoming_call.CallSid).set(incoming_call);

}

store_voicemail = function(body){
  voicemail = {}
  var d = new Date().toString()
  voicemail.AccountSid = body.AccountSid;
  voicemail.ApiVersion = body.ApiVersion;
  voicemail.CallSid = body.CallSid;
  voicemail.CallStatus = body.CallStatus;
  voicemail.Called = body.Called;
  voicemail.CalledCity = body.CalledCity;
  voicemail.CalledCountry = body.CalledCountry;
  voicemail.CalledState = body.CalledState;
  voicemail.CalledZip = body.CalledZip;
  voicemail.CallerCity = body.CallerCity;
  voicemail.CallerCountry = body.CallerCountry;
  voicemail.CallerState = body.CallerState;
  voicemail.CallerZip = body.CallerZip;
  voicemail.DateStored = d
  voicemail.Digits = body.Digits;
  voicemail.Direction = body.Direction;
  voicemail.From = body.From;
  voicemail.FromCity = body.FromCity;
  voicemail.FromCountry = body.FromCountry;
  voicemail.FromState = body.FromState;
  voicemail.FromZip = body.FromZip;
  voicemail.RecordingDuration = body.RecordingDuration;
  voicemail.RecordingSid = body.RecordingSid;
  voicemail.RecordingUrl = body.RecordingUrl;
  voicemail.TimeStamp = firebase.database.ServerValue.TIMESTAMP
  voicemail.To = body.To;
  voicemail.ToCity = body.ToCity;
  voicemail.ToCountry = body.ToCountry;
  voicemail.ToState = body.ToState;
  voicemail.ToZip = body.ToZip;



  admin.database().ref('voicemail/' + voicemail.CallSid).set(voicemail);

}

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })


/* Twilio call handling helpers */ 

exports.incoming = functions.https.onRequest((request, response) => {
  var twiml = new twilio.twiml.VoiceResponse();

  var chicago_tz    = moment.tz("America/Chicago");
  //var chicago_tz    = moment.tz("Pacific/Honolulu");

  var current_hour =  chicago_tz.format("H")
  var destination = functions.config().twilio.sip.destination;
  var ring = false;

  if (current_hour > 9) {
    if (current_hour < 20) {
            ring = true;
    }
  }

  if (ring){
    call_attributes = {
        "record":"record-from-answer",
        "transcribe":"true",
        "timeout":functions.config().twilio.timeout,
        "action":"/post_call",
    }

    /*
    var en_response = "This call is being recorded";
    var jp_response ="この通話は録音中です";

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
    */


    twiml.dial(call_attributes).sip(destination)

   

  }else{
    /*
    var en_response = "Hello. Strange phone is currently turned off. Please try again tomorrow or leave a message after the beep. ";
    en_object = {
      "voice":"woman",
      "language":"en-US"
    }
    twiml.say(en_response, en_object)
    */
    twiml.play("https://strange-phone.firebaseapp.com/prompts/en/3.mp3")
    /*
    var jp_response ="只今、ストレンジフォンは営業時間外です。 トーンの後にメッセージを残してください。";
    jp_object = {
      "voice":"alice",
      "language":"ja-JP"
    }
    twiml.say(jp_response, jp_object)
    */
    twiml.play("https://strange-phone.firebaseapp.com/prompts/en/3.mp3")

    var record_object = {
      "playBeep":true,
      "transcribe":true,
      "recordingStatusCallback":"/post_call",
      "trim":true,
    }
    twiml.record(record_object)

  }
  response.set('content-type', 'text/xml');
  response.send(twiml.toString());

})


exports.post_call = functions.https.onRequest((request, response) => {
  console.log("POST BODY");
  console.log(request.body);
  console.log("----");
  var twiml = new twilio.twiml.VoiceResponse();

  switch(request.body.Direction) {

    case "inbound":
      console.log("inbound call");



      if (request.body.DialCallStatus == "no-answer"){
        // HANDLE VOICEMAIL! Thanks @greggyb for the help
        console.log("no answer")
        switch(request.body.CallStatus) {
          case "in-progress":
            console.log("Serve voicemail prompt")
            
            
            /*
            var en_response = "Hello. Nobody is answering the Strange phone. Please leave a message after the beep.";
            en_object = {
              "voice":"woman",
              "language":"en-US"
            }
            twiml.say(en_response, en_object)
            */
            twiml.play("https://strange-phone.firebaseapp.com/prompts/en/2.mp3")


            /*
            var jp_response ="トーンの後にメッセージを残してください。";
            jp_object = {
              "voice":"alice",
              "language":"ja-JP"
            }
            twiml.say(jp_response, jp_object)
            */
            twiml.play("https://strange-phone.firebaseapp.com/prompts/jp/2.mp3")

            var record_object = {
              "playBeep":true,
              "transcribe":true,
              "trim":true,

            }
            twiml.record(record_object)
            twiml.hangup()
            break;

          case "completed":
            console.log("Completed voicemail recording")
            store_voicemail(request.body)
            twiml.hangup()
            break;
        }
        

      }else{
        console.log("answer?")
        switch(request.body.Digits) {
          case "hangup":
            console.log("Maybe a voicemail has been recorded")
            store_voicemail(request.body)
            twiml.hangup()
            break;
          default:
            console.log("Some other state")
            store_incoming_call(request.body);
            twiml.hangup();

        }
      }
      break;
    case "outbound":
      console.log("Outgoing call")

      twiml.hangup()
      break;
    default:
      console.log("Recording Handler");
      store_outgoing_call(request.body.CallSid);
      twiml.hangup()
      break;

  }
  
   
  response.set('content-type', 'text/xml');
  response.send(twiml.toString());
})


exports.outgoing = functions.https.onRequest((request, response) => {
  console.log(request.body)

  var cid_number = functions.config().twilio.cid;
  var destination = request.body.Called
  var twiml = new twilio.twiml.VoiceResponse();

  destination = destination.split("@")[0].split("sip:")[1]

  if (destination == null){
    twiml.say("Invalid number");
  }else{
    call_attributes = {
        "timeout":functions.config().twilio.timeout, 
        "callerId":cid_number, 
        "recordingStatusCallback":"/post_call",
        //"action":"/post_call",
        "record":"record-from-answer",
        "transcribe":"true",
    }
    twiml.dial(number=destination, call_attributes)
  }
  console.log(twiml.toString());
  
  response.set('content-type', 'text/xml');
  response.send(twiml.toString());
})


/* Web API functions */


exports.recent_voicemails = functions.https.onRequest((request, response) => {
  response.send("voicemails!");
})

exports.recent_incoming_calls = functions.https.onRequest((request, response) => {
  response.send("incoming calls!");
})

exports.recent_outgoing_calls = functions.https.onRequest((request, response) => {
  response.send("outgoing calls!");
})
