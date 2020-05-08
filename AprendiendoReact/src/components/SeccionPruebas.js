import React, { Component } from 'react';
//import Peliculas from './Peliculas';
import MiComponente from './MiComponente';

class SeccionPruebas extends Component {
contador =0; //Porpiedad d emi clase llamada contadors

/*
constructor(props){    //State propiedades que voy a demostrar en la vista y que se actualicen dinamicamente, y lo hacemos definiendo un constructor.
    super(props);      //Creo el metodo super
    this.state = {     //Esto es a final un JSON 
        contador: 0
    }
} esto vale pero hay una forma mas sencilla de hacerlo que es la siguiente*/

state = {
    contador : 0
};

HolaMundo(nombre, edad) { //al entrar dentro de la clase ya no es necesario la palabra Function o una funcion de flecha=>
        var presentacion = (
        <div><h2>Hola, soy {nombre}</h2>
             <h3>tengo {edad}</h3>
        </div>);//tod esto es JSX
        return presentacion;
    }
    //sumar(e){//Esta es la primer manera la segunda es la sigueinte
    sumar = (e) => {
        //this.contador=this.contador+1;
        //this.state.contador = this.state.contador + 1;
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    //restar(e){//Esta es la primer manera la segunda es la sigueinte
        restar = (e) => {
        //this.contador--;
        //this.contador=this.contador-1;
       // this.state.contador = this.state.contador - 1;
       this.setState({
           contador: (this.state.contador - 1)
       });
    }

    render() {
        var nombre = "I am Marcos Lopez";
        //var presentacion = <h2>Buenos dias, {nomre} </h2>;
        return (
            <section id="content">
                <h2 className="subheader">Ultimos articulos</h2>
                <p>
                    Hola Bienvenido al curoso de React de Marcos Lopez WEB!!!
                </p>

                <h2 className="subheader">Funciones y JSX basico</h2>
                {this.HolaMundo(nombre, 12)}

                <h2 className="subheader">Componentes</h2>
                <section className="componentes">

                    <MiComponente />
                    <MiComponente />
                    {/*<Peliculas />*/}

                </section>

                <h2 className="subheader">Estado</h2>
                <p>
                    contado: {this.state.contador}
                </p>
                <p>
                    {/*<input type = "button" value = "sumar" onClick={this.sumar.bind(this)} />*/}
                    {/*<input type = "button" value = "restar" onClick={this.restar.bind(this)}/>*/}
                    {/*Las siguientes dos lines es otra manera la diferencia que creamos los metodos funiones de flechas */}
                    <input type = "button" value = "sumar" onClick={this.sumar} />
                    <input type = "button" value = "restar" onClick={this.restar} />
                </p>
            </section>

        );
    }

}
export default SeccionPruebas;