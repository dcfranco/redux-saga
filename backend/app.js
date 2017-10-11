var Contact = require('./schemas/Contacts');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/contacts', function(req, res){
    Contact.find((err, data) => res.json({ contacts: data }));
});

app.get('/contact/:id', function(req, res){
    Contact.find({id: parseInt(req.params.id)}, (err, data) => res.json({ contact: data }));
});

app.post('/contact', function(req, res){
    let contact = new Contact(req.body);
    contact.save((err, data) => res.json({ contact: data }));
});

app.put('/contact', function(req, res){
    let contact = req.body;
    Contact.findByIdAndUpdate(contact._id, contact, { 'new': true }, (err, data) => res.json({ contact: data }));
});

app.delete('/contact/:id', function(req, res){
    let _id = req.params.id;
    Contact.findByIdAndRemove(_id, () => res.json({ result: true }));
});

app.listen(5000, function () {
    console.log('Saga-Backend listening on port 5000!');
});