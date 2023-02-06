import {  useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from 'urql'
import { ADD_EVENT_ITEM } from "../../lib/Mutations.js";
import ProductField from "../shared/InputFields/ProductField.js"
import LengthField from "../shared/InputFields/LengthField.js"
import VarietyField from "../shared/InputFields/VarietyField.js"
import QuantityField from "../shared/InputFields/QuantityField.js"
import { PRODUCTS_AND_VARIETIES_QUERY } from "../../lib/Queries";

function EventItemForm(props) {
    const [products, setProducts] = useState([])
    const [selectedProduct, setProduct] = useState([]);
    const [prodUOM, setUOM] = useState(null)
    const inputProd = useRef(selectedProduct);
  
    const [ , addEventItem] = useMutation(ADD_EVENT_ITEM)

    const [fetchedProds] = useQuery({
      query: PRODUCTS_AND_VARIETIES_QUERY
    });

    const { data, fetching, error } = fetchedProds;       
  
    useEffect(() => {
        if (data === undefined) return
        setProducts(data.products)
    }, [data, setProducts])
    
    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>
  
    function addProduct(e) {
      e.preventDefault();
      let newProd = {
                      product: selectedProduct.name,
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
        <ProductField inputProd={inputProd} products={products} setProduct={setProduct} setUOM={setUOM}/>
        <VarietyField product={selectedProduct}/>
        <LengthField validSizes={selectedProduct.sizes}/>
        <QuantityField label={"QTY"} name={"qtyPerBox"} uom={prodUOM}/>
        <input id="submit" type="submit" value="Add" />
      </form>
   )
  }
  
  export default EventItemForm