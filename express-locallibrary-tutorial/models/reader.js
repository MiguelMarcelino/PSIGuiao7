var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReaderSchema = new Schema(
    {
        nome: { type: String, required: true, max: 30 },
        numero_telefone: { type: String, required: true },
        books: [{ type: Schema.Types.ObjectId, ref: 'BookInstance' }],
    }
);

// Virtual for reader's URL
ReaderSchema
    .virtual('url')
    .get(function () {
        return '/catalog/reader/' + this._id;
    });

//Export reader
module.exports = mongoose.model('Reader', ReaderSchema);