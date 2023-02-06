function Shipments () {

    let fields = [
        {header: 'Shipping Method', key: "shippingMethod"},
        {header: 'Shipping Date', key: 'shippingDate'},
        {header: 'Arrival Date', key: 'arrivalDate'},
        {header: '# of Items', key: 'itemCount'}
      ]

    let headers = fields.map((field, i) => {
    return <th className="sort-header" key={i}>{field.header}</th>
    })

    return (
        <div>
            <h2>Shipments</h2>
            <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
          </table>
        </div>
    )
}

export default Shipments