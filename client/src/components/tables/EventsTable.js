import OrdersTable from "./OrdersTable.js";

function EventsTable({events}) {

    const fields = [
        {header: 'Customer', key: "customer", sort: true},
        {header: 'Title', key: "title"},
        {header: 'Date', key: 'fdate'},
        {header: 'Store', key: 'store'},
        {header: '# of Items', key: 'itemCount'}
      ]

    return (
        <OrdersTable
            orders={events}
            fields={fields}
            path={'event'}
        />
    ) 
}

export default EventsTable;