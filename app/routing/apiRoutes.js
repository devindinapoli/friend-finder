//require path & friends.js (holds my friends array)
var path = require("path");
var friends = require("../data/friends.js");

//exporting...
module.exports = function(app){
    //gets the information from friends..
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });
    //Posts to the friends api
    app.post("/api/friends", function(req,res){

        var userAnswers = req.body;

        var userScores = userAnswers.scores;
        //start the algorithm to find closest "match"
        var matchName = "";
        var matchPic = "";
        var totalDiff = 1000;

        for (var i = 0; i < friends.length; i++) {

            var diff = 0;
            for (var j = 0; j < userScores.length; j++) {
                diff = Math.abs(friends[i].scores[j] - userScores[j]);
            }

            if (diff < totalDiff) {
                totalDiff = diff;
                matchName = friends[i].name;
                matchPic = friends[i].photo;
            }
        }
        //This will push the information the user gave into the friends array...
        friends.push(userAnswers);
        //Then this will give the required info for my modal to show up (Won't show up if there is no information )
        res.json({status: "OK", matchName: matchName, matchPic: matchPic});
    })
}