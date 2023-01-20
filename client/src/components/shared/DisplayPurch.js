import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import SortField from "./InputFields/SortField.js";
import sort from "./Sort.js"
import {DELETE_PURCHASE, DELETE_SO_ITEM} from "../../lib/Mutations.js";

function DisplayPurch(props) {
  const [sortValue, setSort] = useState(sort.Product.label);
  const [sortedProds, setProds] = useState(sort[sortValue].func(props.addedProds))

  useEffect(() =>{
    setProds(sort[sortValue].func(props.addedProds))
  },[props.addedProds, sortValue])

  const [ , deletePurchase] = useMutation(DELETE_PURCHASE)
  const [ , deleteSOItem] = useMutation(DELETE_SO_ITEM)

  
  const sortOptions = [sort.Product.label, sort.Vendor.label]

  function changeSort(e) {
    setSort(e.target.value);
  } 

  function deleteProd(itemId) {
    if (props.standingOrderId) {
      deleteSOItem({standingOrderId: props.standingOrderId, itemId: itemId})
    }else {
      deletePurchase({itemId: itemId})
    }
  }

  let fields = [ 
    { header: 'Vendor', key: 'ven'}, 
    { header: 'Product', key: 'prod'},
    { header: 'Len', key: 'len'},
    { header: 'Variety', key: 'var'},
    { header: 'Boxes', key: 'boxCount'},
    { header: 'Box Type', key: 'boxType'},
    { header: 'Qty/Box', key: 'qtyPerBox'},
    { header: 'UoM', key: 'uom'},
    { header: '$/Unit', key: 'pricePerUnit'},
    { header: 'Total Qty', key: 'totalQty'},
    { header: 'Total $', key: 'totalPrice'},
   ]

   if (props.standingOrderId) fields = fields.slice(1)

   let headers = fields.map((field, i) => {
    return <th className="sort-header" key={i}>{field.header}</th>
   })

  let prodList = sortedProds.map(prod => {
    prod.pricePerUnit = Number(prod.pricePerUnit).toFixed(2)
    prod.totalPrice = Number(prod.totalPrice).toFixed(2)
    
    return (
      <tr  key={prod._id}>
        {fields.map((field, i) => <td key={i}>{prod[field.key]}</td>)}
        <td><button onClick={() => deleteProd(prod._id)}>Delete</button></td>
      </tr>
      )
    })

    return(
      <div>
        <SortField options={sortOptions} sortValue={sortValue} changeSort={changeSort} />
        <table>
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{prodList}</tbody>
      </table>
    </div>
  )
}

export default DisplayPurch;
