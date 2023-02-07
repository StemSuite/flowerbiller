import { useQuery } from "urql";
import { STANDING_ORDERS_QUERY } from "../../lib/Queries.js";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import NewStandingOrder from "./modals/NewStandingOrder.js";
import { daysOfTheWeek } from "../../lib/data.js";

const fields = [
  {header: 'Vendor', key: "venSH"},
  {header: 'Shipping via', key: "shipSH"},
  {header: 'Start Date', key: 'fstartDate'},
  {header: 'End Date', key: 'fendDate'},
  {header: 'Shipping Day', key: 'dayOfWeek'},
  {header: '# of Items', key: 'itemCount'}
]


function StandingOrders () {
  const [sortValue, setSort] = useState({ key: 'venSH', ascending: true });
  const [standingOrders, setStandingOrders] = useState([]);

  // useEffect(() => {
  //   const currentSOCopy = [...standingOrders];

  //   const sortedSOs = currentSOCopy.sort((a, b) => {
  //     return a[sorting.key].localeCompare(b[sorting.key]);
  //   });

  //   setStandingOrders(
  //     sorting.ascending ? sortedSOs : sortedSOs.reverse()
  //   );
  // }, [sorting, standingOrders]);
  
    const [standingOrder] = useQuery({
      query: STANDING_ORDERS_QUERY,
    });
  
    const { data, fetching, error } = standingOrder;
  
    useEffect(() => {
      if (data === undefined) return
      setStandingOrders(data.standingOrders)
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    function changeSort(key, ascending) {
      setSort({key: key, ascending: ascending});
    } 

    let headers = fields.map((field, i) => {
      if (field.sort) {
        return <th className="sort-header" key={i} onClick={() => changeSort(field.key, !sortValue.ascending)}>{field.header}</th>
      }
      return <th className="static-header" key={i}>{field.header}</th>
     })

    let list = standingOrders.map(so => {
      so.dayOfWeek = daysOfTheWeek[so.shippingDay]
      return (
        <tr  key={so._id} >
          {fields.map((field, i) => <td key={i}>{so[field.key]}</td>)}
          <td><NavLink to={`/standing_order/${so._id}`}>View/Edit</NavLink></td>
        </tr>
        )
    })

      return (
        <div className="list-display">
          <h2>Standing Orders</h2>
          <NewStandingOrder/>
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