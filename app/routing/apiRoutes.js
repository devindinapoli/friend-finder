var path = require("path");

var friends = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });

    app.post("/api/friends", function(req,res){

        var userAnswers = req.body;

        var userScores = userAnswers.scores;

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
        friends.push(userAnswers);
        res.json({status: "OK", matchName: matchName, matchPic: matchPic});
    })
}