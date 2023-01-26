import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import sort from "../../lib/Sort.js";
import { DELETE_SO_ITEM } from "../../lib/Mutations.js";

function SOItems(props) {
  const [sortValue, setSort] = useState({label: 'Product', ascending: true});
  const [sortedProds, setProds] = useState(sort[sortValue.label].func(props.addedProds))
  const [ , deleteSOItem] = useMutation(DELETE_SO_ITEM)

  useEffect(() =>{
    let prodsCopy = [...props.addedProds]
    let sortedProds = sort[sortValue.label].func(prodsCopy)
    setProds(sortValue.ascending ? sortedProds : sortedProds.reverse())
  },[props.addedProds, sortValue])

  function changeSort(header, ascending) {
    setSort({label: header, ascending: ascending});
  } 

  function deleteProd(itemId) {
    deleteSOItem({standingOrderId: props.orderId, itemId: itemId})
  }

  let fields = [ 
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

   let headers = fields.map((field, i) => {
    return <th className="sort-header" key={i} onClick={() => changeSort(field.header, !sortValue.ascending)}>{field.header}</th>
   })

  let prodList = sortedProds.map(prod => {
    prod.pricePerUnit = Number(prod.pricePerUnit).toFixed(2)
    prod.totalPrice = Number(prod.totalPrice).toFixed(2)
    
    return (
      <tr  key={prod._id}>
        {fields.map((field, i) => <td key={i}>{prod[field.key]}</td>)}
        <td id="delete-button"><button onClick={() => deleteProd(prod._id)}>Delete</button></td>
      </tr>
      )
    })

    return(
      <div>
        <table id="product-table">
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{prodList}</tbody>
      </table>
    </div>
  )
}

export default SOItems;
