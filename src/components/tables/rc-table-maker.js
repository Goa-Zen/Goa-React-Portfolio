import React from 'react';
import Table from 'rc-table';

const RcTableMaker = (props) =>  {

    const dataEnd = props.object.map(item => {
            
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
        <div className='table-main-wrapper'>
            <Table 
              columns={columnsEnd} 
              data={dataEnd} 
              className ="table-report-indicators"
              sticky = "true"
              rowHoverable = "true"
              />
        </div>

        );
  
}

export default RcTableMaker;