import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { EVENT_QUERY } from "../../lib/Queries";
import EventItemForm from "./EventItemForm";
import EventItems from "./EventItems";

function Event() {
    const id = useParams().id
    
    const [items, setItems] = useState([])

    const [event] = useQuery({
        query: EVENT_QUERY,
        variables: { id },
    });

    const { data, fetching, error } = event

    useEffect(() => {
        if (data === undefined) return
        setItems(data.event.items)
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <div id="container">
            <h2>Event</h2>
            <div id="info-title">
                <div>
                    <label htmlFor="eventStore">Store</label>
                    <h4 name="eventStore" id="event-store">{data.event.store}</h4>
                </div>
                <div>
                    <label htmlFor="eventDate">Date</label>
                    <h4 name="eventDate" id="event-date">{data.event.fdate}</h4>
                </div>
                <div>
                    <label htmlFor="eventTitle">Title</label>
                    <h4 name="eventTitle" id="event-title">{data.event.title}</h4>
                </div>
                <div>
                    <label htmlFor="eventCustomer">Customer</label>
                    <h4 name="eventCustomer" id="event-customer">{data.event.customer}</h4>
                </div>
            </div>
            <div>
                <EventItemForm eventID={id}/>
            </div>
            <div>
                <EventItems items={items} eventID={id}/>
            </div>
		</div>
	)
}

export default Event;