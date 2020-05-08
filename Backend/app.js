//aqui cargamos exprees, recibimos las peticiones, las  rutas, mirewall
'use strict'
//Cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');//recibir las peticiones y despues se utlizan estos objetos para JavaScript
//Ejecutr expres para poder trabajr con el http
var app = express();

//Cargar ficheros rutas
var article_routes = require('./routes/article');
//Cargar Middlewares, se esjecuta antes los datos y despues las rutas
app.use(bodyParser.urlencoded({extended:false}));//Cargo y tulizo el bodyparse
app.use(bodyParser.json());//Convierte cualquier peticion a un Json osea aun objeto JavaScript para poder usarlo
//Cor, pera peticiones del frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});//Es un middelware que se ejecuta antes de las rutas o metodos que tengamos y permite pasar, permite que cualquier cliente 
//haga peticiones ajax, metodos post delete, put, etc y se comunica nuestra API con nuestra fronted




//Aniadir prefijos a rutas/cargar//
app.use('/api', article_routes); //funciona aniadiendo mas rutas en este caso localhost:3900/api/datos-curso

//app.use('/', article_routers); funciona sobre escribiendo la ruta localhost:3900/datos-curso
//app.use(article_routers); de esta manera tambein funciona la ruta localhost:3900/datos-curso
//Ruta o metodo de prueba para el API REST
/*desactivado clase 72,Desactivado clase 72 lo llevamos al controllador/article.js..... app.post('/datos-curso', function (req, res) {  //probando es una rut que aniadi, y en la funcion dos parametros req son los parametros que recibo y res lo que devuelvo
    //app.get('/probando',function(req, res){ 
    //app.get('/probando',(req, res)=>{ de estas dos maneras funciona, la de aqui se llaa funciones de flecha    
    //console.log("Hola Mundo"); este hola mundo era para saber si funcionaba en la consola nmp
    //devulevo una lista html utilizando JS
    return res.status(200).send({
        curso: 'Master en Framework',
        autor: 'Marcos Lopez',
        url: 'marcoslopezweb.com', //de esta manera me devuelve un JSON
    });
});     //devuelvo un JSON*/
/*return res.status(200).send( `  
    <ul>
        <li>NodeJs</li>
        <li>Angular</li>
        <li>React</li>
        <li>Vue</li>
    </ul>
    `);
}); Desactivado clase 72 lo llevamos al controllador/article.js*/

//Exportar modlos(fichero actual)
module.exports = app; //Permite exportar el modulo para usar el objeto creado fuera del fichero, lo cargamos en el index.js
