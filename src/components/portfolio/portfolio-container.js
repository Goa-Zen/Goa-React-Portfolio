import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-items";

export default class PortfolioContainer extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
      data: [ ],
      startData: [ ]
    };
    // this.startData = [ ];
    
    // O añadimos esto o creamos una arrow function que coge el this de donde esté encapsulada
    this.handleFilter = this.handleFilter.bind(this);
    // this.getPortfolioItems = this.getPortfolioItems.bind(this);
    this.renderOut = this.renderOut.bind(this);
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return (
        <PortfolioItem key={item.id}  item={item}  />
      )
    })
  } 

  handleFilter(filterInput) {
    console.table("start data" , this.state.startData);
      this.setState({
          // data: this.state.data.filter(item => {
          //   return item.category === filterInput;
          // })
          // Para evitar que se quede con los datos anteriores y entonces no seleccione tras una primera seleccion
          // silvia!!
          
          data: this.state.startData.filter(item => {
            return item.category === filterInput;
          })
      });
  }
  componentDidMount() {
     this.getPortfolioItems();
  }

  getPortfolioItems() {
    axios
    .get('https://goa.devcamp.space/portfolio/portfolio_items')// ojjo not changed del de Jordan; el link es devcamp.space')// ojjo not changed del de Jordan; el link es devcamp.space
    .then(response => {
      console.log("given response" , response);
      this.setState ({
        data: response.data.portfolio_items,
        startData: response.data.portfolio_items
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  renderOut = () => {
    // this.getPortfolioItems();
    return (
      
      <div className="portfolio-items-container">
        <div className="portfolio-filter-wrapper">
        <button className="btn" onClick={() => this.getPortfolioItems()}>All</button>
        <button className="btn" onClick={() => this.handleFilter("Advertising")}>Advertising</button>
        <button className="btn" onClick={() => this.handleFilter("Consultancy")}>Consultancy</button>
        <button className="btn" onClick={() => this.handleFilter("Education")}>Education</button>
        <button className="btn" onClick={() => this.handleFilter("Managment")}>Managment</button>
        </div>
        <div className="portfolio-items-wrapper">
          {this.portfolioItems()}
        </div>
        {/* <hr /> */}
  
      </div>
    );
  }
  render() {
    return this.state.isLoading ? <h2> is Loading ,.....</h2>: this.renderOut();

  }
}