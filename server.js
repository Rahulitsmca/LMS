var express = require('express');
var routes = require('./scripts/routes.js');
var connect = require('connect');
var mongoose = require('mongoose');
var app = express();
var port = process.env.port || 8083;
exports.app = app;
app.listen(port, function () {
    console.log('listening on port 8083...');
	console.log('URL to Test Application: '+'http://localhost:8083/');
});
app.use(connect.urlencoded());
app.set('views', './views');
app.set('Content-Type', 'text/html');
app.get('/', routes.book);

//----- Inserting --------
app.post('/create', routes.addBookData);
app.get('/create', routes.addBook);

//------Edit & Update ---------
app.post('/edit', routes.updateBookData);
app.get('/edit/:id', routes.editBook);


//------Detail ---------
app.get('/detail/:id', routes.detailBook);

//-----Delete--------------
app.get('/delete/:id', routes.deleteBook);
app.get('/delete/?', routes.deleteBookRecord);

//-----------Search---------------------
//----- Inserting --------
app.post('/searchBook', routes.searchBookData);
app.get('/searchBook', routes.search);


////---mongoose database connectivity---
//mongoose.connect('mongodb://localhost:27017/db');
//app.post('/createCurrency', routes.createCurrency);