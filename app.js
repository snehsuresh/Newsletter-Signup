//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");                                       //used to contact another server from yours. Used for APIs


app.use(bodyParser.urlencoded({extended: true}));                        //used for getting html pages into your app
app.use(express.static("public"));                                       //for making a public folder for all your static files


app.get("/", function(req, res) {                                       //app.get is to get a page for the server
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){                                       //app.post is for server to catch posts from other files
   var firstName = req.body.fName;
   var lastName = req.body.lName;
   var email = req.body.email;

   var data = {
     members : [
       {
       email_address : email,
       status : "subscribed",
       merge_fields: {
         FNAME : firstName,
         LNAME : lastName
       }
     }
   ]
   };

  var jsonData = JSON.stringify(data);

   var options = {
  //   url : "https://us20.api.mailchimp.com/3.0/lists/1315d17038",
     method: "POST",
     headers: {
       "Authorization" : "sneh a87ca73d6b9151140f96c3187b7a1a17-us20"
     },
     body: jsonData             //data that your actualy posting come inside body
   };


   request(options, function(error, response, body){
     if(error){
       res.sendFile(__dirname + "/failure.html");
     }else{
       if(res.statusCode === 200){
         res.sendFile(__dirname + "/successpage.html");
       }else{
          res.send("ERROR" + error + res.statusCode);
       }
     }
   });


});

app.post("/failure", function(req,res){
  res.redirect("/")
});

app.listen(3000, function() {
  console.log("server is set");
});


// a87ca73d6b9151140f96c3187b7a1a17-us20
//1315d17038 listid
