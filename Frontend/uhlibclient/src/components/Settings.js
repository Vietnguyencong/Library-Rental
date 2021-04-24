import React from "react";
import axios from './axios'


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user:{}};
        this.user  = JSON.parse(localStorage.getItem('user'));
        // console.log("this email:", this.user.email);
        this.fetchUser();
    }

    fetchUser = async () =>{
        console.log("fetch user");
        this.user = await axios.get(`https://uhlib.cc/api/users/one/${this.user.user_id}`);
        this.setState({user: this.user.data});
        console.log("HEREKLSDJFKLSDJLF", this.user.data);
    }

    putUser = async (e) =>{
        e.preventDefault();
        this.user = this.state.user;
        this.user.first_name = e.target.elements.first_name.value
        this.user.last_name = e.target.elements.last_name.value
        console.log('form data', this.user);
        console.log('form data fname', e.target.elements.first_name.value, this.user.id);
        // let response = await axios.put(`https://uhlib.cc/api/users/${this.user.user_id}`, this.user);

        let response = await axios.put(`https://uhlib.cc/api/users/${this.user.id}`, this.user);
        
        console.log("HEREKLSDJFKLSDJLF", response);
    }

    render() {
        return (
            <div className="hero is-primary">
                 <div className="hero-body container">
              <h4 className="title">User Settings</h4>
            </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" />

                <form class="ui form" onSubmit={this.putUser}>
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" name="first_name" placeholder="First Name" />
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" placeholder="Last Name" />
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" tabindex="0" class="hidden" />
                            <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <button class="ui button" type="submit">Submit</button>
                </form>

            </div>
        );
    };
};
export default Settings