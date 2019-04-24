import React from 'react'

export default function CoinTable(props) {
  return (
    <table id="customers">
      <thead>
         <tr>
             <th onClick={()=>props.sortBy('rank')}>#</th>
             <th onClick={()=>props.sortBy('name')}>Name</th>
             <th>Symbol</th>
             <th onClick={()=>props.sortBy('price_usd')}>Price</th>
             <th>%hour</th>
             <th>%day</th>
             <th>%week</th>
         </tr>
      </thead>
      <tbody>
      {
           props.data.map(row => (
               <tr>
                   <td>{row.rank}</td>
                   <td>{row.name}</td>
                   <td>{row.symbol}</td>
                   <td>{row.price_usd}</td>
                   <td>{row.percent_change_1h}</td>
                   <td>{row.percent_change_24h}</td>
                   <td>{row.percent_change_7d}</td>


               </tr>
           ))
      }

      </tbody>
    </table>
  )
}
