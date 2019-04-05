const express = require('express')
const {Book} = require('../models/book')
const router = new express.Router();

router.get('/books', async (req, res) => {

    Book.find({}).then((books) => {
        res.send(books);
    }).catch((e) => {
        res.status(400).send(e)
    })
});

module.exports = router;