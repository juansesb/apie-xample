'use strict'
var mongoose=require('mongoose');
var schema=mongoose.Schema;
var articleschema=schema({
    
    Nombre:String,
    Apellido:String,
    Edad:String,
    Date:{type:Date, default:Date.now},
    img:String

});
module.exports=mongoose.model('arti',articleschema);