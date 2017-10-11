var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/daniel', { useMongoClient: true });
autoIncrement.initialize(mongoose.connection);

var ContactSchema = new mongoose.Schema({
    id: Number,
    name: String,
    update: Date
});

ContactSchema.plugin(autoIncrement.plugin, { model: 'Contact', field: 'id' });
module.exports = mongoose.model('Contact', ContactSchema);