import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DataHolderIndicators from "./data-holder";

    export default class DataSubgrupsGetAll extends Component {

      constructor (props) {
          super(props);
          this.state = {
            isLoading: false,
            currentId: this.props.match.params.slug,
            dataSubgroups: [ ],
            mainParamsData:{}
          };
        }
        
      subgroupsItems() {
        // console.log("dataSubgroups em subgroup pages", this.state.dataSubgroups);
            return this.state.dataSubgroups.map(indicator => {
              // console.log("indicator ", indicator);
              return (
                <DataHolderIndicators key={indicator.id}  item={indicator}  
                where="/statistics/indicators/" />
              );
            });
      } 

      getSubgroupsItems() {
        // console.log("subgroups this.state.currentId" , this.state.currentId);
        axios({
          method: "get",
          url: `https://api.euskadi.eus/udalmap/subgroups/${this.state.currentId}`
          
        })
        .then(response => {
          console.log("given response in axios trial" , response.data);
          this.setState ({
            dataSubgroups: response.data.indicators,
            mainParamsData: this.getIdsFrom(response.data._links)
          });
        })
        .catch(error => {
          console.log(error);
        })
      };

      getIdsFrom (arrayInput) {
        // console.log("arrayInput", arrayInput.group);
        let group = { ... arrayInput.group};
        let self = { ... arrayInput.self};
        const groupId = group.href.split("/").slice(-1);
        console.log("group id ?", groupId)
        return (
          {
                "groupName": group.name,
                "selfName": self.name,
                "groupHref": group.href,
                "selfHref": self.href,
                "groupId": groupId
          }
        )
      }

      componentDidMount() {
        this.getSubgroupsItems();
     }

     renderOut = () => {
      const  {
        groupName,
        selfName,
        groupHref,
        selfHref,
        groupId 

      } = this.state.mainParamsData;
      return (
        <div className="subgroups-main-wrapper">
          <h1>
          <Link to="/statistics" > <FontAwesomeIcon icon="left-long" /> </Link>
            {selfName}
             {/* {this.state.mainParamsData.name} */}
          </h1>

           {this.subgroupsItems()}
        </div>
       );
    }
    render() {
      return this.state.isLoading ? <h2> is Loading ,.....</h2>: this.renderOut();
    }
    //   render() {
    //     const  {
    //       groupName,
    //       selfName,
    //       groupHref,
    //       selfHref,
    //       groupId 

    //     } = this.state.mainParamsData;
    //     return (
    //         <div className="subgroups-main-wrapper">
    //           <h1>
    //           <Link to="/statistics" > <FontAwesomeIcon icon="left-long" /> </Link>
    //             {selfName}
    //              {/* {this.state.mainParamsData.name} */}
    //           </h1>

    //            {this.subgroupsItems()}
    //         </div>
    //     );
    // }
}