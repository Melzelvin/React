//import React from 'react'; //Importo React el objeto o modulo de React
import React, {Component} from 'react'; //Similar a la declaracion anterior pero mas limpia

//class MiCompenente extends React.Component{    //Defino una clase de JavaScript
class MiComponente extends Component{ //Similiar a la declaracion anterior pero mas limpia
    render(){   //Es el que se encarga de mostrar informacion en pantalla, es mostrar el JSX o el HTML que se va a mostrar al cliente
     let receta = { //Declaro una variable llamada receta con sus elementos de cocina y dentro de aquello tengo mis objetos JSON
            nombre : 'Pizza',
            ingredientes : ['Tomate', 'Queso', 'Jamon cocido'],
            calorias : '400' 
        }
        return( //Todo lo que esta aqui es mi JSX 
            <div className="mi-componente">
            <h1>{'Recetas:' + receta.nombre}</h1>
            <h2>{'Calorias:' + receta.calorias}</h2>
            
            <ol>
            {
                //receta.ingredientes.map((ingrediente, i))
                receta.ingredientes.map((ingrediente, i) => {   //map recorre el arreglo se puede usar un foreach
                    console.log(ingrediente);
                    return (
                        <li key={i}> 
                            {ingrediente}
                        </li>
                    );
            
                })
            }
            </ol>
            <hr/>
            {this.props.saludo &&
            <React.Fragment>
                <h1>Desde una PROP</h1>
                <h3>{this.props.saludo}</h3>
                </React.Fragment>
            }

            </div>
        );
    }
}
//export default MiComponente; //Tengo que exportarlo para poder utilizarlo dentro de otra vista
export default MiComponente;
