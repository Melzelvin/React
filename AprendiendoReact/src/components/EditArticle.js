import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import ImageDefault from '../assets/images/Default.png';

//1. Tenemos que recoger el id del articulo a editar de la url
//2. Crear un metodo para sacr ese objeto del backend
//3. Repoblar/rellenar el formulario con esos datoa 
//4. Actualizar el objeto haciendo una peticion del backend


//Validacion formulario y alertas
class EditArticle extends Component {
    titleRef = React.createRef();
    contentRef = React.createRef();
    url = Global.url;
    //Guardamos la informacion dentro del State y asi podemos manilarla de manera mas dinamica y mostrarla por pantalla, etc
    state = {
        article: {},
        status: null,
        selectedFile: null
    };
    //Evento de ciclo de vida
    //En esta propiedad esta cargado nuestro objeto
    componentWillMount() { 
    this.articleId=this.props.match.params.id;
    this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido.'
            }
        }); 
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
        .then(res => {
            this.setState({
                article: res.data.article
            })
        });
    }

    changeState = () => { //Modifica el State de manera dinamica, conforme vaya queriendo
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
                
            }
        });
        //console.log(this.state); Desactivado199 
        this.validator.showMessages();//Muestra el mesaje
        this.forceUpdate(); //Fuerza acualizacion del formulario            
    }

    //////////titleRef = React.createRef();  //Creo mis Ref para mis diferentes campos, le damos el valor de :React.createRef() y vinculamos 
    //////////contentRef = React.createRef();//el campo con esas dos propiedades

    saveArticle = (e) => {
        e.preventDefault();

        //Rellenar state con formulario
        this.changeState();

        if (this.validator.allValid()){
            //Hacer una peticion http por post para gardar el articulo
            axios.put(this.url + 'article/'+this.articleId, this.state.article)
                .then(res => { //Recibo por el metodo callback la respuesta del APIREST
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Proyecto creado',
                            'El proyecto ha sido creado correctamente',
                            'success'
                        );
                        //SUBIR LA-------IMAGEN
                        if (this.state.selectedFile !== null) {
                            //Sacar el id del articulo gurdado
                            var articleId = this.state.article._id;

                            //Crear form data y aniadir fichero
                            const formData = new FormData();//Creo un formulario y adjuntarle un archivo.
                            
                            formData.append( //Vinculamos un fichero
                                'file0', //Nombre del fichero que va a recibir el APIREST con ese nombre
                                this.state.selectedFile, //EL fichero que quiero subir
                                this.state.selectedFile.name //Con que nombre lo quiero enviar 'name(nombre del archivo que voy a subir al servidor)'
                            );
                            //Peticion Ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)//formdata son los datos que yo quiero guardar
                                .then(res => {  //Metdodo .then para capturar la respuesta del PIREST con una funcion de callback
                                    if (res.data.article) {
                                        this.setState({ //En el caso de que me llegue vuelvo actualizar el State con los datos nuevos enviando success
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({ //En el caso de que me llegue vuelvo actualizar el State con los datos nuevos enviando success
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                });
        } else {

            this.setState({
                status: 'failed'
            }); //Constancia que ha fallado
            this.validator.showMessages();//Muestra el mesaje
            this.forceUpdate(); //Fuerza acualizacion del formulario            
        }
    }
    //Recibe el evento como parametro
    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        //Para ver el valor de selectedsfile en el stateconsole.log(this.state);
        //        console.log(event); PAra ver las cualidades de la imagen y ver si se estra entrando al evento
    }

    render() {
        console.log(this.state.article);

        if (this.state.status === 'success') {
            return <Redirect to="/blog" />;
        }
        
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar articulo</h1>
                    {this.state.article.title &&
                    <form className="mid-form" onSubmit={this.saveArticle}>
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                        {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                    </div>
                    {this.validator.message('content', this.state.article.content, 'required')}

                    <div className="form-group">
                        <label htmlFor="file0">Imagen</label>
                        

                        <input type="file" name="file0" onChange={this.fileChange} />
                        <div className="image-wrap">
                                {
                                    article.image !== null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                    ) : (
                                            <img src={ImageDefault} alt={article.title} className="thumb" />
                                        )
                                }
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <input type="submit" value="Guardar" className="btn btn-success" />
                </form>
                }

                {!this.state.article.title &&
                <h1 className="subheder">Cargando...</h1>

                }

                    

                </section>

                <Sidebar />

            </div>
        );
    }
}
export default EditArticle;


