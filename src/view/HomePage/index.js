import { PageHeader, Avatar, List, message, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import React, {Component,Fragment} from 'react';
import axios from "axios";



class HomePage extends Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    componentDidMount() {
        axios
            .get("http://localhost:5000/record/")
            .then((response) => {
                console.log(response.data);
                this.setState({ onboarders: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    render() {
        return (
            <Fragment>
                <PageHeader
                className="site-page-header"
                // onBack={() => null}
                title="HomePage"
                // subTitle="This is a subtitle"
            />
            <div>???</div>
            </Fragment>
        );
    }
}

export default HomePage;