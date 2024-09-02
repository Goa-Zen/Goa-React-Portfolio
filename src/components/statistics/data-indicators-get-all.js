import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RcTableMaker from "../tables/rc-table-maker";


    export default class DataIndicatorsGetAll extends Component {

      constructor (props) {
          super(props);
          this.state = {
            isLoading: true,
            currentId: this.props.match.params.slug,
            dataEntities: [ ],
            dataRegions: [ ],
            dataMunicipalities: [ ],
            mainParamsData: {}
          };
        }

      getSubgroupsItems() {
        axios({
          method: "get",
          url: `https://api.euskadi.eus/udalmap/indicators/${this.state.currentId}?lang=SPANISH&summarized=false`

        })
        .then(response => {
          console.log("given response in axios trial" , response.data);
          this.setState ({
            dataEntities: response.data.entities,
            dataRegions: response.data.regions,
            mainParamsData: this.getIdsFrom(response.data._links),
            isLoading: false
          });
        })
        .catch(error => {
          console.log(error);
        })
      };

      getIdsFrom (arrayInput) {
        // console.log("arrayInput", arrayInput.group);
        let group = { ... arrayInput.group};
        let subgroup = { ... arrayInput.subgroup};
        let self = { ... arrayInput.self};
        const groupId = subgroup.href.split("/").slice(-1);
        console.log("group id ?", groupId)
        return (
          {
                "groupName": group.name,
                "subgroupName": subgroup.name,
                "selfName": self.name,
                "groupHref": group.href,
                "subgroupHref": subgroup.href,
                "selfHref": self.href,
                "subgroupId": groupId
          }
        )
      }

      componentDidMount() {
        this.getSubgroupsItems();
     }

     renderOut = () => {
      const  {
        groupName,
        subgroupName,
        selfName,
        groupHref,
        subgroupHref,
        selfHref,
        subgroupId 
      } = this.state.mainParamsData;

      // {console.log("conseguimos el output? ", this.state.mainParamsData)}
      return (
          <div className="indicators-main-wrapper">
            <h1>
            <Link to="/statistics" > <FontAwesomeIcon icon="left-long" /> </Link>
              {subgroupName}
            </h1>

            <h3>
              <Link to={`/statistics/subgroups/${subgroupId}` }> 
                <FontAwesomeIcon icon="left-long" /> 
              </Link>
              {selfName}
            </h3>
            <h2>Provincias</h2>
            <RcTableMaker object={this.state.dataEntities} />
            <h2>Regiones</h2>
            <RcTableMaker object={this.state.dataRegions}  />

            {this.state.isLoading ? (
              <div className="content-loader">
                <FontAwesomeIcon icon="spinner" spin />
              </div>
          ) : null}
          </div>
          
      );
    }

    render() {
      return this.state.isLoading ? <h2> is Loading ,.....</h2>: this.renderOut();
    }
    
    //   render() {
    //     const  {
    //       groupName,
    //       subgroupName,
    //       selfName,
    //       groupHref,
    //       subgroupHref,
    //       selfHref,
    //       subgroupId 
    //     } = this.state.mainParamsData;

    //     // {console.log("conseguimos el output? ", this.state.mainParamsData)}
    //     return (
    //         <div className="indicators-main-wrapper">
    //           <h1>
    //           <Link to="/statistics" > <FontAwesomeIcon icon="left-long" /> </Link>
    //             {subgroupName}
    //           </h1>

    //           <h3>
    //             <Link to={`/statistics/subgroups/${subgroupId}` }> 
    //               <FontAwesomeIcon icon="left-long" /> 
    //             </Link>
    //             {selfName}
    //           </h3>
    //           <h2>Provincias</h2>
    //           <RcTableMaker object={this.state.dataEntities} />
    //           <h2>Regiones</h2>
    //           <RcTableMaker object={this.state.dataRegions}  />

    //           {this.state.isLoading ? (
    //             <div className="content-loader">
    //               <FontAwesomeIcon icon="spinner" spin />
    //             </div>
    //         ) : null}
    //         </div>
            
    //     );
    // }
}
