import { useQuery } from "urql";
import { PRODUCT_TYPES_QUERY } from "../../../lib/Queries";

function ProductTypesField(props) {
  let setType = props.setType
  let setUOMs = props.setUOMs
  
  const [fetchedTypes] = useQuery({
    query: PRODUCT_TYPES_QUERY
  });

  const { data, fetching, error } = fetchedTypes;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  let types = data.productTypes

  function changeType(event) {
    console.log(data)
    let type = data.productTypes.find(type => type.name === event.target.value);
    if (setUOMs) setUOMs(type.uoms || []);
	setType(type || {});
  }

  return (
    <div>
      <label htmlFor="typeField">Product</label>
      <select name="typeField" id="type" onChange={changeType}>
        <option hidden> </option>
        {types.map(prod => {
          return <option value={prod.name} key={prod.id}>{prod.name}</option>;
        })}
      </select>
    </div>
  )
}

export default ProductTypesField;
