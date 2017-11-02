var express = require('express');
var fs = require('fs');
var request = require('request')
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.get('/', function (req, res) {
    res.sendFile('weather.html', { root: 'public' });
})

router.get('/getword', function (req, res, next) {
    console.log("gets a word");
    var myword = "https://owlbot.info/api/v1/dictionary/";
    myword += req.query.q;
    request(myword).pipe(res);
})

router.get('/getcity', function (req, res, next) {
    console.log("getCity");
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        if(err) throw err;
        var cities = data.toString().split("\n");
        var myRe = new RegExp("^" + req.query.q);
        var jsonresult = [];
        for(var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe); 
            if(result != -1) {
                jsonresult.push({city:cities[i]});
            } 
        }
        res.status(200).json(jsonresult);

    }
    );

});


module.exports = router;

