import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es'; ///Importamos el idioma Espaniol para que la letra las ponga en castellano
import Global from '../Global';
import ImageDefault from '../assets/images/Default.png';

class Articles extends Component {
	url = Global.url; //Creo una propiedad llamda url y le doy el valor que tiene global

	state = {
		//Una vez llegado los datos de la promesa .then aqui los muestro en la vista
		articles: [],
		status: null,
	};

	componentWillMount() {
		//A este componenten lo cargamos antes de imprimir la vista CARGAMOS EL METODO
		var home = this.props.home;
		var search = this.props.search;

		if (home === 'true') {
			this.getLastArticles();
		} else if (search && search !== null && search !== undefined) {
			this.getArticlesBySearch(search);
		} else {
			this.getArticles();
		}
	}

	getArticlesBySearch = searched => {
		axios
			.get(this.url + 'search/' + searched)
			.then(res => {
				this.setState({
					articles: res.data.articles,
					status: 'success',
				});
			})
			.catch(err => {
				this.setState({
					articles: [],
					status: 'success',
				});
			});
	};

	getLastArticles = () => {
		axios.get(this.url + 'articles/last').then(res => {
			this.setState({
				articles: res.data.articles,
				status: 'success',
			});
		});
	};

	getArticles = () => {
		//Aqui creo un metodo para listar los articulos por medios de las peticiones AJAX a mi APIREST
		axios.get(this.url + 'articles').then(res => {
			//Utilizamos las promesas para recoger los resultados que me lleguen  del APIREST en una funcion de Callback

			this.setState({
				articles: res.data.articles,
				status: 'success',
			});
			console.log(this.state);
		});
	};

	render() {
		return this.state.articles.length ? (
			this.state.articles.map(article => (
				<article
					key={article._id}
					className='article-item'
					id='article-template'
				>
					<div className='image-wrap'>
						{article.image !== null ? (
							<img
								src={this.url + 'get-image/' + article.image}
								alt={article.title}
							/>
						) : (
							<img src={ImageDefault} alt={article.title} />
						)}
					</div>
					<h2>{article.title}</h2>
					<span className='date'>
						<Moment locale='es' fromNow>
							{article.date}
						</Moment>
					</span>
					<Link to={'/blog/articulo/' + article._id}>Leer mas></Link>
					<div className='clearfix'></div>
				</article>
			))
		) : (
			<div id='articles'>
				<h2 className='subheader'>No hay articulos para mostrar</h2>
				<p>Todavia no hay contenido en esta seccion</p>
			</div>
		);
	}
}
export default Articles;
