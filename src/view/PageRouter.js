import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from "./HomePage";
import Home from "./Temp/Home"

class PageRouter extends  Component{

    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path ='/' exact component = {Home}></Route>
                    <Route path ='/Home1' exact component = {HomePage}></Route>
                </BrowserRouter>
            </div>
        )
    }
}

export default PageRouter;