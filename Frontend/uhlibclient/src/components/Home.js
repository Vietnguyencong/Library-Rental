import React from "react";
import About from './About'
import Library from './Libraries'
import Members from './EachMember'

class  Home extends React.Component { 
  state = {
    libaries: [ ]
  }
  componentDidMount(){
    // fetch the data to get the library data 
  }
  render () {
    return( 
    <div style={{margin:'20px', marginLeft:"10px"}}>
      <Members></Members>
        <div class="ui container" style={{marginTop:'30px'}}>
          <About/>
          <div class="ui segment">
            <p>viet</p>
          </div>
          <div class="ui segment">
            <p>viet</p>
          </div>
          <div class="ui segment">
            <p>viet</p>
          </div>
          <Library/>
      </div>
    </div>
    )
  }

}

export default Home;  