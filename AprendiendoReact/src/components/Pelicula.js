import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Pelicula extends Component {

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula, this.props.indice);
    }

    render(){
        //Crea una varables que me recoja el titulo y la imagen, pasan como valor a esas dos variables paras un objeto
        //const pelicula = this.props.pelicula;
        const {titulo, image} = this.props.pelicula; //paso las props con el objeto de pelicula
        
        return(
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo}/>
                </div>
                <h2>{titulo}</h2>
                <span className="date">
                Hace 5 minutos
                </span>
                <Link to="/blog">Leer mas</Link>
                <button onClick={this.marcar}>
                    Marcar como favorita
                </button>
                <div className="clearfix"></div>
            </article>                    

        );
            
    }
}
export default Pelicula;