import React from 'react'

class MainContent extends React.Component {
    state = {
        content: {
        1: "this is the content 1", 
        2: "this is the content 2", 
        3: "thisi the content 3",
        0: "thisi the content 0"

        },
     
      mainindex : 0 
    }
 
    componentDidUpdate(preprops){
        if (preprops.index !== this.state.mainindex){
            this.setState({mainindex: preprops.index})
        }
    }
    render (){
        const {mainindex} = this.state
    return (
        <div  class="twelve wide stretched column">
        <div class="ui segment" >
          {this.state.content[mainindex]}
        </div>
      </div>
    )
  }
}

export default MainContent