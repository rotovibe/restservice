var should = require('should');
var sinon = require('sinon');

describe('Book controller tests:', () => {
    describe('Post', () => {
        it('should not allow an empty title on POST', () => {
            var Book = (book) => { this.save = () => { } };
            
            var req = {
                body: {
                    author: 'Jon'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../Controllers/bookController')(Book);
            bookController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'bad status' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})