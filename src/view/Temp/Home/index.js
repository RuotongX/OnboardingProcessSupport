import { PageHeader,List, message, Avatar, Spin } from 'antd';
import './Home.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';


const fakeDataUrl = 'https://randomuser.me/api/?results=15&inc=name,gender,email,nat&noinfo';


class Home extends Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.results,
            });
        });
    }

    fetchData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 35) {
            message.warning('All Onboarders have been displayed');
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
                    // onBack={() => window.history.back()}
                    title="Home"
                    // subTitle="This is a subtitle"
                />
                <div className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item key={item.id} onClick={()=> this.props.history.push("./Profile")}>
                                    <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={item.name.last}

                                            description={String.prototype.concat(item.email," | ", item.name.first)}
                                        />
                                    <div className = "InProgress">&nbsp;InProgress&nbsp;</div>
                                </List.Item>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </Fragment>
        );
    }
}

export default Home;