import React from 'react'

class MainContent extends React.Component {
    state = {
        content: {
        1: "MySQL, NodeJS, React, Blood, Sweat, Tears", 
        2: "Dr. Ramamurthy for your teaching and guidance", 
        3: "",
        0: "Team 10 was assigned to create a library database. We were inspired from our actual libraries here at UH. While this semester we couldn't be there in person, we were there in spirt."

        },
     
      mainindex : 0 
    }
 
    // componentDidUpdate(preprops){
    //     if (preprops.index !== this.state.mainindex){
    //         this.setState({mainindex: preprops.index})
    //     }
    // }
    render (){
        const index = this.props.index
    return (
        <div  class="twelve wide stretched column">
        <div class="ui segment" >
          {this.state.content[index]}
        </div>
      </div>
    )
  }
}

export default MainContent