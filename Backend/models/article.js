//El modelo(clase para crear diferents objetos) que voy a crear para mi apicacion en concreto
'use sritct' //Para activar funcionalidades de JS

var mongoose=require('mongoose') ;  //Cargo el modulo ongoose
var Schema= mongoose.Schema; //Para utilizar el objeto de este tipo

var ArticleSchema=Schema({       //Defino la estructura y documento en el Backen pasandole un objeto JSON
    title: String,
    content: String,
    date: { type: Date, default: Date.now},
    image: String
});
//Mongoose articles guarda documentos de este tipo y con estructura dentro de la coleccion
module.exports= mongoose.model('Article', ArticleSchema);
