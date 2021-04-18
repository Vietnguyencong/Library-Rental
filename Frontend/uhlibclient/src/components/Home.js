import React from "react";
import About from './About'
import Library from './Libraries'
import Members from './EachMember'
<<<<<<< HEAD
import MainContent from './helper/Maincontent'

class  Home extends React.Component { 
  state = {
    libaries: [ ], 
    active: 3
=======

class  Home extends React.Component { 
  state = {
    libaries: [ ]
>>>>>>> ab009f6a3972505bb340519e53c18656e4c784d8
  }
  componentDidMount(){
    // fetch the data to get the library data 
  }
<<<<<<< HEAD
  handleClick = ( n) => {
    this.setState({active : n})
  }
=======
>>>>>>> ab009f6a3972505bb340519e53c18656e4c784d8
  render () {
    return( 
    <div style={{margin:'20px', marginLeft:"10px"}}>
      <Members></Members>
        <div class="ui container" style={{marginTop:'30px'}}>
          <About/>
<<<<<<< HEAD
          <div class="ui grid" style={{marginBottom:"30px"}}>
            <div class="one wide column">
              <div class="ui vertical fluid tabular menu">
                <a  class={this.state.active == 0 ? "item active": "item"} onClick={e=> this.handleClick(0)}>
                  Bio
                </a>
                <a class={this.state.active == 1 ? "item active": "item"} onClick={e=> this.handleClick(1)} >
                  Pics
                </a>
                <a class={this.state.active == 2 ? "item active": "item"} onClick={e=> this.handleClick(2)}>
                  Companies
                </a>
                <a class={this.state.active == 3 ? "item active": "item"} onClick={e=> this.handleClick(3)}>
                  Links
                </a>
              </div>
            </div>
            <MainContent index = {this.state.active}/>
          </div>
=======
          <div class="ui segment">
            <p>viet</p>
          </div>
          <div class="ui segment">
            <p>viet</p>
          </div>
          <div class="ui segment">
            <p>viet</p>
          </div>
>>>>>>> ab009f6a3972505bb340519e53c18656e4c784d8
          <Library/>
      </div>
    </div>
    )
  }

}
<<<<<<< HEAD



export default Home;  

=======

export default Home;  
>>>>>>> ab009f6a3972505bb340519e53c18656e4c784d8
