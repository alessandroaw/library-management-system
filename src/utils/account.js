// Create a Transport instance using nodemailer
var nodemailer = require('nodemailer');
// sails.log.debug('try to send mail');
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      XOAuth2: {
        user: "18216002@std.stei.itb.ac.id", // Your gmail address.
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    }
  });

var sendBorrowReceipt = (nama, email, books) => {
  var temp = '';
  console.log(nama + email + books)

  if(!Array.isArray(books)){
    books = [books];
  }

  books.forEach((book) => {
    temp += `<li>${book.title} by ${book.author}</li>`
  });

  const htmlBody = `
  <p>Halo ${nama},</p>
  <p>Termakasih telah melakukan peminjaman buku di perpustakaan ITB.<p>
  <p>Berikut adalah buku yang kamu pinjam: </p>
  <ul>
    ${temp}
  </ul>
  <hr>
  <p>Terima kasih</p>
  <p>Library Management System</p>`
  
  var mailOptions = {
      from: '18216002@std.stei.itb.ac.id', // sendier address
      to: email, // list of receivers
      subject: 'Peminjaman Buku Perpustakaan', // Subject line
      html: htmlBody // html body
    };
  // send mail
  
  smtpTransport.sendMail(mailOptions, function(error, info) {
    if (error) {
    console.log(error);
    
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response);
    }
    smtpTransport.close();
  });
}

var sendReturnReceipt = (nama, email, books) => {
  console.log(nama + email + books)
  var temp = '';
  if(!Array.isArray(books)){
    books = [books];
  }

  books.forEach((book) => {
    temp += `<li>${book.title} by ${book.author}</li>`
  });

  const htmlBody = `
  <p>Halo ${nama},</p>
  <p>Termakasih telah melakukan pengembalian buku di perpustakaan ITB.<p>
  <p>Berikut adalah buku yang kamu kembalikan: </p>
  <ul>
    ${temp}
  </ul>
  <hr>
  <p>Terima kasih</p>
  <p>Library Management System</p>`
  
  var mailOptions = {
      from: '18216002@std.stei.itb.ac.id', // sendier address
      to: email, // list of receivers
      subject: 'Pengembalian Buku Perpustakaan', // Subject line
      html: htmlBody // html body
    };
  // send mail
  
  smtpTransport.sendMail(mailOptions, function(error, info) {
    if (error) {
    console.log(error);
    
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response);
    }
    smtpTransport.close();
  });
}  

module.exports = {sendBorrowReceipt, sendReturnReceipt};