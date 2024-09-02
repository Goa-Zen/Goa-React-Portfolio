import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      // necesitamos que event.target.name lleve corchetes porque es dinámico
      errorText: ""
      // En el anterior no hemos puesto this.state.errorText porque solo queremos vaciar la variable
    });
  }

  handleSubmit(event) {
    axios
    .post(
      "https://api.devcamp.space/sessions",
      {
        client: {
          email: this.state.email,
          password: this.state.password
        }
      },
      { withCredentials: true }
    )
    .then(response => {
      console.log("response data status: ", response.data.status);
      if (response.data.status === "created") {
        // console.log("You can come in...");
        this.props.handleSuccessfulAuth();
      } else {
        this.setState({
          errorText: "Wrong email or password"
        });
        this.props.handleUnsuccessfulAuth();
      }
    })
    .catch(error => {
      this.setState({
        errorText: "An error occurred"
      });
      this.props.handleUnsuccessfulAuth;
    });

  event.preventDefault();
}

  render() {
    const {
      errorText,
      email,
      password
    } = this.state;

    return (
      <div>
        <h2>LOGIN TO ACCESS YOUR DASHBOARD</h2>
        <div>{errorText}</div>
        
         <form className="form-wrapper" onSubmit={this.handleSubmit}> {/*No lleva ningún parentesis porque recoge el event */}
          <div className="form-group">
          <FontAwesomeIcon icon="at" />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={email} // Esto posibilita que podamos ver el valor luego en la pantalla si ponemos por ejemplo los h2 de render
              onChange={this.handleChange}//No lleva ningún parentesis porque recoge el event
            />
            </div>
            <div className="form-group">
            <FontAwesomeIcon icon="key" />
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onChange={this.handleChange}
              />
              </div>
          <div>
            <button className="btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

