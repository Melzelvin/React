'Use strict'//Permite mejores practicas con desarrollo de JavaScript

var mongoose = require('mongoose');//Cargamos el modulo de mongoose y require para cargar un modulo d nodejs
var app = require('./app');//asi se cargar los modulos creados manulmente
var port = '3900';

mongoose.set('useFindAndModify', false);//descativamos forma de trabajar con ciertos metodos en la base de datos, antigua fornzando
mongoose.Promise = global.Promise;//Permite evitar ciertos fallos a la hora de conectarnos o usar diferentes cosas
//conexion a mongose con el metodo conect  utilizando una promesa
//apri_rest_blog es la base de datos creada
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log('Conexion a la base de datos Exitosa')
        //Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port, () => { //pongo app porque tengo express y utilizo el metodo listen, Paso dos parametros, primero el puerto, segundo una funcion de callback para hacer lo que quiera hacer
            console.log('Servidor corriendo en http://localhost:' + port);

        });
    });
