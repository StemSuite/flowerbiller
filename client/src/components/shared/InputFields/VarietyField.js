import { useState, useEffect } from "react";
import { useQuery } from "urql";
import { VARIETIES_BY_PRODUCT_ID_QUERY } from "../../../lib/Queries";

function VarietyField(props) {
  let prodID = props.prodID;

  const [varieties, setVarieties] = useState([]);

  const shouldPause = prodID === undefined || prodID === null
  const [fetchedVarieties] = useQuery({
    query: VARIETIES_BY_PRODUCT_ID_QUERY,
    variables: { prodID },
    pause: shouldPause,
  });

  const { data, fetching, error } = fetchedVarieties;

  useEffect(() => {
    if (data === undefined) return 
    setVarieties(data.varietiesByProdID)
  }, [data])

  if (error) return <pre>{error.message}</pre>

  function checkFetching() {
    return fetching ? <option>loading...</option> : <option hidden> </option>
  }
 
  return (
    <div>
      <label htmlFor="varietyField">Variety</label>
      <select name="varietyField" id="varietyField">
        {checkFetching()}
        {varieties.map((variety, i) => {
          return <option value={variety.id} key={i}>{variety.name}</option>;
        })}
      </select>
    </div>
  )
}

export default VarietyField;
