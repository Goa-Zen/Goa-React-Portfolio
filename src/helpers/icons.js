import { 
    faTrash, 
    faSignOutAlt, 
    faEdit, 
    faSpinner,
    faPlusCircle, 
    faFlag,
    faUserPen,
    faPhone,
    faEnvelope,
    faMapMarkedAlt,
    faAt,
    faKey,
    faLeftLong,
    faPercent,
    faFolderOpen


} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";


const Icons = () => {
    return library.add(
      faTrash, 
      faSignOutAlt, 
      faEdit, 
      faSpinner, 
      faPlusCircle, 
      faFlag, 
      faUserPen,
      faPhone,
      faEnvelope,
      faMapMarkedAlt,
      faAt,
      faKey,
      faLeftLong,
      faPercent,
      faFolderOpen
    );
  };

export default Icons;