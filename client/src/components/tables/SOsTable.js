import OrdersTable from "./OrdersTable.js";

function SOsTable({standingOrders}) {
    const fields = [
        {header: 'Vendor', key: "venSH", sort: true},
        {header: 'Shipping via', key: "shipSH"},
        {header: 'Start Date', key: 'fstartDate'},
        {header: 'End Date', key: 'fendDate'},
        {header: 'Shipping Day', key: 'shippingDay'},
        {header: '# of Items', key: 'itemCount'}
    ]

    return (
        <OrdersTable
            orders={standingOrders}
            fields={fields}
            path={'standing_order'}
        />
    ) 
}

export default SOsTable;