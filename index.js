'use strict'

var http=require('http');

var app=require('./app');
var port=3000;
var server=http.createServer(app);
const {connectDB}=require('./db')
connectDB();

/*'mongodb://localhost:27017/api_rest'*/
/*
mongoose.Promise=global.Promise;

mongoose.connect('mongosh "mongodb+srv://api.5qluf2r.mongodb.net/myFirstDatabase" --apiVersion 1 --username juan',{useNewUrlParser:true})
        .then(db=> console.log('db connect'))
        .catch(error =>console.log(error));*/

app.set('port', process.env.PORT||port);
server.listen(app.get('port'),()=>{
    
    console.log(`server on port ${app.get('port')}`);
})
