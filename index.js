'use strict'
var mongoose=require('mongoose');
var http=require('http');

var app=require('./app');
var port=3000;
var server=http.createServer(app);

mongoose.Promise=global.Promise;
/*'mongodb://localhost:27017/api_rest'*/
mongoose.connect('mongodb+srv://juandiaz:amoonepiece@cluster0.emfmfbb.mongodb.net/api_rest',{useNewUrlParser:true})
        .then(db=> console.log('db connect'))
        .catch(error =>console.log(error));

app.set('port', process.env.PORT||port);
server.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
})
