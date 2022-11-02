import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { STANDING_ORDER_QUERY } from "../lib/Queries.js";
import PurchaseForm from "./shared/PurchaseForm.js"
import DisplayPurch from "./shared/DisplayPurch.js"
import { useEffect, useState } from "react";

function StandingOrder () {
  const id = useParams().id

  const [prods, setProds] = useState([])

  const [standingOrder] = useQuery({
    query: STANDING_ORDER_QUERY,
    variables: { id },
  });

  const { data, fetching, error } = standingOrder;


  useEffect(() => {
    if (data === undefined) return 
    setProds(data.standingOrder.items)
  }, [data])

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  let info = data.standingOrder

	return (
		<div id="container">
			<h2>Standing Order</h2>
      <h3>Vendor:{info.vendor.shortHand} Dates:{info.startDate} - {info.endDate}</h3>

			<div>
        <PurchaseForm addedProds={prods} setProds={setProds} standingOrderId={id}/>
      </div>

      <div>
        <DisplayPurch addedProds={prods} setProds={setProds} standingOrderId={id}/>
      </div>

		</div>
	)
}

export default StandingOrder;
