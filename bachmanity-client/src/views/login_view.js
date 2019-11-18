import React from "react";
import model from "../model";
// import state from "./state";
import { observer } from "mobx-react";
import "./login_view.css";

export default observer(
  class LoginView extends React.Component {
    state = {
      username: "",
      password: ""
    };

    onSubmitLogin(event) {
      event.preventDefault();
      model.user
        .login(this.state.username, this.state.password)
        .then(() => {
          model.user.updateCurrentUser().then(res => {
            if (!res) alert("Bad username or password!");
          });
        })
        .catch(e => {
          alert("Fatal error on login: " + e);
        });
      this.setState({ username: "", password: "" });
    }

    onSubmitSignUp(event) {
      event.preventDefault();
      model.user
        .signup(this.state.username, this.state.password)
        .then(() => {
          window.location.href = "/";
        })
        .catch(e => {
          alert("Error trying to signup!");
        });
      this.setState({ username: "", password: "" });
    }

    onChange(prop, event) {
      const state = Object.assign({}, this.state);
      state[prop] = event.target.value;
      this.setState(state);
    }

    render() {
      if (this.props.mode === "login") {
        return (
          <div className="logincontainer">
            <form onSubmit={this.onSubmitLogin.bind(this)}>
              <h3>Bachmanity Login</h3>
              <span>Username</span>
              <input
                name="username"
                type="text"
                onChange={this.onChange.bind(this, "username")}
                value={this.state.username}
              ></input>
              <br />
              <span>Password</span>
              <input
                name="password"
                type="text"
                onChange={this.onChange.bind(this, "password")}
                value={this.state.password}
              ></input>
              <br />
              <input type="submit" value="Signin" />
              <a href="/signup">Register New Account</a>
            </form>
          </div>
        );
      } else if (this.props.mode === "signup") {
        return (
          <div className="logincontainer">
            <form onSubmit={this.onSubmitSignUp.bind(this)}>
              <h3>Bachmanity Signup</h3>
              <span>Username</span>
              <input
                name="username"
                type="text"
                onChange={this.onChange.bind(this, "username")}
                value={this.state.username}
              ></input>
              <br />
              <span>Password</span>
              <input
                name="password"
                type="text"
                onChange={this.onChange.bind(this, "password")}
                value={this.state.password}
              ></input>
              <br />
              <input type="submit" value="Register" />
            </form>
          </div>
        );
      }
    }
  }
);
