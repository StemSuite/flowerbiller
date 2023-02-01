import { useQuery } from "urql";
import { PRODUCTS_QUERY } from "../../../lib/Queries";

function ProductField(props) {
  let inputProd = props.inputProd
  let setProduct = props.setProduct
  let setUOM = props.setUOM
  
  const [fetchedProds] = useQuery({
    query: PRODUCTS_QUERY
  });

  const { data, fetching, error } = fetchedProds;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  let products = data.products

  function changeProduct(event) {
    let product = data.products.find(prd => prd.name === event.target.value);
    if (setUOM) setUOM(product.uom);
		setProduct(product || {});
	}

  return (
    <div>
      <label htmlFor="prodField">Product</label>
      <select ref={inputProd} name="prodField" id="prodField" onChange={changeProduct}>
        <option hidden> </option>
        {products.map(prod => {
          return <option value={prod.name} key={prod.id}>{prod.name}</option>;
        })}
      </select>
    </div>
  )
}

export default ProductField;
