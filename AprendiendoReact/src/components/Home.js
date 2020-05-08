import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles'

class Home extends Component {
    render() {
        return (
            <div id="home">
                <Slider
                    title="Bienvenidos al curso de React con Marcos Lopez de marcoslopezweb.com"
                    btn="Ir al blog"
                    size="slider-big"
                /> 

                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Ultimos articulos</h1>
                        {/*Aniadimos la promiedad home="true"*/}
                        <Articles home="true"/> 
                    </div>

                    <Sidebar />
                </div>
            </div>

        );
    }
}
export default Home;