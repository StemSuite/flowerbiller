import { useQuery } from "urql";
import { EVENTS_QUERY } from "../../lib/Queries.js";
import { useEffect } from "react";
import NewEvent from "./modals/NewEvent.js";
import { NavLink } from "react-router-dom"

function Events() {

  const [events] = useQuery({
    query: EVENTS_QUERY
  })

   const { data, fetching, error } = events;
  
    useEffect(() => {
      if (data === undefined) return
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    let fields = [
      {header: 'Customer', key: "customer"},
      {header: 'Title', key: "title"},
      {header: 'Date', key: 'fdate'},
      {header: 'Store', key: 'store'},
      {header: '# of Items', key: 'itemCount'}
    ]

    let headers = fields.map((field, i) => {
      return <th className="event-header" key={i}>{field.header}</th>
    })

    let list = data.events.map(event => {
      return (
        <tr key={event._id}>
          {fields.map((field, i) => <td key={i}>{event[field.key]}</td>)}
          <td><NavLink to={`/event/${event._id}`}>View/Edit</NavLink></td>
        </tr>
      )
    })

    return (
        <div className="list-display">
          <h2>Events</h2>
          <NewEvent/>
          <table>
            <thead>
              <tr>{headers}</tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
    )
}

export default Events