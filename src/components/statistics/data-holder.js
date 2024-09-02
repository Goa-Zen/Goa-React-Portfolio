import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const DataHolder = (props) =>  { 
    
    const { 
        id, 
        name
        // _links
    } = props.item;

    const where = props.where;

    return (
        <div className="data-options-wrapper" >
            <div className="data-option-wrapper">
                {where === "/statistics/subgroups/" ? 
                    <div className="text"><FontAwesomeIcon icon="folder-open" /> {id}</div>
                    : <div className="text"><FontAwesomeIcon icon="percent" /> </div>
                }
                {where !== "" ? 
                    <Link to={`${where}${id}`} >
                         <div className="text">{name}</div>
                    </Link>
                    : 
                    <div className="text">{name}</div>                        
                }
            </div>
        </div>
    );
}

export default DataHolder;


// export default class DataHolder extends Component {
//     constructor(props) {
//         super(props);
//         // this.state = {
//         //     dataItems: this.props.item
//         // };
//     }  

//     render() {
//         const { 
//             id, 
//             name
//             // _links
//         } = this.props.item
//         const where = this.props.where;
//         return (
//             <div className="data-options-wrapper" >
//                 <div className="data-option-wrapper">
//                     {where === "/statistics/subgroups/" ? 
//                         <div className="text"><FontAwesomeIcon icon="folder-open" /> {id}</div>
//                         : <div className="text"><FontAwesomeIcon icon="percent" /> </div>
//                     }
//                     {where !== "" ? 
//                         <Link to={`${where}${id}`} >
//                              <div className="text">{name}</div>
//                         </Link>
//                         : 
//                         <div className="text">{name}</div>                        
//                     }
//                 </div>
//             </div>
//         );
//     }
// }