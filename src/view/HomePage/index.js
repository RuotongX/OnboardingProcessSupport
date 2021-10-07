import { PageHeader,List, message, Avatar, Spin } from 'antd';
import './HomePage.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';


const dataUrl = 'https://infsteam5.herokuapp.com/onboarder';


class HomePage extends Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };


    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.data.onboarders,
            });
        });
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
            console.log(data);
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
                                <List.Item key={item.id} onClick={()=> this.props.history.push({pathname:"./Profile",state:item._id})}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={String.prototype.concat(item.lastname," ",item.firstname)}

                                        description={String.prototype.concat(item.company," | ", item.team_name)}
                                    />
                                    <div className ={String(item.onboarding_program_status).replace(/\s+/g,"")} >&nbsp;{item.onboarding_program_status}&nbsp;</div>
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

export default HomePage;