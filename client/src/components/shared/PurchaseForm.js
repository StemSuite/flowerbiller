import React, {  useState, useRef } from "react";
import { useMutation, useQuery } from 'urql'
import { PRODUCTS_QUERY } from "../../lib/Queries.js"
import { ADD_PURCHASE, ADD_SO_ITEM } from "../../lib/Mutations.js";
//import VendorField from "./InputFields/VendorField.js"
import ProductField from "./InputFields/ProductField.js"
import LengthField from "./InputFields/LengthField.js"
import VarietyField from "./InputFields/VarietyField.js"
import BoxTypeField from "./InputFields/BoxTypeField.js"
import QuantityField from "./InputFields/QuantityField.js"
import PriceField from "./InputFields/PriceField.js"

function PurchaseForm(props) {
  const noProduct = {varieties: [], lens: []};

  const [selectedProduct, setProduct] = useState(noProduct);
  const inputProd = useRef(selectedProduct);


  const [ , addPurchs] = useMutation(ADD_PURCHASE)
  const [ , addSOItem] = useMutation(ADD_SO_ITEM)
  
  const [fetchedProds] = useQuery({
    query: PRODUCTS_QUERY
  });

  const { data, fetching, error } = fetchedProds;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

	function changeProduct(event) {
    let product = data.products.find(prd => prd.name === event.target.value);
		setProduct(product || noProduct);
	}

  function addProduct(e) {
    e.preventDefault();
    let newProd = {
                    prod: e.target.prodField.value,
                    len: e.target.lenField.value,
                    uom: selectedProduct.uom,
                    var: e.target.varietyField.value,
                    boxType: e.target.boxField.value,
                    boxCount: Number(e.target.boxCount.value,),
                    qtyPerBox: Number(e.target.qtyPerBox.value,),
                    pricePerUnit: parseFloat(Number(e.target.priceField.value,).toFixed(2)),
                  };

    //if (!props.standingOrderId) newProd.ven = inputVen.current.value
    newProd['totalQty'] = newProd.boxCount * newProd.qtyPerBox;
    newProd['totalPrice'] = parseFloat((newProd.pricePerUnit * newProd.totalQty).toFixed(2));
    
    if (props.standingOrderId) {
      console.log('prod', newProd)
      console.log('id', props.standingOrderId)
      addSOItem({standingOrderId: props.standingOrderId, item: newProd})
    } else {
      addPurchs({ purchase: newProd })
    }

    e.target.reset()
    setProduct(noProduct);
    inputProd.current.focus();
  }

  function vendorField() {
    // if (!props.standingOrderId) {
    //   return (
    //     <span>
    //       <label htmlFor="venField">Vendor</label>
    //       <VendorField inputVen={inputVen}/>
    //     </span>
    //   )
    // }
  }

  return(
    <form className="purchaseForm" onSubmit={addProduct}>
      {vendorField()}
      <ProductField products={data.products} inputProd={inputProd} selectedProduct={selectedProduct} changeProduct={changeProduct}/>
      <LengthField selectedProduct={selectedProduct}/>
      <VarietyField selectedProduct={selectedProduct}/>
      <QuantityField label={"Boxes"} name={"boxCount"}/>
      <BoxTypeField/>
      <QuantityField label={"QTY/Box"}name={"qtyPerBox"}/>
      <PriceField/>
      <input id="submit" type="submit" value="Add" />
    </form>
 )
}

export default PurchaseForm
