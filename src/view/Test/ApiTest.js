import reqwest from "reqwest";
import React,{Component} from "react";
import './apitest.css';


const dataUrl = 'https://infsteam5.herokuapp.com/onboarder';


class ApiTest extends Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
        datacorrect: false,
    };


    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.data.onboarders,
            });
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        try {
            this.compareData(this.state.data[0].lastname)
            console.log(this.state.datacorrect)
        } catch(e){

        }
    }

    fetchData = callback => {
        reqwest({
            url: dataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };
    compareData = (item) =>{
        if(item === "sam"){
            this.setState({
                    datacorrect: true,
                })
        }
    }
    render(){
        return(
            <div className={String(this.state.datacorrect)}>
                {String(this.state.datacorrect)}
            </div>
        )
    }
}

export default ApiTest;