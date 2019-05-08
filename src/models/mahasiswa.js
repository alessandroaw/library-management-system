const mongoose = require('mongoose');
const validator = require('validator');


var MahasiswaSchema = new mongoose.Schema({
    rfid:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1
    },
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
    email:{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate:{
			validator:validator.isEmail,
			message:"{VALUE} is not a valid email"
		}
    }
});

MahasiswaSchema.statics.findByRFID = async function (rfid){
    const Mahasiswa = this;
    
    try {
        var mahasiswa = await Mahasiswa.findOne({rfid});
        if(!mahasiswa) throw new Error('Mahasiswa not found');
        return mahasiswa;        

    } catch (e) {
        throw e
    }

};

const Mahasiswa = mongoose.model('mahasiswas', MahasiswaSchema);

module.exports = Mahasiswa;
