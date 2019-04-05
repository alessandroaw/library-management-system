const express = require ('express');
require('./db/mongoose');


// models
const {ObjectID} = require('mongodb');

// router
const  bookRouter = require('./routers/book');

const app = express();
const port = process.env.port || 3333;

app.use(express.json());
app.use(bookRouter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
