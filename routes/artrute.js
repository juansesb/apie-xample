'use strict'
var express=require('express');
var controller=require('../controller/Articontro');
var router=express.Router();
var multipart=require('connect-multiparty');
var middle=multipart({uploadDir:'./upload/images'});
router.post('/datos',controller.datos);
router.get('/test',controller.test);
router.post('/save',controller.save);
router.get('/getall/:last?',controller.Getpersonas);
router.get('/get/:id',controller.getbyid);
router.delete('/delete/:id',controller.delete);
router.put('/update/:id',controller.update);
router.post('/upload-images/:id', middle,controller.upload);
router.get('/get-images/:id',controller.domload);
router.get('/search/:search',controller.search);

module.exports=router;