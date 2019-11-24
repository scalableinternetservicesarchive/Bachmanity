import React from "react";
import model from "../model";
// import state from "./state";
import { observer } from "mobx-react";
import "./login_view.css";
import LandingPagePhoto from "./img/silicon-valley-ep309.jpg";

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
          <div className="container-fluid">
            <div className="row no-gutter">
              <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">
                          Welcome to Bachmanity
                        </h3>
                        <form onSubmit={this.onSubmitLogin.bind(this)}>
                          <div className="form-label-group">
                            Username:
                            <input
                              name="username"
                              type="text"
                              id="inputEmail"
                              className="form-control"
                              onChange={this.onChange.bind(this, "username")}
                              value={this.state.username}
                              required
                              autofocus
                            />
                          </div>
                          Password:
                          <div className="form-label-group">
                            <input
                              type="password"
                              id="inputPassword"
                              className="form-control"
                              onChange={this.onChange.bind(this, "password")}
                              value={this.state.password}
                              required
                            />
                          </div>
                          <button
                            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                            type="submit"
                            value="Signin"
                          >
                            Sign in
                          </button>
                          <div className="text-center">
                            <a className="small" href="/signup">
                              Register New Account
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (this.props.mode === "signup") {
        return (
          <div className="container-fluid">
            <div className="row no-gutter">
              <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">
                          Welcome to Bachmanity
                        </h3>
                        <form onSubmit={this.onSubmitSignUp.bind(this)}>
                          <div className="form-label-group">
                            Username:
                            <input
                              name="username"
                              type="text"
                              id="inputEmail"
                              className="form-control"
                              onChange={this.onChange.bind(this, "username")}
                              value={this.state.username}
                              required
                              autofocus
                            />
                          </div>
                          Password:
                          <div className="form-label-group">
                            <input
                              type="password"
                              id="inputPassword"
                              className="form-control"
                              onChange={this.onChange.bind(this, "password")}
                              value={this.state.password}
                              required
                            />
                          </div>
                          <button
                            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                            type="submit"
                            value="Register"
                          >
                            Register
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
);
