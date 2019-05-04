const mongoose = require('mongoose');

var nextWeek = () => {
    today = new Date();
    return new Date(today.getTime() + 7*24*60*60*1000);
}

var PinjamSchema = new mongoose.Schema({
  _idMahasiswa:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mahasiswa',
    required: true
	},
  _idBuku:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buku',
    required: true
	},
  tanggalPinjam: {
    type: Date,
    default: new Date()
  },
  deadlinePengembalian: {
      type: Date,
      default: nextWeek()
  },
  tanggalPengembalian: {
    type: Date,
    default: null
  },
  isDikembalikan: {
    type: Boolean,
    default: false
  }
});

var Pinjam = mongoose.model('pinjams', PinjamSchema);

module.exports = {Pinjam};
