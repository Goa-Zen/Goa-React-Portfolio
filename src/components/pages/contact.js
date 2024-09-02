import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailSubmit from "../contact/email-submit";
// import Map from "../contact/contact-map";


export default function() {
  return (
    <div className="contact-page-wrapper">

      <div className="left-column">
        <EmailSubmit />

        {/* <Map /> */}
      </div>

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