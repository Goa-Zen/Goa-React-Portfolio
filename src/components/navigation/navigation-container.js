import React from 'react';
import { NavLink } from "react-router-dom";
import { withRouter} from  "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProfileImage from "../../../static/assets/images/mypictures/profile-white-very-small.jpg";

const NavigationComponent = (props) => {

    const dynamicLink = (route, linkText) => {
        return (
        <div className="nav-link-wrapper">
            <NavLink to={ route } activeClassName="nav-link-active">
                {linkText}
            </NavLink>
        </div>      
        )
    }

    const handleSignOut = () => {
        axios
          .delete("https://api.devcamp.space/logout", { withCredentials: true })
          .then(response => {
            if (response.status === 200) {
              props.history.push("/");
            //   Como este es un componente parcial no va a funcionar porque no tiene una dedicated Route
            //  Y aquí es donde interviennen los HIGH ORDER COMPONENTS
              props.handleSuccessfulLogout();
            }
            return response.data;
          })
          .catch(error => {
            console.log("Error signing out", error);
          });
      };

    return (
        <div className="nav-wrapper">
            <div className="left-side">
                <div className="image-wrapper" >
                        <img src={ProfileImage} />
                </div>                
            </div>
            
            <div className="center-side">
 
                <div className="nav-link-wrapper">
                <NavLink exact to="/" activeClassName="nav-link-active">
                    Home
                </NavLink>
                </div> 
                {/* <div className="nav-link-wrapper">
                    <NavLink to="/auth" activeClassName="nav-link-active">
                        Log In (Atuht)
                    </NavLink>
                </div>                     */}
                <div className="nav-link-wrapper">
                    <NavLink to="/about-me" activeClassName="nav-link-active">
                        About
                    </NavLink>
                </div>                  
                <div className="nav-link-wrapper">
                    <NavLink to="/contact"  activeClassName="nav-link-active">
                        Contact
                    </NavLink>
                </div>  
                <div className="nav-link-wrapper">
                    <NavLink to="/blog" activeClassName="nav-link-active">
                        Blog
                    </NavLink>
                </div>    
                <div className="nav-link-wrapper">
                    <NavLink to="/statistics" activeClassName="nav-link-active">
                        Statistics
                    </NavLink>
                </div>                                 
                {/* { dynamicLink("/blog", "Blog")  } */}
                {/* { props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/blog", "Blog") : null}    */}
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}           

                {/* <div className="nav-link-wrapper">
                    <NavLink to={route} activeClassName="nav-link-active">
                        {linkText}
                    </NavLink>
                </div> */}
                <div className="nav-link-wrapper">           
                    {false ? <button>Add Blog</button> : null}
                </div>
            </div>
            <div className="right-side">
                SILVIA ITURRIOZ
                {props.loggedInStatus === "LOGGED_IN" ? (
                    <a onClick={handleSignOut}>
                        <FontAwesomeIcon icon="sign-out-alt" />
                        {/* <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> */}
                    </a>
                ) : 
                
                    <NavLink to="/auth" activeClassName="nav-link-active">
                        <FontAwesomeIcon icon="fa-flag" />
                    </NavLink>
                }  
  
            </div>
        </div>
    )
}

export default withRouter(NavigationComponent);