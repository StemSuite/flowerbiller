import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { STANDING_ORDER_QUERY } from "../../lib/Queries.js";
import SOItemForm from "./SOItemForm.js"
import SOItems from "./SOItems"
import { useEffect, useState } from "react";
import { daysOfTheWeek } from "../../lib/data.js";

function StandingOrder () {
  const id = useParams().id

  const [items, setItems] = useState([])

  const [standingOrder] = useQuery({
    query: STANDING_ORDER_QUERY,
    variables: { id },
  });

  const { data, fetching, error } = standingOrder;

  useEffect(() => {
    if (data === undefined) return 
    setItems(data.standingOrder.items)
  }, [data])

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  let info = data.standingOrder

	return (
		<div id="container">
			<h2>Standing Order</h2>
      <div id="info-title">
        <div>
          <label htmlFor="soVendor">Vendor</label>
          <h4 name="soVendor" id="so-vendor">{info.vendor.shortHand}</h4>
        </div>
        <div>
          <label htmlFor="soDates">Dates</label>
          <h4 name="soDates" id="so-dates">{info.startDate} - {info.endDate}</h4>
        </div>
        <div>
          <label htmlFor="soShipping">Shipping</label>
          <h4 name="soShipping" id="so-shipping">{daysOfTheWeek[info.shippingDay]}(s) via {info.shippingMethod.shortHand}</h4>
        </div>
      </div>

			<div>
        <SOItemForm standingOrderId={id}/>
      </div>

      <div>
        <SOItems addedProds={items} setProds={setItems} orderId={id}/>
      </div>

		</div>
	)
}

export default StandingOrder;
