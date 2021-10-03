import {PageHeader, List, Button, Space, Spin} from 'antd';
import './OnboarderProfile.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import { ManOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';


class OnboarderProfile extends Component{
    constructor(props) {
        super(props);
        const obrid = this.props.location.state;
        this.state = {
            url: 'http://infsteam5.herokuapp.com/onboarder',
            data:[],
            data1: [],
            loading: true,
        }
        this.state.url='http://infsteam5.herokuapp.com/onboarder/'+obrid;
    }

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data1: res.data.onboarder,
                loading: false,
            });
        });

    }
    componentDidUpdate(nextProps, nextState, nextContext) {
        this.refreshData();
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
    refreshData =() =>{
        // console.log(this.state.data1);
        try{
            this.setState( {
                data: [
                    '1. Name: '+this.state.data1.lastname+' '+this.state.data1.firstname,
                    '2. Company: '+this.state.data1.company,
                    '3. Team: '+this.state.data1.team_name,
                    '4. Skill: '+this.state.data1.skill_matrix[0].tech+' | '+this.state.data1.skill_matrix[1].tech,
                    '5. Goal: '+this.state.data1.goal_list[0]+' | '+this.state.data1.goal_list[1],
                    '6. First Day Activities: '+this.state.data1.onboarding_date_activity[0].activity+' | '+this.state.data1.onboarding_date_activity[1].activity,
                    '7. Iteration 1 Activities: '+this.state.data1.iteration1_activity[0].activity+' | '+this.state.data1.iteration1_activity[1].activity,
                    '8. Iteration 2 Activities: '+this.state.data1.iteration2_activity[0].activity+' | '+this.state.data1.iteration2_activity[1].activity,
                    '9. Iteration 3 Activities: '+this.state.data1.iteration3_activity[0].activity+' | '+this.state.data1.iteration3_activity[1].activity,
                ],

            })
        } catch(e){
            // console.log(e);
        }
    }

    render() {

        return (
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Profile"
                    // subTitle="This is a subtitle"
                />
                <div className="center" >
                    <img className="avat" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="description"/>
                </div>
                <List
                    size="large"
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={item =>
                        <List.Item>
                            {item}
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