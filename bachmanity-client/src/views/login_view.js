import React from 'react';
import model from "../model";
import axios from "axios";
import config from "../config";
// import state from "./state";
import {observer} from "mobx-react"
import {action} from "mobx";
import "./login_view.css";

export default observer(class LoginView extends React.Component {
  state = {
      username: "",
      password: ""
  }

  onSubmit (event) {
    config.API_Host = config.backend;
        
    event.preventDefault();
    
    
    const body = {
        user: {
            name: this.state.username,
            password: this.state.password,
        }
    }
    console.log(body)

    axios.post(config.API_Host + "/users", body, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(action((res) => {
        console.log(res)
        model.state.userAccount = {
            user: {
                name: this.state.username,
                password: this.state.password
            }
        }
    })).catch(action((err) => {
        console.log(err)
    }));;

 
    //actions modify the state mobx
    // }).then(action((res) => {
    //     model.state.userAccount = {
    //         user: {
    //             name: this.state.username,
    //             password: this.state.password
    //         }
    //     }
    // })).catch(action((err) => {
    //     console.log(err)
    // }));
  }

  onChange (prop, event) {
      const state = Object.assign({}, this.state);
      state[prop] = event.target.value;
      this.setState(state);

  }

  render() {
    return (
      <div className="logincontainer">
        <form onSubmit = {this.onSubmit.bind(this)}>
            <h3>Login</h3>
            <span>Username</span>
            <input 
                name="username"
                type="text"
                onChange={this.onChange.bind(this,"username")}
                value={this.state.username}>
            </input>
            <br/>
            <span>Password</span>
            <input
                name="password"
                type="text"
                onChange={this.onChange.bind(this,"password")}
                value={this.state.password}>
            </input>
            <br/>
            <input type="submit"/>
        </form>
      </div>
    );
  }
});