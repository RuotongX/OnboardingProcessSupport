import {PageHeader, List, Modal, Input, Button, Select, Divider,Spin, DatePicker, Space, Typography} from 'antd';
import './ActivityDetail.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

const {TextArea} = Input;
const { Option } = Select;
const {RangePicker} = DatePicker;

class ActivityDetail extends Component{
    constructor(props) {
        super(props);
        const obrid = this.props.location.state;
        this.state = {
            url: 'https://infsteam5.herokuapp.com/onboarder',
            urlSuggest:'https://infsteam5.herokuapp.com/suggest',
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
            obrid: obrid,
        }
        this.state.url = 'https://infsteam5.herokuapp.com/onboarder/' + obrid;
    }
    componentDidMount() {
        this.fetchData(res => {
            const data = res.data.onboarder;
            const activitylist = [];
            for(let i = 0; i < data.onboarding_date_activity.length; i++){
                activitylist.push({
                    content: data.onboarding_date_activity[i].activity,
                    operatingrange: "Onboarding_date",
                    startdate: data.onboarding_date,
                    enddate: data.onboarding_date,
                    counter:0,
                })
            }
            for(let i = 0; i < data.iteration1_activity.length; i++){
                activitylist.push({
                    content: data.iteration1_activity[i].activity,
                    operatingrange: "Iteration1",
                    startdate: data.iteration1_activity[i].start,
                    enddate: data.iteration1_activity[i].end,
                    counter:0,
                })
            }
            for(let i = 0; i < data.iteration2_activity.length; i++){
                activitylist.push({
                    content: data.iteration2_activity[i].activity,
                    operatingrange: "Iteration2",
                    startdate: data.iteration2_activity[i].start,
                    enddate: data.iteration2_activity[i].end,
                    counter:0,
                })
            }
            for(let i = 0; i < data.iteration3_activity.length; i++){
                activitylist.push({
                    content: data.iteration3_activity[i].activity,
                    operatingrange: "Iteration3",
                    startdate: data.iteration3_activity[i].start,
                    enddate: data.iteration3_activity[i].end,
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
                console.log(goallist)
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
        let gl = this.state.data;
        gl.goal_list.push(value);
        this.setState({
            data:gl,
        })
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
        let gl = this.state.data;
        for(let j = gl.goal_list.length-1;j>-1;j--){
            if(gl.goal_list[j]===value){
                gl.goal_list.splice(j,1);
            }
        }
        this.setState({
            data:gl,
        })
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
    showModal = (item,index) => {
        this.setState({
            visible: true,
            inputcontent:item.content,
            selectrange:item.operatingrange,
            selectstartdate:item.startdate,
            selectenddate:item.enddate,
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

    handleDate = (value) =>{

        this.setState(()=>(
            {
                selectstartdate:value[0].format('L'),
                selectenddate:value[1].format('L'),
            }))

    }
    handleOk = () =>{
        const al = this.state.activitylist;
        al[this.state.activityindex].content = this.state.inputcontent;
        al[this.state.activityindex].operatingrange = this.state.selectrange;
        al[this.state.activityindex].startdate = this.state.selectstartdate;
        al[this.state.activityindex].enddate = this.state.selectenddate;

        this.setState(()=>(
            {
                visible: false,
                activitylist:al,
                inputcontent:'',
                selectrange:'',
                selectstartdate:'',
                selectenddate:'',
                activityindex:0,
            }))
    }
    handleUpload = () => {
        delete this.state.data._id;
        let renew = this.state.data;
        let al = this.state.activitylist;

        for(let i = 0; i< al.length;i++){
            if(al[i].operatingrange === "Onboarding_date"){

                renew.onboarding_date_activity.push({
                    start: al[i].startdate,
                    end: al[i].enddate,
                    activity: al[i].content,
                    source:"locker"
                })
            }
            if(al[i].operatingrange === "Iteration1"){

                renew.iteration1_activity.push({
                    start: al[i].startdate,
                    end: al[i].enddate,
                    activity: al[i].content,
                    source:"locker"
                })
            }
            if(al[i].operatingrange === "Iteration2"){

                renew.iteration2_activity.push({
                    start: al[i].startdate,
                    end: al[i].enddate,
                    activity: al[i].content,
                    source:"locker"
                })
            }
            if(al[i].operatingrange === "Iteration3"){
                renew.iteration3_activity.push({
                    start: al[i].startdate,
                    end: al[i].enddate,
                    activity: al[i].content,
                    source:"locker"
                })
            }
        }


        let data = JSON.stringify(renew);

        fetch(this.state.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        })
        this.setState({
            InputActivity: '',
        })
    }

    render(){

        if(this.state.loading === true || this.state.loading1 === true){
                return(
                    <Spin/>
                )
        }

        else {
            // const gl = this.state.goallist;
            // for (let i = gl.length - 1; i > -1; i--) {
            //     for (let j = i - 1; j > -1; j--) {
            //
            //         try {
            //             if (gl[i]=== gl[j]) {
            //
            //                 gl.splice(j, 1);
            //             }
            //         } catch(e){
            //
            //         }
            //     }
            // }
            return (
                <Fragment>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => window.history.back()}
                        title="Activity"
                        extra={
                            <Button shape="round" icon={<CloudUploadOutlined/>} size="large" onClick={this.handleUpload}/>
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
                        options={gl}
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
                                    onClick={event=> this.showModal(item,index)}
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
                                    <div className="margin20">
                                        <Typography.Title level={5}> Activity's duration </Typography.Title>
                                        <Space direction="vertical" size={12}>
                                            <RangePicker onChange={value => this.handleDate(value)}/>
                                        </Space>
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