import {PageHeader, List, Modal, Input, Button, Select, Divider,Spin, Calendar, Typography} from 'antd';
import './ActivityDetail.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

const {TextArea} = Input;
const { Option } = Select;

class ActivityDetail extends Component{
    constructor(props) {
        super(props);
        const obrid = this.props.location.state;
        this.state = {
            url: 'http://infsteam5.herokuapp.com/onboarder',
            urlSuggest:'http://infsteam5.herokuapp.com/suggest',
            data: [],
            suggestList:[],
            goallist:[],
            loading: true,
            loading1: true,
            activitylist:[],
            visiable: false,
            InputActivity: '',
            SelectIteration:'',
            inputcontent:'',
            selectrange:'',
            selectstartdate:'',
            selectenddate:'',
            activityindex:0,
        }
        this.state.url = 'http://infsteam5.herokuapp.com/onboarder/' + obrid;
    }
    componentDidMount() {
        this.fetchData(res => {
            const data = res.data.onboarder;
            const activitylist = [];
            for(let i = 0; i < data.onboarding_date_activity.length; i++){
                activitylist.push({
                    content: data.onboarding_date_activity[i].activity,
                    operatingrange: "Onboarding date",
                    startdate: data.onboarding_date,
                    enddate: data.onboarding_date,
                    counter:0,
                })
            }
            for(let i = 0; i < data.iteration1_activity.length; i++){
                activitylist.push({
                    content: data.iteration1_activity[i].activity,
                    operatingrange: "Iteration 1",
                    startdate: data.iteration1_start_date,
                    enddate: data.iteration1_end_date,
                    counter:0,
                })
            }
            for(let i = 0; i < data.iteration2_activity.length; i++){
                activitylist.push({
                    content: data.iteration2_activity[i].activity,
                    operatingrange: "Iteration 2",
                    startdate: data.iteration2_start_date,
                    enddate: data.iteration2_end_date,
                    counter:0,
                })
            }
            for(let i = 0; i < data.iteration3_activity.length; i++){
                activitylist.push({
                    content: data.iteration3_activity[i].activity,
                    operatingrange: "Iteration 3",
                    startdate: data.iteration3_start_date,
                    enddate: data.iteration3_end_date,
                    counter:0,
                })
            }
            const goallist = this.state.goallist;
            for(let i = 0; i< data.goal_list.length;i++){
                const value = data.goal_list[i];
                goallist.push({
                    value,
                });
            }
            this.setState({
                data: data,
                activitylist: activitylist,
                goallist:goallist,
                loading1:false,
            });
        });
        this.fetchDataSuggest(res => {
            const slist = res.data.suggests;
            const goallist = this.state.goallist;
            for(let i = 0; i< slist.length;i++){
                const value = slist[i].goal;
                goallist.push({
                    value,
                });
            }
            this.setState({
                suggestList: slist,
                goallist:goallist,
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
    addGoal = (value) => {
        for (let i = 0; i < this.state.suggestList.length; i++) {
            if (this.state.suggestList[i].goal === value) {
                const activitiesTitle = this.state.suggestList[i].high_contribution_activity.concat(this.state.suggestList[i].very_high_contribution_activity);
                let al = this.state.activitylist;
                for (let k = 0; k < activitiesTitle.length; k++) {
                    al.push({
                        content: activitiesTitle[k],
                        operatingrange: 'Null',
                        startdate: 'Null',
                        enddate: 'Null',
                        counter: 0,
                    })
                }
                this.setState({
                    activities: al,
                })
            }
        }
    }

    deleteGoal = (value) => {
        for(let i = 0; i< this.state.suggestList.length;i++){
            if(this.state.suggestList[i].goal === value){
                const activitiesTitle = this.state.suggestList[i].high_contribution_activity.concat(this.state.suggestList[i].very_high_contribution_activity);
                let al = this.state.activitylist;
                for(let j = al.length-1;j>-1;j--){
                    if(activitiesTitle.includes(al[j].content)){
                        if(al[j].counter>0){
                            al[j].counter--;
                        }
                        else{
                            // console.log(al[j])
                            al.splice(j,1);
                        }
                    }
                }
                this.setState({
                    activities: al,
                })
            }
        }
    }

    handleGoalChange = () => {
        let newal = this.state.activitylist;

            for (let i = newal.length - 1; i > -1; i--) {
                for (let j = i - 1; j > -1; j--) {

                    try {
                        if (this.state.activitylist[i].content === this.state.activitylist[j].content) {
                            newal[i].counter++;
                            newal.splice(j, 1);
                        }
                    } catch(e){

                    }
                }
            }
        // console.log(this.state.activitylist);

    }
    showModal = (index) => {
        this.setState({
            visible: true,
            inputcontent:'',
            selectrange:'',
            selectstartdate:'',
            selectenddate:'',
            activityindex:index,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            inputcontent:'',
            selectrange:'',
            selectstartdate:'',
            selectenddate:'',
            activityindex:0,
        });
    };
    deleteActivity =() =>{
        let newal = this.state.activitylist;
        newal.splice(this.state.activityindex,1);
        this.setState({
            visible: false,
            inputcontent:'',
            selectrange:'',
            selectstartdate:'',
            selectenddate:'',
            activityindex:0,
        });
    }
    handleInputUp = (event)=>{
        if(event && event.target && event.target.value){
            let value = event.target.value;
            this.setState(()=>({inputcontent:value}))
        }
    }
    handleRange = (value)=>{
        this.setState(()=>({selectrange:value}))
    }
    handleStartDate = (value) =>{
        console.log(value)
    }
    handleEndDate = (value) =>{

    }

    render(){

        if(this.state.loading === true || this.state.loading1 === true){
                return(
                    <Spin/>
                )
        }
        else {
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
                        onChange={this.handleGoalChange()}
                        onSelect = {value => this.addGoal(value)}
                        onDeselect = {value => this.deleteGoal(value)}
                        options={this.state.goallist}
                    />
                    <Divider orientation="left">
                        Activities
                    </Divider>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.activitylist}
                        // onClick={event=> this.showvalue(activitylist)}
                        renderItem={(item,index) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.content}
                                    description={item.operatingrange+' | '+item.startdate+' - '+item.enddate}
                                    onClick={event=> this.showModal(index)}
                                />
                                <Modal
                                    visible={this.state.visible}
                                    title="Please modify the activity"
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <Button key="back" onClick={this.deleteActivity}>
                                            Delete
                                        </Button>,
                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                            Confirm
                                        </Button>,]}>
                                    <Typography.Title level={5}> Activity's content </Typography.Title>
                                    <TextArea placeholder={'Make NewZealand Great Again!'} onChange ={event => this.handleInputUp(event)}/>
                                    <div className="margin20">
                                        <Typography.Title level={5}> Activity's operating range </Typography.Title>
                                        <Select defaultValue="Please select this activity operating iteration" onChange={value => this.handleRange(value)}>
                                            <Option value="Onboarding_date">Onboarding_date</Option>
                                            <Option value="Iteration1"> Iteration 1 </Option>
                                            <Option value="Iteration2"> Iteration 2 </Option>
                                            <Option value="Iteration3"> Iteration 3 </Option>
                                        </Select>
                                    </div>
                                    <div className="site-calendar-demo-card">
                                        <Typography.Title level={5}> Start Date</Typography.Title>
                                        <Calendar fullscreen={false} onChange={value => this.handleStartDate}></Calendar>
                                    </div>
                                    <div className="site-calendar-demo-card">
                                        <Typography.Title level={5}> End Date</Typography.Title>
                                        <Calendar fullscreen={false} onChange={value => this.handleEndDate}></Calendar>
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