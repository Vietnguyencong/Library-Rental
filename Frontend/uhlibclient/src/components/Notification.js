import React from "react";
import axios from './axios'

class Noti extends React.Component {
    /*state = {
        list_noti : [],
    }*/

    constructor(props) {
        super(props);
        this.state = {
        list_noti :[],
        };
        /*        for(let i = 0; i<15; i++){
            list_noti.push({
                title: props.list_noti.title(),
                body: props.list_noti.body()
            });
        }
        this.state = {list_noti}; */
      }
      
      componentDidMount(){
        this.getNoti()
      }
      getNoti = async () =>{
        const noti = await axios.get(`https://uhlib.cc/api/notifications/user/1`)
        this.setState({list_noti:noti.data})
      }

    render (){
        return (
/*<table class="ui inverted red table">
<i class="attention icon"></i> 
<table class="ui selectable celled table">
<table class="ui celled table">*/
        
        <div>
                 <table class="ui inverted grey selectable celled table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Body</th>
      <th>Time Stamp</th>
    </tr>
  </thead>
  <tbody>
      {this.state.list_noti.map((item) => (
     <tr>  <td> {item.title} </td> <td><i class="book icon"></i> {item.body} </td> <td>{item.created_at}</td> </tr>
               ))}
  </tbody>
</table>
            </div>
        )
    }
}
export default Noti