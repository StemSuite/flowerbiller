import { useQuery } from "urql";
import { EVENTS_QUERY } from "../lib/Queries.js";
import { useEffect, useState } from "react";
import NewEvent from "../components/modals/NewEvent.js";
import { Flex, Heading } from "@chakra-ui/react";
import { pageHeaderStyle } from "../styles/styles.js";
import EventsTable from "../components/tables/EventsTable.js";

function Events() {

  const [events, setEvents] = useState([])

  const [fetchedEvents] = useQuery({
    query: EVENTS_QUERY
  })

   const { data, fetching, error } = fetchedEvents;
  
    useEffect(() => {
      if (data === undefined) return
      setEvents(data.events)
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <>
      <Heading sx={pageHeaderStyle}>Events</Heading>
        <Flex>
          <NewEvent/>
        </Flex>
      <EventsTable events={events}/>
    </>
    )
}

export default Events