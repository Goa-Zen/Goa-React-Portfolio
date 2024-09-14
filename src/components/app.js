import React, { Component } from 'react';
// import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import NavigationContainer from "./navigation/navigation-container";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";



export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }
  
  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        // If loggedIn and status LOGGED_IN => return data
        // If loggedIn status NOT_LOGGED_IN => update state
        // If not loggedIn and status LOGGED_IN => update state

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route path="/portfolio-manager" component={PortfolioManager} />

    ]
  }
  render() {
    // this.getPortfolioItems();
    return (
      <div className='container'>

        <Router>
          <NavigationContainer 
            loggedInStatus = { this.state.loggedInStatus } 
            handleSuccessfulLogout= {this.handleSuccessfulLogout} 

            />
          <Switch>
            <Route key="base" exact path="/" component={Home} />
            <Route 
              key="auth"
              path="/auth" 
              render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
            <Route key="about-me" path="/about-me" component={About} />
            <Route key="contact" path="/contact" component={Contact} />
            
            <Route
                key="blog"
                path="/blog"
                render={props => (
                  <Blog 
                  {...props} 
                  loggedInStatus={this.state.loggedInStatus}
                   />
                )}
              />
              <Route
                path="/b/:slug"
                render={props => (
                  <BlogDetail
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />

            { this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
            
            <Route
                exact
                key="portfolio-slug"
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
          
            {/* Must be at the end */}
            <Route  key="nomatch" component={NoMatch} />
          </Switch>
        </Router>
        

        {/* <PortfolioContainer /> */}

      </div>
    );
  }
}
