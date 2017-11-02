var express = require('express');
var fs = require('fs');
var request = require('request')
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'public' });
})

router.get('/addItem', function(req, res) {
    console.log("adds item");
    fs.appendFile('message.txt', 'data to append', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
})

router.get('/deleteItem', function(req, res) {

})

router.get('/getItem', function (req, res) {
    fs.readFile(__dirname + '/items.dat.txt', function (err, data) {
        if (err) throw err;
        fs.readFile(__dirname + '/quantity.dat.txt', function (err, data2) {
            if (err) throw err;
            var quantities = data2.toString().split("\n");
            var items = data.toString().split("\n");
            var myRe = new RegExp("^" + req.query.q);
            var jsonresult = [];
            for (var i = 0; i < items.length; i++) {
                var result = items[i].search(myRe);
                if (result != -1) {
                    jsonresult.push({
                        item: items[i],
                        quantity: quantities[i]
                    });
                }
            }
            res.status(200).json(jsonresult);
        });
    }
);
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

