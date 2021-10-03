import {PageHeader, List, Modal, Input, Button, Select, Divider,Spin, Calendar, Typography} from 'antd';
import './ActivityDetail.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

const {TextArea} = Input;

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
            displaylist:[],
            visiable: false,
            InputActivity: '',
            SelectIteration:'',

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
        // console.log(`selected ${value}`);
    }
    showModal = () => {
        this.setState({
            visible: true,
            ginput:'',
            ginx:0,
        });
    };
    handleCancel = () => {

        this.setState({
            visible: false,
            ginput:'',
            ginx:0,
        });
    };
    showvalue = (value) => {
        // console.log(value)
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
            const activitylist = [];
            console.log(this.state.data.onboarding_date_activity.length);
            for(let i = 0; i < this.state.data.onboarding_date_activity.length; i++){
                activitylist.push({
                    content: this.state.data.onboarding_date_activity[i].activity,
                    operatingrange: "Onboarding date",
                    startdate: this.state.data.onboarding_date,
                    enddate: this.state.data.onboarding_date,
                })
            }
            for(let i = 0; i < this.state.data.iteration1_activity.length; i++){
                activitylist.push({
                    content: this.state.data.iteration1_activity[i].activity,
                    operatingrange: "Iteration 1",
                    startdate: this.state.data.iteration1_start_date,
                    enddate: this.state.data.iteration1_end_date,
                })
            }
            for(let i = 0; i < this.state.data.iteration2_activity.length; i++){
                activitylist.push({
                    content: this.state.data.iteration2_activity[i].activity,
                    operatingrange: "Iteration 2",
                    startdate: this.state.data.iteration2_start_date,
                    enddate: this.state.data.iteration2_end_date,
                })
            }
            for(let i = 0; i < this.state.data.iteration3_activity.length; i++){
                activitylist.push({
                    content: this.state.data.iteration3_activity[i].activity,
                    operatingrange: "Iteration 3",
                    startdate: this.state.data.iteration3_start_date,
                    enddate: this.state.data.iteration3_end_date,
                })
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
                    <List
                        itemLayout="horizontal"
                        dataSource={activitylist}
                        onClick={event=> this.showvalue(activitylist)}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.content}
                                    description={item.operatingrange+' | '+item.startdate+' - '+item.enddate}
                                    onClick={event=> this.showModal()}
                                />
                                <Modal
                                    visible={this.state.visible}
                                    title="Please modify the activity"
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <Button key="delete" onClick={this.handleCancel}>
                                            Cancel
                                        </Button>,
                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                            Confirm
                                        </Button>,]}>
                                    <Typography.Title level={5}> Activity's content </Typography.Title>
                                    <TextArea placeholder={'Make NewZealand Great Again!'} onChange ={event => this.handleInputUp(event)}/>
                                    <div className="margin20">
                                        <Typography.Title level={5}> Activity's operating range </Typography.Title>
                                        <Select defaultValue="Onboarding_date" style={{ width: 472 }}>
                                            <Select value="Onboarding_date">Onboarding_date</Select>
                                            <Select value="Iteration1"> Iteration1 </Select>
                                            <Select value="Iteration2"> Iteration2 </Select>
                                            <Select value="Iteration3"> Iteration3 </Select>
                                        </Select>
                                    </div>
                                    <div className="site-calendar-demo-card">
                                        <Typography.Title level={5}> Start Date</Typography.Title>
                                        <Calendar fullscreen={false} ></Calendar>
                                    </div>
                                    <div className="site-calendar-demo-card">
                                        <Typography.Title level={5}> End Date</Typography.Title>
                                        <Calendar fullscreen={false} ></Calendar>
                                    </div>
                                </Modal>
                            </List.Item>
                        )}
                    />
                </Fragment>
            )
        }

    }
}

export default ActivityDetail;