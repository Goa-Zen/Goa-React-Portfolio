import React from "react";
// import profilePicture from "../../../static/assets/images/mypictures/profile-four-1of4.jpg";
import BackgroundImage from "../images/background-image-rc";
// import BackgroundImageGal from "../images/background-image-gal";

export default function() {
  return (
    <div className="about-page-wrapper">  

      <div className="left-column">
        <BackgroundImage 
            collection="mypictures" 
            imgIndex="0" 
            className="left-image" 
            allowClick="true"
          />
      </div>

      <div className="right-column">
    
        <div className="about-wrapper">
          <div>
            Having experience leading teams within a wide range of activities 
            such as advertising, marketing & data process 
            , my unique combination of analytical thinking and problem-solving skills 
            offers added value no matter the context or situation.
          </div>
          <div>
            Even I studied sociology, along all the years I have been working, 
            I have been able to learn 
             other sciences such as statistics, database and applications development.
          </div>        
          <div>
              As a statistician, I am a data-driven professional with a passion 
              for using statistics to improve marketing outcomes among others. 
            </div>        
            <div>
              My extensive training in statistical analysis, 
              coupled with my deep understanding of the social 
              and marketing applications of statistical methods, 
              makes me a valuable asset to any research 
              team seeking to make data-driven decisions.
          </div>
          <div>
            As a computer and information systems manager, 
            I am a highly skilled and experienced professional 
            with a passion for using technology to solve business problems.
          </div>        
          <div>
            I am passionate about writing code and developing high-quality
          software that meets the needs of my clients.
          </div>
        </div>
      </div>

    </div>
  );
}