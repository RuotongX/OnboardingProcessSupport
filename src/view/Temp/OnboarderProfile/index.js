import { PageHeader,List, Button } from 'antd';
import './OnboarderProfile.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import reqwest from 'reqwest';


class OnboarderProfile extends Component{

    state = {
        url: 'http://127.0.0.1:3000/onboarder',
        data:[],
        data1: [],
        loading: false,
        hasMore: true,
    };

    componentWillMount() {
        const obrid = this.props.location.state;
        this.setState({
            url:'http://127.0.0.1:3000/onboarder/'+obrid
        })
    }
    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data1: res.data.onboarder,
            });
        });

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

    render() {
        // const xixi = ['11','22'];
        // console.log(xixi[0]);
        const temp = this.state.data1.skill_matrix;
        console.log(temp);

        this.state.data =[
            '1. Name: '+this.state.data1.lastname+' '+this.state.data1.firstname,
            '2. Company: '+this.state.data1.company,
            '3. Team: '+this.state.data1.team_name,
            // '4. Skill: '+this.state.data1.skill_matrix[0].tech+' | '+this.state.data1.skill_matrix[1].tech,
            // '5. Goal: '+this.state.data1.goal_list[0]+' | '+this.state.data1.goal_list[1],
            // '6. First Day Activities: '+this.onboarding_date_activity[0].activity+' | '+this.onboarding_date_activity[1].activity,
            // '7. Iteration 1 Activities: '+this.iteration1_activity[0].activity+' | '+this.iteration1_activity[1].activity,
            // '8. Iteration 2 Activities: '+this.iteration2_activity[0].activity+' | '+this.iteration2_activity[1].activity,
            // '9. Iteration 3 Activities: '+this.iteration3_activity[0].activity+' | '+this.iteration3_activity[1].activity,
        ]
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
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
                <div className = "Start">
                    <Button type="primary" size="large">
                        Modify
                    </Button>
                </div>
            </Fragment>
        )
    }
}

export default OnboarderProfile;