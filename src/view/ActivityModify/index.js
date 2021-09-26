import {PageHeader} from 'antd';
import './ActivityModify.css';
import 'antd/dist/antd.css';
import React, {Component,Fragment} from 'react';
// import { ManOutlined } from '@ant-design/icons';
// import reqwest from 'reqwest';

class ActivityModify extends Component{

    render(){
        return(
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Activity"

                    // subTitle="This is a subtitle"
                />
            </Fragment>
        )
    }
}

export default ActivityModify;