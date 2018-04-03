//require path
var path = require("path");
// exporting...
module.exports = function(app){
    //using "get" to set the home page to "/"
    app.get("/", function(req,res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    //using "get" to set the survey page to "/survey"
    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
};