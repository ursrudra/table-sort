import React from 'react'

export default function CoinTable(props) {
  const {renderSelectView} = props;
  const sdata = [{value:'asc'},{value:'desc'}];
  return (
    <table id="dashboard">
      <thead>
         <tr>
             <th>#
              {renderSelectView('rank','number',sdata)}
             </th>
             <th>Name
             {renderSelectView('name','name',sdata)}
             </th>
             <th>Symbol
             {renderSelectView('symbol','name',sdata)}
             </th>
             <th>Price
             {renderSelectView('price_usd','number',sdata)}
             </th>
             <th className="mobile">%hour
             {renderSelectView('hour','number',sdata)}
             </th>
             <th className="mobile">%day
             {renderSelectView('day','number',sdata)}
             </th>
             <th className="mobile">%week
             {renderSelectView('week','number',sdata)}
             </th>
         </tr>
      </thead>
      <tbody>
      {
           props.data.map(row => (
         props.editIndex === row.rank && props.isInEditMode ? props.renderEditView():    
        
         props.renderDefaultView(row.rank)  
         
           ))
      }

      </tbody>
    </table>
  )
}
