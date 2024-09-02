import React from "react";

const FilterMenu = props => {
    const { 
        id, 
        name
    } = props.item
    
    return (
        <div>
                <button className="btn" onClick={() =>{ props.handleFilter(id)}}>{name}</button>
        </div>  
    );
}
export default FilterMenu;