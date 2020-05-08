import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';


class Peliculas extends Component {  //Va a heredar a compotene
    state = {   //Uso el state porque son datos que quiero mostrar a las vistas

    };

    cambiarTitulo = () => {

        var { peliculas } = this.state;
        // var random = Math.floor(Math.random() * 3); Desactivado clase 165 Pasar de componentes hijo a componente padre
        //peliculas[random].titulo= "Batman Begins";
        peliculas[0].titulo = "Batman Begins";

        this.setState({
            peliculas: peliculas
        });
    }
    //class MiCompenente extends Component{    
    favorita = (pelicula, indice) => { //Mi metodo de la clase padre
        console.log("FAVORITA MARCADA");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }

    componentWillMount() {
        //alert("Se va a montar el componente");
        this.setState({
            peliculas: [
                { titulo: 'Barman vs Superman', image: 'https://images-na.ssl-images-amazon.com/images/I/911RR0tzL2L._AC_SL1500_.jpg' },
                { titulo: 'Gran Torino', image: 'https://www.artmajeur.com/medias/standard/f/a/fasquelolivier/artwork/11789156_gran-torino.jpg' },
                { titulo: 'Looper', image: 'https://es.web.img3.acsta.net/medias/nmedia/18/92/47/73/20250845.jpg' }
            ],
            nombre: 'Marcos Lopez',
            favorita: {}
        });
    }

    componentDidMount() {
        //alert("Ya se ha montado el componente");
    }
    componentWillUnmount() {
        //alert("Me voy a desmontar");
    }



    render() {  //el unico metodo obligatorio es el render con su respectivo return que va a devolver un trozo de JSX o de la vista de la plantilla, en este caso que improma un h4
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La pelicula favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            );
        } else {
            favorita = (
                <p>NO HAY PELICULA FAVORITA</p>
            )
        }


        return (
            <React.Fragment>
            <Slider
                    title="Peliculas"
                    size="slider-small"
            />

            <div className="center">
                <div id="content" className="peliculas"> {/*Con id=Content" dejo al lado izquiero el buscador */}

                    <h2 className="subheader">Listado de peliculas</h2>
                    <p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
                    <p>
                        <button onClick={this.cambiarTitulo}>
                            Cambiar titulo de Batman
                    </button>
                    </p>
                    {/*{this.state.favorita.titulo ? (
                     <p className="favorita" style={pStyle}>
                        <strong>La pelicula favorita es: </strong>
                        <span>{this.state.favorita.titulo}</span>
                    </p>
                    ) : (
                        <p>NO HAY PELICULAS PARA MOSTRAR</p>
                    )
                    */}
                    {favorita}


                    {/*Crear componentes peliculas */}
                    <div id="articles" className="peliculas">
                        {
                            this.state.peliculas.map((pelicula, i) => {
                                return (
                                    <Pelicula
                                        key={i}
                                        pelicula={pelicula}
                                        indice={i}
                                        marcarFavorita={this.favorita}
                                    /> //Este componente me va a mostrar todas las peliculas 

                                )
                            })
                        }
                        </div>
                    </div>
                    <Sidebar blog="false"/>
                </div>
                </React.Fragment>
        );
    }
}
export default Peliculas;





