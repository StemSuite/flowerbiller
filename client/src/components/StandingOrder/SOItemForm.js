import React, {  useState, useRef } from "react";
import { useMutation } from 'urql'
import { ADD_SO_ITEM } from "../../lib/Mutations.js";
import ProductField from "../shared/InputFields/ProductField.js"
import LengthField from "../shared/InputFields/LengthField.js"
import VarietyField from "../shared/InputFields/VarietyField.js"
import BoxTypeField from "../shared/InputFields/BoxTypeField.js"
import QuantityField from "../shared/InputFields/QuantityField.js"
import PriceField from "../shared/InputFields/PriceField.js"

function SOItemForm(props) {
  const [selectedProduct, setProduct] = useState({});
  const [prodUOM, setUOM] = useState(null)
  const inputProd = useRef(selectedProduct);

  const [ , addSOItem] = useMutation(ADD_SO_ITEM)

  function addProduct(e) {
    e.preventDefault();
    let newProd = { 
                    variety: e.target.varietyField.value,
                    size: e.target.lenField.value,
                    boxType: e.target.boxField.value,
                    boxCount: Number(e.target.boxCount.value),
                    qtyPerBox: Number(e.target.qtyPerBox.value),
                    pricePerUnit: Number(e.target.priceField.value).toFixed(2),
                  };

    newProd.totalQty = (newProd.boxCount * newProd.qtyPerBox)
    newProd.totalPrice = (newProd.totalQty * newProd.pricePerUnit)

    addSOItem({standingOrderId: props.standingOrderId, item: newProd})

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
      <QuantityField label={"Boxes"} name={"boxCount"}/>
      <BoxTypeField/>
      <QuantityField label={"QTY/Box"} name={"qtyPerBox"} uom={prodUOM}/>
      <PriceField/>
      <input id="submit" type="submit" value="Add" />
    </form>
 )
}

export default SOItemForm
