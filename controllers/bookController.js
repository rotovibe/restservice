var bookController = function (Book) {
    var post = (req, res) => {
        var book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('title is required.');
        }
        else {
            book.save();
            res.status(201);
            res.send(book);
        };
    }

    var get = (req, res) => {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    };

    return {
        post: post,
        get: get
    }
}

module.exports = bookController;