import React from "react";

class Members extends React.Component {
    render(){
        return (
            <div class="ui three column grid" style={{margin:"10px"}}>
                <div class="column">
                    <div class="ui fluid card">
                    <div class="image">
                        <img src="https://semantic-ui.com/images/avatar/large/daniel.jpg"/>
                    </div>
                    <div class="content">
                        <a class="header">Issac</a>
                        <div classs="description">
                            this is my description 
                        </div>
                    </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui fluid card">
                    <div class="image">
                        <img src="https://semantic-ui.com/images/avatar2/large/matthew.png"/>
                    </div>
                    <div class="content">
                        <a class="header">Aiden</a>
                        <div classs="description">
                            this is my desciption
                        </div>
                    </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui fluid card">
                    <div class="image">
                        <img src="https://semantic-ui.com/images/avatar2/large/kristy.png"/>
                    </div>
                    <div class="content">
                        <a class="header">Yoseline</a>
                        <div classs="description">
                            this is my description
                        </div>
                    </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui fluid card">
                    <div class="image">
                        <img src="https://semantic-ui.com/images/avatar/large/christian.jpg"/>
                    </div>
                    <div class="content">
                        <a class="header">Minh</a>
                        <div classs="description">
                            this is my desciption
                        </div>
                    </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui fluid card">
                    <div class="image">
                        <img src="https://semantic-ui.com/images/avatar2/large/elyse.png"></img>
                    </div>
                    <div class="content">
                        <a class="header">Viet</a>
                        <div classs="description">
                            this is my description
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Members

//https://myporfolio-bucket.s3.amazonaws.com/images/selfimage.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATDIOQ4ZCHCZZPCG5%2F20210418%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T233003Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d85fa39f85421b325bf15b791a8f598f1395ae4a7e32d07661f8ef413b4f4081