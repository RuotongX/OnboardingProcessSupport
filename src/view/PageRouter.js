import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Obp from "./Temp/OnboarderProfile";
import Home from "./Temp/Home";

class PageRouter extends  Component{

    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path ='/' exact component = {Home}></Route>
                    <Route path ='/Profile' exact component = {Obp}></Route>
                </BrowserRouter>
            </div>
        )
    }
}

export default PageRouter;