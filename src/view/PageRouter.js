import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Obp from "./OnboarderProfile";
import Home from "./HomePage";
import Goal from "./GoalPage";
import Activity from "./ActivityModify";
import ActivityD from "./ActivityDetail";
import apitest from "./Test/ApiTest";


class PageRouter extends  Component{

    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path ='/Test' exact component = {apitest}></Route>
                    <Route path ='/' exact component = {Home}></Route>
                    <Route path ='/Profile' exact component = {Obp}></Route>
                    <Route path ='/Profile/Goal' exact component = {Goal}></Route>
                    <Route path ='/Profile/Activity' exact component = {Activity}></Route>
                    <Route path ='/Profile/Activity/Setting' exact component = {ActivityD}></Route>
                </BrowserRouter>
            </div>
        )
    }

}

export default PageRouter;


