import { PageHeader } from 'antd';
import React, {Component,Fragment} from 'react';

class HomePage extends Component {


    render() {
        return(
            <Fragment>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Title"
                    subTitle="This is a subtitle"/>,
            </Fragment>
        )
    }
}

export default HomePage;