import React, { Component } from "react";
import axios from 'axios';
import DataHolder from "./data-holder";
import FilterMenu from "../menu/filter-menu";


export default class EuskadiUdalOpendata extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
      dataMainMenu: [ ],
      groupsData: [ ],
      startData: [ ]
    };
    // this.startData = [ ];
    this.handleFilter = this.handleFilter.bind(this);
    // this.renderOut = this.renderOut.bind(this);
    this.renderStartData = this.renderStartData.bind(this);
  }

  subgroupsItems() {
     return this.state.groupsData.map(item => {
        // console.table(item);
        return item.subgroups.map(subgroup => {
          // console.log("subgroups ", subgroup);
          return (
            <DataHolder key={subgroup.id}  item={subgroup} where="/statistics/subgroups/" />
          )
        })
    })
  } 

  dataMainMenuItems() {
    return this.state.dataMainMenu.map(item => {
      return (
        <FilterMenu  key={item.id}  item={item} handleFilter={this.handleFilter} />
      )
    })
  } 

  handleFilter(filterInput) {
      this.setState({
          groupsData: this.state.startData.filter(item => {
            return item.id === filterInput;
          })
      });
  }
  componentDidMount() {
     this.getMainFiltersItems();
  }
  getBasicProperties(dataIni) {
    return dataIni.map(item => { 
      return (
        {"id": item.id, "name":item.name}
      )
    });
  }

  getSubgroupData(dataIni) {
    return dataIni.map(item => {
      console.log("getSubgroupData", item.subgroups);
      return (item.subgroups);
      // console.log(item);
      // return item.subgroups.map(subgroup => {
      //   // console.log("subgroups ", subgroup);
      //   return (
      //     <DataHolder key={subgroup.id}  item={subgroup} where="/statistics/subgroups/" />
      //   )
      // })
  });
  }

  renderStartData(){
    this.setState ({
      groupsData: this.state.startData
    });
  }
  getMainFiltersItems() {
    axios
    .get('https://api.euskadi.eus/udalmap/groups?lang=SPANISH&summarized=false')
    .then(response => {
      console.log("given response" , response.data);
      this.setState ({
        // groupsData: this.getSubgroupData(response.data),
        groupsData: response.data,
        startData: response.data,
        dataMainMenu: this.getBasicProperties(response.data) 
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  renderOut = () => {
    // {this.getSubgroupData()}
    return (
      <div className="opendata-main-container">
        <div className="opendata-filter-wrapper">
          <div className="filter-menu-wrapper">
            <div>
              <button className="btn" onClick={() =>this.renderStartData()}>Todos</button>
            </div>  
            {this.dataMainMenuItems()}
          </div>
        </div>

        <div className="opendata-items-wrapper">
          {this.subgroupsItems()}
        </div>
      </div>
    );
  }

  render() {
    return this.state.isLoading ? <h2> is Loading ,.....</h2>: this.renderOut();
  }
}