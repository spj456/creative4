var express = require('express');
var fs = require('fs');
var request = require('request')
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'public' });
})

router.post('/addItem', function (req, res) {
    console.log("adds item");
    fs.appendFile('items.dat.txt', req.query.item, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    fs.appendFile('quantity.dat.txt', req.query.quantity, function (err) {
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
            var quantityresult = [];
            for (var i = 0; i < items.length; i++) {
                var result = items[i].search(req.query.item);
                if (result != -1) {
                    items[i] = req.query.quantity;
                }
            }
            res.status(200).json(jsonresult);
        });
    }
);
})

router.get('/deleteItem', function (req, res) {
    console.log("deletes item");
    console.log("changes quantity");
    fs.readFile(__dirname + '/items.dat.txt', function (err, data) {
        if (err) throw err;
        fs.readFile(__dirname + '/quantity.dat.txt', function (err, data2) {
            if (err) throw err;
            var quantities = data2.toString().split("\n");
            var items = data.toString().split("\n");
            var jsonresult = [];
            for (var i = 0; i < items.length; i++) {
                var result = items[i].search(req.query.quantity);
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
            var myRe = new RegExp("^" + req.query.quantity);
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

