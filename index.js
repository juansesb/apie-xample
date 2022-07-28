'use strict'
var mongoose=require('mongoose');

var app=require('./app');
var port=3000;
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest',{useNewUrlParser:true})
        .then(()=>{
            console.log("hola")
            app.listen(port,()=>{
                console.log("servidor corriendo en "+port);
            })
        });
