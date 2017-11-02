var express = require('express');
var fs = require('fs');
var request = require('request')
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'public' });
})

router.get('/addItem', function (req, res) {
    console.log("adds item");
    fs.appendFile('items.dat.txt', req.query.q, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
})

router.get('/addItemQuantity', function (req, res) {
    console.log("adds item");
    fs.appendFile('quantity.dat.txt', req.query.q, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
})

router.get('/changeQuantiy', function (req, res) {
    console.log("changes quantity");
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

router.get('/deleteItem', function (req, res) {
    console.log("deletes item");
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

router.get('/getItem', function (req, res) {
    console.log("gets item");
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

module.exports = router;

