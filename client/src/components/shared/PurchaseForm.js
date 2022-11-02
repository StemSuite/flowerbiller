import React, {  useState, useRef } from "react";
import { useMutation, useQuery } from 'urql'
import { PRODUCTS_QUERY } from "../../lib/Queries.js"
import { ADD_PURCHASE, ADD_SO_ITEM } from "../../lib/Mutations.js";
import VendorField from "./InputFields/VendorField.js"
import ProductField from "./InputFields/ProductField.js"
import LengthField from "./InputFields/LengthField.js"
import VarietyField from "./InputFields/VarietyField.js"
import BoxTypeField from "./InputFields/BoxTypeField.js"
import QuantityField from "./InputFields/QuantityField.js"
import PriceField from "./InputFields/PriceField.js"

function PurchaseForm(props) {
  const noProduct = {varieties: [], lens: []};

  const [selectedProduct, setProduct] = useState(noProduct);
  const inputVen = useRef(null);
  const inputProd = useRef(selectedProduct);
  const inputLength = useRef(null);
  const inputVariety = useRef(null);
  const inputBoxType = useRef(null);
  const inputBoxCount = useRef(null);
  const inputQuantity = useRef(null);
  const inputPrice = useRef(null);

  const [ , addPurchs] = useMutation(ADD_PURCHASE)
  const [ , addSOItem] = useMutation(ADD_SO_ITEM)
  
  const [fetchedProds] = useQuery({
    query: PRODUCTS_QUERY
  });

  const { data, fetching, error } = fetchedProds;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  function resetInputs() {
    setProduct(noProduct);
    inputLength.current.value = null;
    inputVariety.current.value = null;
    inputBoxType.current.value = null;
    inputBoxCount.current.value = null;
    inputQuantity.current.value = null;
    inputPrice.current.value = null;
    inputProd.current.focus();
  }

	function changeProduct(event) {
    inputLength.current.value = null;
    inputVariety.current.value = null;
    inputBoxType.current.value = null;
    inputBoxCount.current.value = null;
    inputQuantity.current.value = null;
    inputPrice.current.value = null;

    let product = data.products.find(prd => prd.name === event.target.value);
		setProduct(product || noProduct);
	}

  function addProduct(e) {
    e.preventDefault();
    let newProd = {
                    prod: selectedProduct.name,
                    len: inputLength.current.value,
                    uom: selectedProduct.uom,
                    var: inputVariety.current.value,
                    boxType: inputBoxType.current.value,
                    boxCount: Number(inputBoxCount.current.value),
                    qtyPerBox: Number(inputQuantity.current.value),
                    pricePerUnit: parseFloat(Number(inputPrice.current.value).toFixed(2)),
                  };
    
    if (!props.standingOrderId) newProd.ven = inputVen.current.value
    newProd['totalQty'] = newProd.boxCount * newProd.qtyPerBox;
    newProd['totalPrice'] = parseFloat((newProd.pricePerUnit * newProd.totalQty).toFixed(2));
    
    if (props.standingOrderId) {
      addSOItem({standingOrderId: props.standingOrderId, item: newProd})
    } else {
      addPurchs({ purchase: newProd })
    }

    resetInputs()
  }

  let headers = ['Vendor', 'Product', 'Len', 'Variety', 'Box Count',
                  'Box Type', 'Qty/Box', 'Price/Unit']
                  
  if (props.standingOrderId) headers = headers.slice(1)

  headers = headers.map((header, i) => <th key={i}>{header}</th>)

  function vendorField() {
    if (!props.standingOrderId) return <td><VendorField inputVen={inputVen}/></td>
  }

  return(
    <table >
     <thead id="purch_table">
       <tr>{headers}</tr>
     </thead>
     <tbody>
      <tr id="purch_table">
        {vendorField()}
        <td><ProductField products={data.products} inputProd={inputProd} selectedProduct={selectedProduct} changeProduct={changeProduct}/></td>
        <td><LengthField selectedProduct={selectedProduct} inputLength={inputLength}/></td>
        <td><VarietyField selectedProduct={selectedProduct} inputVariety={inputVariety}/></td>
        <td><QuantityField input={inputBoxCount}/></td>
        <td><BoxTypeField inputBoxType={inputBoxType}/></td>
        <td><QuantityField input={inputQuantity}/></td>
        <td><PriceField inputPrice={inputPrice}/></td>
        <td><button onClick={addProduct}>Add</button></td>
      </tr>
     </tbody>
   </table>
 )
}

export default PurchaseForm
