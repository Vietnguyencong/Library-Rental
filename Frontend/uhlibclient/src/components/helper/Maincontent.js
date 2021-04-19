import React from 'react'

class MainContent extends React.Component {
    state = {
        content: {
        1: "this is the content 1", 
        2: "this is the content 2", 
        3: "thisi the content 3",
        0: "Team 10 was assigned to create a library database. We have gotten inspiration from our actual libraries here at UH. While this semester we couldn't be there in person, we're there in spirt. Power by: mysql, react, node, blood, sweat, tears"

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