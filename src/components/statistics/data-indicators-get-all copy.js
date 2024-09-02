import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from 'rc-table';
// import { useLocation } from 'react-router-dom';


    export default class DataIndicatorsGetAll extends Component {
      constructor (props) {
          super(props);
          this.state = {
            isLoading: false,
            currentId: this.props.match.params.slug,
            dataEntities: [ ],
            dataRegions: [ ],
            dataMunicipalities: [ ],
            mainParamsData: {}
          };
          // const location = useLocation();
          // const { apiUrl } = location.state;
          // {console.log("this.props.apiUrl", this.props)}
        }
      getArrayData(object){

        const dataEnd = object.map(item => {
            
            // let ini_obj = {
            //   "id": item.id,
            //   "name": item.name,
            //   "key": item.id
            //  };
             let entradas = Object.entries(item.years); 
            //  let salida = {  ...entradas[0][1]};
             var salida =structuredClone( {  ...entradas[0][1]});
            // var obj = { ...ini_obj};
            var obj2 = {   "id": item.id,
              "name": item.name,
              "key": item.id, ...salida}
              ;
          return obj2;
        });
//  ---------------------------------------------------/
        var auxData =structuredClone(dataEnd);
        let ini_obj = [];
        var columnsNames = { ...ini_obj, ...auxData[0]};
        // console.log("columnsNames ", columnsNames);

        let columnsNamesKeys = Object.keys(columnsNames); 
        // console.log("columnsNameskeys ", columnsNamesKeys);

        var columnsEnd =[];
        const aux = columnsNamesKeys.map(item => {
          // console.log("item in names", item);
          const hidden = item === "key" || item === "id" ? (true) : (false);
          let prototipo =  {            
            "title": item,
            "dataIndex": item,
            "key": item,
            "width":100,
            "align": "center",
            "hidden": hidden
           };
           columnsEnd.push(prototipo);
          return (

            columnsEnd
          )
        });
        //  ---------------------------------------------------/
        // console.log("para Table Component", columnsEnd);
        // return;
            return (
                <Table 
                  columns={columnsEnd} 
                  data={dataEnd} 
                  className ="table-report-indicators"
                  sticky = "true"
                  rowHoverable = "true"
                  />

            );
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

      render() {
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
              <div>
                 {this.getArrayData(this.state.dataEntities)}
              </div>
              <div>
              {this.getArrayData(this.state.dataRegions)}
              </div>
            </div>
            
        );
    }
}
