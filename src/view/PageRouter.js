import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from "HomePage";

class PageRouter extends  Component{

    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path ='/' exact component = {HomePage}></Route>
                </BrowserRouter>
            </div>
        )
    }
}