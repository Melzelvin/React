//Es un clase definimos todos los metodos y rutas relacionadas con articulos que tendra el API
'use strict'
var validator = require('validator');// Validamos los datos en el metodo save importando el modulo validator.
var fs = require('fs'); //Borra imagenes guardadas ante de suber en la ruta upload\articles
var path = require('path'); //Modulo de NodeJS para sacarr el path o ruta de un archivos en el sistema de archivos del servior
var Article = require('../models/article'); //Cargamos o importamos el modelo, es la calse que puedo crear y grdar los objetos con la data, con la cual es nuestro modelo y tenemos la conexion directa a utilizar metodos que interactuan con la base de datos 


var controller = {
    datosCurso: (req, res) => {
          var hola=  req.body;

        return res.status(200).send({
            curso: 'Master en Framework JS',
            autor: 'Marcos Lopez',
            url: 'marcoslopezweb.com',
            hola
        });
    },
        test: (req, res) => {   //Aqui creamos mas metodos
            return res.status(200).send({
                message: 'Soy la acción test de mi controlador de articulos'
            });
        },
        save: (req, res) => {
        //Recoger parametros Post
        var params = req.body; //Recoger lo que nos lelgue por el body
        //Validar datos(validator)
        try{
            var validate_title = !validator.isEmpty(params.title);//buscar libreria en la web validator node, hay simnumero de validaciones como email etc
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_title && validate_content){
            //Crear el objeto a guardar
            var article= new Article();
            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;
            //Guardar el arituclo
            article.save((err, articleStored) => {
                if(err || !articleStored){
                    return res.status(404).send({
                        status:'error',
                        message:'El articulo no se ha guardado!!!'
                    });
                }
                 //Devolver una respuesta                    
                    return res.status(200).send({
                    status:'Succes',
                    article: articleStored
                });
            });          
            }else {
                return res.status(200).send({
                status: 'error',
                message:'Los datos no son validos!!!'
                });
            }
      },
      getArticles: (req, res) => {
        var query = Article.find({});

        var last=req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }    
        //find
              //Article.find({}).exec((err, articles)=>{ busca los articulos
             //Article.find({}).sort('-_id').exec((err, articles)=>{//busca y los ordena de menor a mayor
             query.sort('-_id').exec((err, articles)=>{ //busca y los ordena de mayor a menor
                if(err) {
                    return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos!!!'
                    });                       
      }

      if(!articles) {
        return res.status(404).send({
        status: 'error',
        message: 'No hay articulos para mostrar!!!'
        });                       
}
       return res.status(200).send({
          status: 'success',
          articles
       });
    });
 },
      getArticle: (req, res)=> {
          //Recoger el id de la URL
          var articleId= req.params.id;
          //Comprobar de que existe
          if(!articleId || articleId==null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo!!!'
            });
          }
          //Buscar el articulo
          Article.findById(articleId, (err, article) => {
              if(err || !article){
                  return res.status(404).send({
                      status: 'error',
                      message: 'No existe el articulo!!!'
                  });
              }
          
          //Devolverlo en json
        return res.status(200).send({
            status: 'success',
            article
        });
      });
    },
    update: (req, res)=> {
        //Recoger el id del articulo por la url
        var articleId = req.params.id;
        //Recoger los datos que llegan por put
        var params= req.body;
        //Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content=!validator.isEmpty(params.content);
        }catch(err){
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar!!!'
            });
        }

        if(validate_title && validate_content){
        //Find and update    
        Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al actualizar!!!'
                    });  
            }
            if(!articleUpdated){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo!!!'
                    });  
            }
            return res.status(200).send({
                status: 'success',
                article: articleUpdated
                });  
        });
        }else {
        //Devolver respuesta
        return res.status(200).send({
        status: 'error',
        message: 'La validacion no es correcta!!!'
        });
        }            
    },
    delete: (req, res) => {
        //Recoger el id de la url
        var articleId = req.params.id;
        
        //Find and deleted 
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Erro al borrar!!!'
                });
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo posiblemnte no exista!!!'
                });
            }
            return res.status(404).send({
                status: 'sucess',
                article: articleRemoved
            });
        });
    },
    upload: (req, res) =>{
        //COnfigurar el modulo connet multiparty router/article.js(hecho)
        
        //Recoger el fichero de la peticion
        var file_name = 'Imagen no subida...';
        if(!req.files) { //Verificamos si la imagen nos llega
            return res.status(404).send({
                status: 'error',
                message: file_names
            });
        }
        //Conseguir el nombre y la extencion del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');
        /*ADVERTENCIA EN LINUX O MAC SE COLOCA SOLO UNA DIAGONAL NORMLA ('/')*/
        //var file_split= file_path.split('/');
        //Nombre del archivo
        var file_name = file_split[2];
        
        //Extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1]; //Asi conseguimos el nomnre para guardarlo a la DB y la extension para validar si es imagen

        //Comprobar la extension, solo imagenes, si no es valido borrar el fichero
        if(file_ext != 'png' && file_ext !='jpg' && file_ext !='jpeg' && file_ext !='gif'){
            //borrar el archivo subido
            fs.unlink(file_path, (err)=>{  //borra laa imagen en la ruta fisica del disco duro del servidor
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida!!'
                });
            }); 
        }else{
            //Si todo es valido, sacando id de la url
            var articleId=req.params.id;
            //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            Article.findByIdAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, articleUpdated)=>{
                if(err || !articleUpdated){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al guardar la imagen de articulo!!!'
                        
                    });    
                }
                
                return res.status(200).send({
                    status: 'Success',
                    article: articleUpdated,
                    
                });    
            });

            
        }              
    },//End upload file

    getImage: (req, res) =>{
        var file = req.params.image;//Sacamos el fichero que nos llega por el url
        var path_file = './upload/articles/'+file; //Sacamos el Path(ruta) completo 
        fs.exists(path_file, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file)); //Utilizo la libreria del path, voy a devolver el fichero en crudo para agregarlo en la etiqueta de imagen
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe!!!'
                });
            }  
        }); //Coprobamos si este metodo existe
        
    },

    search: (req, res) => {
        //Sacar el string a buscar
        var searchString =req.params.search;
        //Find or para hacer varias condiciones de busqueda(Title y Contentc)
        Article.find({"$or":[
            { "title":{ "$regex": searchString, "$options": "i"}}, //Mongose, aqui metemos un objeto con una condicion, 
            { "contect":{ "$regex": searchString, "$options": "i"}}  //significa que si la cadena(searchString) esta INCLUIDO(i) dentro del titulo(title) o contenido(contentc), sacamos los articulos obtenidos         
        ]})           
        
        .sort([['date', 'descending']])//para ordenar en este caso por fecha y orden descendete
        .exec((err, articles) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la peticion!!!'
                });

            }
            if(!articles || articles.length<=0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que coicidan con tu busqueda!!!'
                });

            }
            return res.status(200).send({
                status: 'succes',
                articles
            });
        });

        
}
};//Final del controller
module.exports = controller;
/*return res.status(200).send({
    status: 'error',
    message: 'La validacion no es correcta!!!'
});*/












