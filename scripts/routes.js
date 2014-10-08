var mongoClient = require('mongodb').MongoClient;
var constant = require('../constant.js');

//-------- Show All Books---------------start
exports.book = function (req, res) {
    console.log('show book');
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        book.find().toArray(function (err, result) {
            console.log(result);
            res.render('../views/dynamic.ejs', { Books: result });           
        });
    });
};
//-------- Show All Books------------------end

//-------- Adding a Book ----------------- start
exports.addBook = function (req, res) {
    res.render('../views/addBook.ejs');
};

exports.addBookData = function (req, res) {
    console.log('Add book');
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        var bookdata = {};
        bookdata.Isbn = req.body.isbn;
        bookdata.Title = req.body.title;
        bookdata.Author = req.body.author;
        bookdata.Publisher = req.body.publisher;
        bookdata.PublicationDate = new Date(req.body.publicationdate);
        bookdata.Genre = req.body.genre;
        bookdata.Price = req.body.price;
        book.save(bookdata, function (err) {
            if (err)
                console.log("error");
        });
        console.log(JSON.stringify(bookdata));
        res.redirect('/');
    });
};

//-------- Adding a Book ----------------- end

//----------- Edit & Update---------------- start

exports.editBook = function (req, res) {
    var bookid = req.params.id;
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        book.findOne({ "Isbn": bookid }, function (err, result) {
            console.log(result);
            res.render('../views/editBook.ejs', { Books: result });
        });
    });
};

exports.updateBookData = function (req, res) {
    console.log('Update book');
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        var bookdata = {};
        bookdata.Isbn = req.body.Isbn;
        bookdata.Title = req.body.Title;
        bookdata.Author = req.body.author;
        bookdata.Publisher = req.body.publisher;
        bookdata.PublicationDate = new Date(req.body.publicationdate);
        bookdata.Genre = req.body.genre;
        bookdata.Price = req.body.price;
        book.update({ "Isbn": bookdata.Isbn }, { $set: { 'Title': bookdata.Title, 'Author': bookdata.Author, 'Publisher': bookdata.Publisher, 'PublicationDate': bookdata.PublicationDate, 'Genre': bookdata.Genre, 'Price': bookdata.Price } }, function (err) {
            if (err)
                console.log("error update");
        });
        console.log(JSON.stringify(bookdata));
        res.redirect('/');
    });
};

//----------- Edit & Update---------------- end


//------------Detail-----------------------start

exports.detailBook = function (req, res) {
    var bookid = req.params.id;
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        book.findOne({ "Isbn": bookid }, function (err, result) {
            console.log(result);
            res.render('../views/detailBook.ejs', { Books: result });
        });
    });
};

//-------------Detail------------------------end

//------------Delete Book-----------------------start

exports.deleteBook = function (req, res) {
    var bookid = req.params.id;
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        book.findOne({ "Isbn": bookid }, function (err, result) {
            console.log(result);
            res.render('../views/deleteBook.ejs', { Books: result });
        });
    });
};

exports.deleteBookRecord = function (req, res) {
    var bookid = req.query.Isbn;
    console.log('delete');
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        book.remove({ "Isbn": bookid }, function (err, result) {
            console.log(result);
            res.redirect('/');
        });
    });
};

//-------------------delete Book------------------end

//-------------------Search-------------------start
exports.searchBookData = function (req, res) {
    console.log('search book');
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var booksearch = {};
        booksearch.Isbn = req.body.Isbn != ""? req.body.Isbn:"";
        booksearch.Title = req.body.Title != ""? req.body.Title + "*":"";
        booksearch.Author = req.body.author != ""? req.body.author + "*":"";
        var book = db.collection(constant.collection.bookCollection);
        var query = { "Isbn": new RegExp(booksearch.Isbn,'i'), "Title": new RegExp(booksearch.Title,'i'), "Author": new RegExp(booksearch.Author,'i') };
        book.find(query).toArray(function (err, result) {
            console.log(result);
            var search = {};
            search.Isbn = req.body.Isbn;
            search.Title = req.body.Title;
            search.Author = req.body.author;
            res.render('../views/searchBook.ejs', { Books: result , Search: search });          
        });
    });
}

exports.search = function (req, res) {
    console.log('search book page');
    mongoClient.connect(constant.uriPath.mongoDBUrl, function (err, db) {
        var book = db.collection(constant.collection.bookCollection);
        book.find().toArray(function (err, result) {
            console.log(result);
            var search = {};
            search.Isbn = "";
            search.Title = "";
            search.Author = "";
            res.render('../views/searchBook.ejs', { Books: result, Search: search });           
        });
    });
};
//-----------------Search-------------------------end

exports.index = function (req, res) {
    res.sendfile('views/index.html');
};

module.exports.dynamic = function (req, res) {
    res.render('dynamic.ejs');
};

module.exports.postName = function (req, res) {
    var name = req.body.name;
    res.send('Hello ' + name + '!!!');
};

var model = require('../model/models.js');
module.exports.createCurrency = function (req, res) {
    var currency = new model.Currency(
{
        name: req.body.name,
        value: 4.5
    });
    
    currency.save(function (err) {
        if (err)
            res.send('error');
        else
            res.send('success mongoose');
    });
};