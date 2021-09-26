import {PageHeader, Card,List, Modal,Button,Input,Divider} from 'antd';
import './GoalPage.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

const {TextArea} = Input;

class GoalPage extends Component{
    constructor(props) {
        super(props);
        const obrid = this.props.location.state;
        this.state = {
            url: 'http://127.0.0.1:3000/onboarder',
            urlSuggest:'http://127.0.0.1:3000/suggest',
            data: [],
            suggestList:[],
            loading: false,
            visible: false,
            visibleAdd:false,
            ginput:'',
            ginx:0,
        }
        this.state.url = 'http://127.0.0.1:3000/onboarder/' + obrid;
    }
    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.data.onboarder.goal_list,
                loading: false,
                visible: false,
                visibleAdd:false,
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
    };
    showModal = () => {
        this.setState({
            visibleAdd: true,
            ginput:'',
            ginx:0,
        });
    };
    showModal1 = (item,index) => {
        this.setState({
            visible: true,
            ginput:item,
            ginx:index,
        });
    };

    handleOk = () => {
        let tdata = this.state.data;
        tdata[this.state.ginx] = this.state.ginput;
        this.setState({
            loading: true,
            data: tdata,
            ginx:0,
            ginput:'',
    });
        console.log(this.state.ginput);
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);

    };
    handleAdd = () => {
        let tdata = this.state.data;
        tdata.push(this.state.ginput)
        this.setState({
            visibleAdd: false,
            loading: true,
            data: tdata,
            ginput:'',
            ginx:0,
        });

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
    handleCancel1 = () => {
        this.setState({
            visibleAdd: false,
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
    handleSuggestAdding = (index) =>{
        let tdata = this.state.data;
        tdata.push(this.state.suggestList[index].goal);
        // let sl = this.state.suggestList;
        // sl.splice(index,1);
        this.setState({
            data: tdata,
            // suggestList: sl,
        })
    }
    render(){
        // console.log(this.state.data);
        return(
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Goal"
                    // subTitle="This is a subtitle"
                />
                <Divider orientation="left">
                    Current Goals
                </Divider>
                    <div className="site-card-wrapper">
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={this.state.data}
                            renderItem={(item,index) => (
                                <List.Item >
                                    <Card className="card_bak"  bordered={false} onClick={event=> this.showModal1(item,index)}>
                                        {item}
                                    </Card>
                                    <Modal
                                        visible={this.state.visible}
                                        title="Please input the goal"
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        footer={[
                                            <Button key="back" onClick={this.handleCancel}>
                                                Cancel
                                            </Button>,
                                            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                                Confirm
                                            </Button>,]}>
                                        <TextArea placeholder={'Make NewZealand Great Again!'} onChange ={event => this.handleInputUp(event)}/>
                                    </Modal>
                                </List.Item>
                            )}
                        >
                            <List.Item>
                                <Card className="card_bak"  bordered={false} onClick={this.showModal}>
                                    <PlusOutlined style={{ fontSize: '50px'}}/>
                                </Card>
                                <Modal
                                    visible={this.state.visibleAdd}
                                    title="Please input the goal"
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel1}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel1}>
                                            Cancel
                                        </Button>,
                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleAdd}>
                                            Confirm
                                        </Button>,]}>
                                    <TextArea placeholder={'Make NewZealand Great Again!'}  onChange ={event => this.handleInputUp(event)}/>
                                </Modal>
                            </List.Item>
                        </List>
                    </div>

                <div className="Suggest">
                    <Divider orientation="left">
                        Suggest Goals
                    </Divider>
                    <div className="site-card-wrapper">
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={this.state.suggestList}
                            renderItem={(item,index) => (
                                <List.Item >
                                    <Card className="card_sug"  bordered={false} onClick={event=> this.handleSuggestAdding(index)}>
                                        {item.goal}
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GoalPage;