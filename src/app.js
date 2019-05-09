const express = require('express');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require("body-parser");
const mongoose = require('./db/mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


const db = mongoose.connection;
const port  = process.env.PORT || 80;


app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Setup path
const publicPathDirectory = path.join(__dirname, '../../application/public');
const viewsPath = path.join(__dirname, '../../application/templates/views')
const partialsPath = path.join(__dirname, '../../application/templates/partials')

// router
const bookRouter = require('./routers/book');
const mahasiswaRouter = require('./routers/mahasiswa')
const recommendationRouter = require('./routers/recommendation')
const adminRouter = require('./routers/admin')
const borrowRouter = require('./routers/borrow')

// setup response parser 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(express.static(publicPathDirectory));

app.get('/', (req,res) => {
  res.render('index-cari.ejs', {
    title:'Home'
  });
});

app.use(bookRouter);
app.use(mahasiswaRouter);
app.use(recommendationRouter);
app.use(adminRouter);
app.use(borrowRouter);


const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const sport = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = sport.pipe(new Readline({ delimiter: '\n' }));


io.on('connection', (socket) => {
  console.log('Connection has been established with browser.');
  socket.on('disconnect', () => {
    console.log('Browser client disconnected from the connection.');
  });
});

sport.on("open", () => {
  console.log('serial port open');
});

parser.on('data', data =>{
  // console.log('got word from arduino:', data);
  io.emit('rfid-tag', data)
});

http.listen(port, () => {
  console.log(`Server is running on port ${port}` );
})