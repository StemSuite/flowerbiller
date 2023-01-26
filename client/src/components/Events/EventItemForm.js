import {  useState, useRef } from "react";
import { useMutation, useQuery } from 'urql'
import { PRODUCTS_QUERY } from "../../lib/Queries.js"
import { ADD_EVENT_ITEM } from "../../lib/Mutations.js";
import ProductField from "../shared/InputFields/ProductField.js"
import LengthField from "../shared/InputFields/LengthField.js"
import VarietyField from "../shared/InputFields/VarietyField.js"
import QuantityField from "../shared/InputFields/QuantityField.js"

function EventItemForm(props) {
    const noProduct = {varieties: [], lens: []};
  
    const [selectedProduct, setProduct] = useState(noProduct);
    const [prodUOM, setUOM] = useState(null)
    const inputProd = useRef(selectedProduct);
  
    const [ , addEventItem] = useMutation(ADD_EVENT_ITEM)
    
    const [fetchedProds] = useQuery({
      query: PRODUCTS_QUERY
    });
  
    const { data, fetching, error } = fetchedProds;
  
    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>
  
    function changeProduct(event) {
      let product = data.products.find(prd => prd.name === event.target.value);
      setUOM(product.uom)
      setProduct(product || noProduct);
    }
  
    function addProduct(e) {
      e.preventDefault();
      let newProd = {
                      prod: e.target.prodField.value,
                      len: e.target.lenField.value,
                      uom: selectedProduct.uom,
                      var: e.target.varietyField.value,
                      quantity: Number(e.target.qtyPerBox.value,),
                    };
      
      addEventItem({eventID: props.eventID, item: newProd})
  
      e.target.reset()
      setProduct(noProduct);
      setUOM(null)
      inputProd.current.focus();
    }
  
    return(
      <form className="purchaseForm" onSubmit={addProduct}>
        <ProductField products={data.products} inputProd={inputProd} selectedProduct={selectedProduct} changeProduct={changeProduct}/>
        <LengthField selectedProduct={selectedProduct}/>
        <VarietyField selectedProduct={selectedProduct}/>
        <QuantityField label={"QTY"} name={"qtyPerBox"} uom={prodUOM}/>
        <input id="submit" type="submit" value="Add" />
      </form>
   )
  }
  
  export default EventItemForm