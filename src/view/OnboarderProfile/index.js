import {PageHeader, List, Button, Space, Spin, Modal, Input, Divider, Radio, Typography} from 'antd';
import './OnboarderProfile.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import { ManOutlined,CloudUploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

const {TextArea} = Input;

class OnboarderProfile extends Component{
    constructor(props) {
        super(props);
        const obrid = this.props.location.state;
        this.state = {
            url: 'https://infsteam5.herokuapp.com/onboarder',
            data:[],
            data1: [],
            loading: true,
            visible:false,
            ginput:'',
            skillLevel:0,
            ginx:0,
        }
        this.state.url='https://infsteam5.herokuapp.com/onboarder/'+obrid;
    }

    componentDidMount() {
        this.fetchData(res => {
            const data1 = res.data.onboarder
            this.refreshData(data1);
            this.setState({
                data1: res.data.onboarder,
                loading: false,
            });
            
        });

    }
    componentDidUpdate(nextProps, nextState, nextContext) {
        // this.refreshData();
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
    refreshData =(data1) =>{
        // console.log(this.state.data1);
        try{
            this.setState( {
                data: [
                    '1. Name: '+data1.lastname+' '+data1.firstname,
                    '2. Company: '+data1.company,
                    '3. Team: '+data1.team_name,
                    '4. Goal: '+data1.goal_list[0]+' | '+data1.goal_list[1],
                    '5. First Day Activities: '+data1.onboarding_date_activity[0].activity+' | '+data1.onboarding_date_activity[1].activity,
                    '6. Iteration 1 Activities: '+data1.iteration1_activity[0].activity+' | '+data1.iteration1_activity[1].activity,
                    '7. Iteration 2 Activities: '+data1.iteration2_activity[0].activity+' | '+data1.iteration2_activity[1].activity,
                    '8. Iteration 3 Activities: '+data1.iteration3_activity[0].activity+' | '+data1.iteration3_activity[1].activity,
                ],

            })
        } catch(e){
            // console.log(e);
        }
    }
    showModal = (item,index) => {
        this.setState({
            visible:true,
            ginput:item.tech,
            ginx:index,
        });
    };
    handleOk = () => {
        let data = this.state.data1;
        data.skill_matrix[this.state.ginx].tech = this.state.ginput;
        data.skill_matrix[this.state.ginx].level = this.state.skillLevel;
        this.setState({
            loading: true,
            data1: data,
            ginx:0,
            ginput:'',
    });
        // console.log(this.state.data);
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);

    };
    handleCancel = () => {

        this.setState({
            visible: false,
            ginput:'',
            ginx:0,
        });
    };
    handleInputUp = (event)=>{
        if(event && event.target && event.target.value){
            let value = event.target.value;
            this.setState(()=>({ginput:value}))
        }
    }
    onLevelChange = (e)=> {
        this.setState({
            skillLevel: e.target.value,
        })
    }

    render() {

        return (
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Profile"
                    extra={
                        <Button shape="round" icon={<CloudUploadOutlined/>} size="large"/>
                    }
                />
                <div className="center" >
                    <img className="avat" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="description"/>
                </div>
                <Divider orientation="left">
                    Profile
                </Divider>
                <List
                    size="large"
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={(item,index) =>
                        <List.Item >
                            {item }
                        </List.Item>}
                >
                    {this.state.loading  &&  (
                        <div className="demo-loading-container">
                            <Spin />
                        </div>
                    )}
                </List>
                <Divider orientation="left">
                    Skill Matrix
                </Divider>
                {/* '4. Skill: '+data1.skill_matrix[0].tech+' | '+data1.skill_matrix[1].tech,*/}
                <List
                    size="large"
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.data1.skill_matrix}
                    renderItem={(item,index) =>
                        <List.Item >
                            <List.Item.Meta
                                title={item.tech}
                                description={'level: '+item.level}
                                onClick={event=> this.showModal(item,index)}
                            />
                            <Modal
                                visible={this.state.visible}
                                title="Please input the modification skill"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                        Confirm
                                    </Button>,]}>
                                <Typography.Title level={5}> Please input the skill name </Typography.Title>
                                <TextArea placeholder={'Make NewZealand Great Again!'} onChange ={event => this.handleInputUp(event)}/>
                                <div className="margin20">
                                    <Typography.Title level={5}> Please select skill level </Typography.Title>
                                    <Radio.Group onChange={this.onLevelChange} defaultValue="5">
                                        <Radio.Button value="1">1</Radio.Button>
                                        <Radio.Button value="2">2</Radio.Button>
                                        <Radio.Button value="3">3</Radio.Button>
                                        <Radio.Button value="4">4</Radio.Button>
                                        <Radio.Button value="5">5</Radio.Button>
                                    </Radio.Group>

                                </div>
                            </Modal>
                        </List.Item>}
                >
                    {this.state.loading  &&  (
                        <div className="demo-loading-container">
                            <Spin />
                        </div>
                    )}
                </List>
                <div className = "Start">
                    <Space size={"middle"} wrap align={'center'}>
                        <Button type="primary" size="large" className="gb" shape="round" icon = {<ManOutlined />} onClick={()=> this.props.history.push({pathname:"./Profile/Goal",state:this.state.data1._id})}>
                            Modify Goals
                        </Button>
                        <Button type="primary" size="large" className="ab" shape="round" icon = {<ManOutlined />} onClick={()=> this.props.history.push({pathname:"./Profile/Activity",state:this.state.data1._id})}>
                            Modify Activities
                        </Button>
                    </Space>
                </div>
            </Fragment>
        )
    }
}

export default OnboarderProfile;