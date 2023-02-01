import {  useState, useRef } from "react";
import { useMutation } from 'urql'
import { ADD_EVENT_ITEM } from "../../lib/Mutations.js";
import ProductField from "../shared/InputFields/ProductField.js"
import LengthField from "../shared/InputFields/LengthField.js"
import VarietyField from "../shared/InputFields/VarietyField.js"
import QuantityField from "../shared/InputFields/QuantityField.js"

function EventItemForm(props) {
    const [selectedProduct, setProduct] = useState({});
    const [prodUOM, setUOM] = useState(null)
    const inputProd = useRef(selectedProduct);
  
    const [ , addEventItem] = useMutation(ADD_EVENT_ITEM)
  
    function addProduct(e) {
      e.preventDefault();
      let newProd = {
                      variety: e.target.varietyField.value,
                      size: e.target.lenField.value,
                      uom: selectedProduct.uom,
                      quantity: Number(e.target.qtyPerBox.value),
                    };
      
      addEventItem({eventID: props.eventID, item: newProd})
  
      e.target.reset()
      setProduct({});
      setUOM(null)
      inputProd.current.focus();
    }
  
    return(
      <form className="purchaseForm" onSubmit={addProduct}>
        <ProductField inputProd={inputProd} setProduct={setProduct} setUOM={setUOM}/>
        <VarietyField prodID={selectedProduct.id}/>
        <LengthField validSizes={selectedProduct.sizes}/>
        <QuantityField label={"QTY"} name={"qtyPerBox"} uom={prodUOM}/>
        <input id="submit" type="submit" value="Add" />
      </form>
   )
  }
  
  export default EventItemForm