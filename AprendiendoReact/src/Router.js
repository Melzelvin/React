import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; //Importamos este modulo para  poder coonfigurar las rutas y paginas

//Importar componentes
import Peliculas from './components/Peliculas';
import MiComponente from './components/MiComponente';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';


class Router extends Component {

    render() {

        return (
            <BrowserRouter>
                <Header />


                {/*CONFIGURAR RUTAS Y PAGINAS*/}
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/articulo/:id" component={Article} />
                    <Route exact path="/blog/crear" component={CreateArticle} />
                    <Route exact path="/blog/editar/:id" component={EditArticle} />
                    {/*<Route exact path="/blog/articulo/:id" render={() => (
                        <h1>Pagina individual del articulo</h1>
                    )}/> DESACTIVODO EN LA CLASE 192*/}
                    <Route exact path="/blog/busqueda/:search" component={Search}/>
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search;
                            return(<Redirect to={'/blog/busqueda/'+search} />);
                        }
                    }/>


                    <Route exact path="/formulario" component={Formulario}/>
                    <Route exact path="/peliculas" component={Peliculas}/>


                    <Route exact path="/segunda-ruta" component={MiComponente} />
                    <Route exact path="/pagina-1" render={() => (
                        <React.Fragment>
                            <h1>Hola mundo desde la ruta: PAGINA 1</h1>
                            <MiComponente saludo="Hola amigo" />
                        </React.Fragment>
                    )} />

                    <Route exact path="/pruebas/:nombre/:apellidos?" render={(props) => {
                        var nombre = props.match.params.nombre;
                        var apellidos = props.match.params.apellidos

                        return (
                            <div id="content">
                                <h1 className="subheader">Pagina de pruebas</h1>
                                <h2>
                                    {nombre && !apellidos &&
                                        <React.Fragment>
                                            {nombre}
                                        </React.Fragment>
                                    }
                                    {nombre && apellidos &&
                                        <React.Fragment>
                                            {nombre} {apellidos}
                                        </React.Fragment>
                                    }
                                </h2>

                            </div>
                        );
                    }
                    } />
                    <Route component={Error} />

                </Switch>

                <div className="clearfix"></div> {/*Colocamos clearfix para que salga el pie de pagina */}

                <Footer />

            </BrowserRouter>

        );
    }
}
export default Router;