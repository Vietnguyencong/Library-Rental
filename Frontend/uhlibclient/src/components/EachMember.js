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