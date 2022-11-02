import { useQuery } from "urql";
import { STANDING_ORDERS_QUERY } from "../lib/Queries.js";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"

function StandingOrders () {
  
    const [standingOrder] = useQuery({
      query: STANDING_ORDERS_QUERY,
    });
  
    const { data, fetching, error } = standingOrder;
  
  
    useEffect(() => {
      if (data === undefined) return 
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    let fields = [
      {header: 'Vendor', key: "venLabel"},
      {header: 'Start Date', key: 'startDate'},
      {header: 'End Date', key: 'endDate'}
    ]

    let headers = fields.map((field, i) => {
      return <th class="sort-header" key={i}>{field.header}</th>
     })

    let list = data.standingOrders.map(so => {
      so.venLabel = so.vendor.shortHand
      return (
        <tr  key={so._id} >
          {fields.map((field, i) => <td key={i} >{so[field.key]}</td>)}
          <td><NavLink to={`/standing_order/${so._id}`}>View/Edit</NavLink></td>
        </tr>
        )
    })
  
      return (
        <div>
          <h2>Standing Orders</h2>
          <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      )
  }
  
  export default StandingOrders;