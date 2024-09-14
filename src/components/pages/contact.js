import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackgroundImage from "../images/background-image-rc";


export default function() {
  return (
    <div className="contact-page-wrapper">

     

      <BackgroundImage 
          collection="contact" 
          imgIndex="0" 
          className="left-column"
          allowClick="false"
          />
   

      <div className="right-column">
        <div className="contact-bullet-points">
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="phone" />
            </div>

            <div className="text">+34 677 44 61 12</div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" />
            </div>

            <div className="text">silvia.iturrioz@interacciona.es</div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="map-marked-alt" />
            </div>

            <div className="text">Bizkaia, Spain</div>
          </div>


        </div>

      </div>
    </div>
  );
}