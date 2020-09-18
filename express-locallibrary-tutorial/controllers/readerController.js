var Reader = require('../models/reader');

// Mostrar lista de Readers
exports.reader_list = function(req, res, next) {
    Reader.find()
        .populate('reader')
        .exec(function(err, list_reader) {
            if (err) { return next(err); }
            // res.render('reader_list', { title: 'Reader List', reader_list: list_reader });
            res.json({ title: 'Reader List', reader_list: list_reader });
        });
};

exports.all_readers = function(req, res, next) {
    Reader.find()
        .populate('reader')
        .exec(function(err, list_reader) {
            if (err) { return next(err); }
            res.send(list_reader);
        });
};

exports.reader_detail = function(req, res, next) {

    Reader.findById(req.params.id)
        .populate('books')
        .exec(function(err, reader) {
            if (err) { return next(err); }
            if (reader == null) {
                var err = new Error('Reader not found');
                err.status = 404;
                return next(err);
            }
            // res.render('reader_detail', { title: 'Reader Detail', reader: reader, reader_books: reader.books });
            res.json({ title: 'Reader Detail', reader: reader, reader_books: reader.books });
        })

};

// FUNCAO 1
// Todos os livros requesitados por um determinado utilizador
// (identificado por um id)
exports.books_from_reader = function(req, res, next) {
    Reader.findById(req.params.id)
        .populate('books')
        .exec(function(err, reader) {
            if (err) { return next(err); }
            if (reader == null) {
                var err = new Error('Reader not found');
                err.status = 404;
                return next(err);
            }

            res.send(reader.books);
        })
};


// FUNCAO 2
// Todas as pessoas que requesitaram um determinado livro 
// (identificado pelo seu id)
exports.readers_of_book = function(req, res, next) {
    Reader.find({ 'books': req.params.id })
        .populate('books')
        .exec(function(err, readers) {
            if (err) { return next(err); }
            if (readers == null) {
                var err = new Error('Reader not found');
                err.status = 404;
                return next(err);
            }

            res.send(readers);
        })
};