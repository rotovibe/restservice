var express = require('express');

var routes = (Book) => {
    var bookRouter = express.Router();

var bookController = require('../controllers/bookController')(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('no book found!');
            }
        });
    });

    bookRouter.route('/:bookId')
        .get((req, res) => {
            res.json(req.book);
        })
        .put((req, res) => {
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;

            req.book.save((err) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.book);
            });
        })
        .patch((req, res) => {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save((err) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.book);
            });
        })
        .delete((req, res) => {
            req.book.remove((err) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(204).send('removed!');
            });
        });

    return bookRouter;
};

module.exports = routes;