'use strict'
const { query } = require('express');
var validator=require('validator');
var model=require('../Models/Arti');
var fs=require('fs');
var path=require('path');
const { error } = require('console');
const { exists } = require('../Models/Arti');

var controller={

     datos:(req,res)=>{
        var hola=req.body.hola;
        return res.status(200).send({
            autor:'juan sebastian',
            edad:'23',
            hola
        });},
    test:(req,res)=>{
        
        return res.status(200).send({
            message:'todo bien'
        });},
    save:(req,res)=>{
        var params=req.body;
        try {
           var valnom=!validator.isEmpty(params.Nombre);
           var valape=!validator.isEmpty(params.Apellido);
        } catch (error) {
            return res.status(404).send({
                status:'error',
                message:'datos no validos'
            });
        }
        

        if (valnom && valape) {
            var persona =new model();
            persona.Nombre=params.Nombre;
            persona.Apellido=params.Apellido;
            persona.Edad=params.Edad;
            persona.img=null;
            persona.save((error,personastored)=>{
                if(error||!personastored){
                    return res.status(500).send({
                        status:'error',
                        message:'no se pudo guardar'
                    });
                }
                return res.status(200).send({
                    status:'success',
                    persona
                });

            });
            
            
        } else {

            return res.status(500).send({
                status:'error',
                message:'faltan datos'
            });
        }
    },
    Getpersonas:(req,res)=>{
        var last=req.params.last;
        var query=model.find({});
        if(last || last !=undefined){
            query.limit(5);

        }
        query.sort('-_id').exec((error,personas)=>{
            if(error){
                return res.status(500).send({
                    status:'error',
                    message:'algo fallo'
                });

            }
            if(!personas){
                return res.status(500).send({
                    status:'error',
                    message:'no hay personas'
                });
            }
            return res.status(500).send({
                status:'succes',
                personas
            });
        })

    },
    getbyid:(req,res)=>{
        var iD =req.params.id;
    
        model.findById(iD,(error,persona)=>{
            if(error){
                return res.status(500).send({
                    status:'error',
                    message:'mal'
                });

            }
            if(!persona){
                return res.status(500).send({
                    status:'error',
                    message:'no hay persona'
                });
            }
            return res.status(200).send({
                status:'succes',
                persona
            });
        });
    

    },
    delete:(req,res)=>{
        var iD=req.params.id;
        model.findByIdAndDelete(iD,(error,personas)=>{
            if(error){
                return res.status(500).send({
                    status:'error',
                    message:'algo fallo'
                });

            }
            if(!personas){
                return res.status(500).send({
                    status:'error',
                    message:'no hay personas'
                });
            }
            return res.status(500).send({
                status:'succes',
                personas
            });
        })

    },
    getbyid:(req,res)=>{
        var iD =req.params.id;
    
        model.findById(iD,(error,persona)=>{
            if(error){
                return res.status(500).send({
                    status:'error',
                    message:'mal'
                });

            }
            if(!persona){
                return res.status(500).send({
                    status:'error',
                    message:'no hay persona'
                });
            }
            return res.status(200).send({
                status:'succes',
                message:'confirmado'
            });
        });

    },
    update:(req,res)=>{
        var id=req.params.id;
        var params=req.body;
        try {
            var valnom=!validator.isEmpty(params.Nombre);
            var valape=!validator.isEmpty(params.Apellido);
            var valeda=!validator.isEmpty(params.Edad);
         } catch (error) {
             return res.status(404).send({
                 status:'error',
                 message:'dato malos'
            });
        }
        if(valnom && valape && valeda){
            model.findOneAndUpdate({_id:id},params,{new:true},(error,persona)=>{
                if(error){
                    return res.status(404).send({
                        status:'error',
                        message:'datos no validos'
                   });  
                }
                if(!persona){
                    return res.status(404).send({
                        status:'error',
                        message:'persona no encontrada'
                   });
                }
                return res.status(200).send({
                    status:'success',
                    persona:persona
               });

            })

        }else{
            return res.status(404).send({
                status:'error',
                message:'datos no validos'
           });

        }

    },
    upload:(req,res)=>{
        if(!req.files){
            return res.status(404).send({
                status:'error',
                message:'no hay imagen'
           });
        }
        var file_path=req.files.files.path;
        var filename=file_path.split('\\');
        var filename=filename[2];
        console.log(filename);
        var ext=filename.split('.');
        var ext=ext[1]
        if(ext!='jpg' && ext!='png'){
            fs.unlink(file_path,(error)=>{
                
                return res.status(404).send({
                    status:'error',
                    message:'erro archivo no valido'
    
                });
            });

        }else{
            var id=req.params.id;
            model.findOneAndUpdate({_id:id},{img:filename},{new:true},(error,persona)=>{
                if(error){
                    return res.status(404).send({
                        status:'error',
                        message:'no se pudo subir'
        
                    });
                }
                if(!persona){
                    return res.status(404).send({
                        status:'error',
                        message:'persona no encontrada'
        
                    });
                }
                return res.status(200).send({
                    status:'success',
                    persona:persona
                });

            })
        }
    },
    domload:(req,res)=>{
        var id=req.params.id;
        var dir='./upload/images/'
        model.findById(id,(error,persona)=>{
            if(error){
                return res.status(404).send({
                    status:'error',
                    message:'id incorrecta'
    
                });
            }
            if(!persona){
                return res.status(404).send({
                    status:'error',
                    message:'persona no encontrada'
    
                });
            }
            var img=persona.img;
            fs.exists(dir+img,(exists)=>{
                console.log(exists)
                if(exists){
                    return res.sendFile(path.resolve(dir+img));
                }else{
                    return res.status(200).send({
                        status:'error',
                        error:'imagen no ah sido cargada'
                    });
                }

            })
            


        })
    
        

    },
    search:(req,res)=>{
        var searchstring=req.params.search;
       
        console.log(searchstring)
        var query={"$or":[{Nombre:searchstring},{Apellido:searchstring},{Edad:searchstring}]};
        
        model.find(query)
                            .sort([['date','descending']])
                            .exec((error,persona)=>{
                                if(error){
                                    return res.status(500).send({
                                        status:'error',
                                        message:'ah ocurrido un error',
                                    
                                    });
                                }
                                if(!persona){
                                    return res.status(500).send({
                                        status:'error',
                                        message:'no existe alguien asi'
                                    });  
                                }
                                return res.status(200).send({
                                    status:'success',
                                    personas:persona
                                });

                            })

    }
};

module.exports=controller;