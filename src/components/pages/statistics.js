import React from "react";
import EuskadiUdalOpendata from "../statistics/euskadi-udal-opendata";


const Statistics =() => {
    return (
      <div className="statistis-wrapper">
          <div className="statistis">
            <EuskadiUdalOpendata />
          </div>
     </div>
  );
}


export default Statistics ;