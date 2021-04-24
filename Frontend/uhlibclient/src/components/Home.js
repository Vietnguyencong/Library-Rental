import React from "react";
import About from './About'
import Library from './Libraries'
import Members from './EachMember'
import MainContent from './helper/Maincontent'
import Footer from './helper/footer'

class  Home extends React.Component { 
  state = {
    libaries: [ ], 
    active: 3
  }
  componentDidMount(){
    // fetch the data to get the library data 
  }
  handleClick = ( n) => {
    this.setState({active : n})
  }
  render () {
    return( 
    <div style={{marginTop:'20px', marginLeft:""}}>
      {/* <Members></Members> */}
        <div class="ui container" style={{marginTop:'30px', marginBottom: "50px"}}>
          <About/>
          <div class="ui grid" style={{marginBottom:"30px"}}>
            <div class=" four wide column">
              <div class="ui vertical fluid tabular menu">
                <a  class={this.state.active == 0 ? "item active": "item"} onClick={e=> this.handleClick(0)}>
                  Project
                </a>
                <a class={this.state.active == 1 ? "item active": "item"} onClick={e=> this.handleClick(1)} >
                  Powered by
                </a>
                <a class={this.state.active == 2 ? "item active": "item"} onClick={e=> this.handleClick(2)}>
                  Links
                </a>
                <a class={this.state.active == 3 ? "item active": "item"} onClick={e=> this.handleClick(3)}>
                  Thank you 
                </a>
              </div>
            </div>
            {/* <MainContent index = {this.state.active}/> */}
          </div>
          <Library/>
      </div>
      <Footer/>
    </div>
    )
  }

}

export default Home;  

