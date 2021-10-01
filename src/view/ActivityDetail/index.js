import {PageHeader, List, Button, Select, Divider,Spin} from 'antd';
import './ActivityDetail.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

class ActivityDetail extends Component{
    constructor(props) {
        super(props);
        const obrid = this.props.location.state;
        this.state = {
            url: 'http://127.0.0.1:3000/onboarder',
            urlSuggest:'http://127.0.0.1:3000/suggest',
            data: [],
            suggestList:[],
            defaultgoal:[],
            loading: true,
            activitylist:[],
        }
        this.state.url = 'http://127.0.0.1:3000/onboarder/' + obrid;
    }
    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.data.onboarder,
            });
        });
        this.fetchDataSuggest(res => {
            this.setState({
                suggestList: res.data.suggests,
                loading: false,
            });
        })
    }

    fetchData = callback => {
        reqwest({
            url: this.state.url,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });

    };
    fetchDataSuggest = callback => {
        reqwest({
            url: this.state.urlSuggest,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });

    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render(){

        if(this.state.loading === true){
                return(
                    <Spin/>
                )
        }
        else {
            const goallist = [];
            for(let i = 0; i< this.state.suggestList.length;i++){
                const value = this.state.suggestList[i].goal;
                goallist.push({
                    value,
                });
            }
            return (
                <Fragment>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => window.history.back()}
                        title="Activity"
                        extra={
                            <Button shape="round" icon={<CloudUploadOutlined/>} size="large"/>
                        }
                        // subTitle="This is a subtitle"
                    />
                    <Divider orientation="left">
                        Goals selection
                    </Divider>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Please select"
                        defaultValue={this.state.data.goal_list}
                        onChange={value => this.handleChange(value)}
                        options={goallist}
                    />
                    <Divider orientation="left">
                        Activities
                    </Divider>
                    <List>

                    </List>
                </Fragment>
            )
        }

    }
}

export default ActivityDetail;