import React, { Component } from "react";
import Login from "../auth/login";
// import loginImg from "../../../static/assets/images/auth/login.jpg";
import BackgroundImage from "../images/background-image-rc";

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }
  
  handleSuccessfulAuth() {
    this.props.handleSuccessfulLogin();
    this.props.history.push("/");
  }
  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();

  }
  render() {
    return (
      <div className="auth-page-wrapper">
        <BackgroundImage 
          collection="auth" 
          imgIndex="0" 
          className="left-column"
          allowClick="false"
          />

      {/* </div> */}

        <div className="right-column">
            <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
            />
        </div>
      </div>
    );
  }
}