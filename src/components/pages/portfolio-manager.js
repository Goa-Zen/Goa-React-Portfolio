import React, { Component } from "react";
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();
    
    this.state = {
      portfolioItems:[],
      portfolioToEdit: {}
    }
    // this.getPortfolioItems = this.getPortfolioItems.bind(this);
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(
      this
    );
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }

  clearPortfolioToEdit() {
    this.setState({
      portfolioToEdit: {}
    });
  }

  handleEditClick(portfolioItem) {
    // console.log("Estoy en el handle Edit");
    this.setState({
      portfolioToEdit: portfolioItem
    });
  }
  handleEditFormSubmission() {
    this.getPortfolioItems();
  }
  handleNewFormSubmission(portfolioItem) {
    // TODO
    // update the portfolioItems state
    // and add the portfolioItem to the list
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
      // Instead of 
      //  portfolioItems: this.state.porfolioItems.push(portfolio)
      // Becouse the one above it would not work becouse the state arrays dont understand "push"
    });
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }
  // .get('https://goa.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc')// ojjo , opcionales lo de ordenar, pero así la reciente saldrá arriba automaticamente
  getPortfolioItems() {
    axios
    .get('https://goa.devcamp.space/portfolio/portfolio_items')// ojjo , opcionales lo de ordenar, pero así la reciente saldrá arriba automaticamente
    .then(response => {
      // handle success
      console.log("given response" , response);
      this.setState ({
        portfolioItems: [...response.data.portfolio_items]
      });
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    // .finally(function () {
    //   // always executed
    // });
  }
  handleDeleteClick(portfolioItem) {
    // console.log("HandleDeleteClick" , portfolioItem);
    axios
    .delete(
      `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
      { withCredentials: true }
    )
    .then(response => {
      // console.log("response from delete", response);
      this.setState({
        portfolioItems: this.state.portfolioItems.filter(item => {
          return item.id !== portfolioItem.id;
        })
      });

      return response.data;
    })
    .catch(error => {
      console.log("handleDeleteClick error", error);
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }
  render() {
    return (
    <div className="portfolio-manager-wrapper">
      <div className="left-column">
          <PortfolioForm
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearPortfolioToEdit={this.clearPortfolioToEdit}
            portfolioToEdit={this.state.portfolioToEdit}
          />
      </div>

      <div className="right-column">
        <PortfolioSidebarList 
          handleDeleteClick={this.handleDeleteClick}
          data={this.state.portfolioItems} 
          handleEditClick={this.handleEditClick}
        />
      </div>
    </div>
    );
  }
}