import { PageHeader,List, Button } from 'antd';
import './OnboarderProfile.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';

const data = [
    '1. Company:.',
    '2. Team: .',
    '3. Position: .',
    '4. Skill: .',
    '5. Goal: .',
    '6. First Day Activities: .',
    '7. Iteration 1 Activities: .',
    '8. Iteration 2 Activities: .',
    '9. Iteration 3 Activities: .',
];

class OnboarderProfile extends Component{
    render() {
        return (
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Person Name"
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
                    dataSource={data}
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