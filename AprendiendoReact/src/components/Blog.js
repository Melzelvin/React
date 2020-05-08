import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';
//import axios from 'axios';

class Blog extends Component {
    render() {

        return (
            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
                />

                <div className="center">
                    <div id="content">
                        {/*Listado de articulos que viee del API REST de node*/}
                        <Articles />
                    </div>

                    <Sidebar blog="true" />
                </div>
            </div>

        );
    }
}
export default Blog;