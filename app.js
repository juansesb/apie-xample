'use strict'
var express=require('express');
var bodyparser=require('body-parser')

var app=express();
var route=require('./routes/artrute');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/',route);
/*
app.get('/probando',(req,res)=>{
    return res.status(200).send({
        autor:'juan sebastian',
        edad:'23'
    }
        
        
    );

});*/
module.exports=app;
