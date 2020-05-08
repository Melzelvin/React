import React, {Component} from 'react';
//import Search from './Search';
import { Link, Redirect } from 'react-router-dom';

class Sidebar extends Component{

    searchRef = React.createRef(); //Creo aqui la propiedad para recoger el valor que tiene el campo

    state = {
        search: "",
        redirect: false
        };

    redirectToSearch = (e) => {
        e.preventDefault();//para que no se actualice toda la pantalla
        
        this.setState({
        search: this.searchRef.current.value, //AQUI me saca el valor del campo de formulario
        redirect: true //me activa la redireccion
        });
    }

    render(){

        if(this.state.redirect){
            return (
                <Redirect to={'/redirect/'+this.state.search} /> 
            );
        }

        return(
            <aside id="sidebar">
            {this.props.blog === "true" &&
                <div id="nav-blog" className="sidebar-item">
                <h3>Puedes hacer esto</h3>
                <Link to ={'/blog/crear'} className="btn btn-success">Crear articulo</Link>
            </div>

            }

            <div id="search" className="sidebar-item">
                <h3>Buscador</h3>
                <p>Encuentra el articulo que buscas</p>
                <a href="#">Crear articulo</a>
                <form onSubmit={this.redirectToSearch}>
                    <input type="text" name="search" ref={this.searchRef} />
                    <input type="submit" name="submit" value="Buscar" className="btn" />
                </form>
            </div>
        </aside>

        );
    }

}
export default Sidebar;
