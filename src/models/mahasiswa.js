const mongoose = require('mongoose');
var MahasiswaSchema = new mongoose.Schema({
    nim:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1
    },
    nama:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    prodi:{
        type: String,
        default: 'Sistem dan Teknologi Informasi',
        required: true,
        trim: true,
        minlength: 1
    }
});

MahasiswaSchema.statics.findByNim = function (nim){
    var Mahasiswa = this;

	return Mahasiswa.findOne({nim}).then((Mahasiswa) => {
		if(!Mahasiswa){
			return Promise.reject();
		}
        return Promise.resolve(Mahasiswa);
    }).catch( (e) => {
        return Promise.reject(e);
    })
};

var Mahasiswa = mongoose.model('mahasiswas', MahasiswaSchema);

module.exports = {Mahasiswa};
