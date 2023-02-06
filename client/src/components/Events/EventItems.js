import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import sort from "../../lib/Sort.js";
import { DELETE_EVENT_ITEM } from "../../lib/Mutations.js";

function EventItems(props) {
  const [sortValue, setSort] = useState({label: 'Product', ascending: true});
  const [sortedProds, setProds] = useState(sort[sortValue.label].func(props.addedProds))
//   const [sortedProds, setProds] = useState(props.addedProds)
  const [ , deleteSOItem] = useMutation(DELETE_EVENT_ITEM)

  useEffect(() =>{
    let prodsCopy = [...props.addedProds]
    let sortedProds = sort[sortValue.label].func(prodsCopy)
    setProds(sortValue.ascending ? sortedProds : sortedProds.reverse())
  },[props.addedProds, sortValue])

  function changeSort(header, ascending) {
    setSort({label: header, ascending: ascending});
  }

    useEffect(() => {
        setProds(props.addedProds)
    },[props.addedProds])

  function deleteProd(itemID) {
    deleteSOItem({eventID: props.orderId, itemID: itemID})
  }

  let fields = [ 
    { header: 'Product', key: 'product'},
    { header: 'Variety', key: 'variety'},
    { header: 'Size', key: 'size'},
    { header: 'UoM', key: 'uom'},
    { header: 'QTY', key: 'quantity'},
   ]

   let headers = fields.map((field, i) => {
    return <th className="sort-header" key={i} onClick={() => changeSort(field.header, !sortValue.ascending)}>{field.header}</th>
   })

  let prodList = sortedProds.map(prod => {
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

export default EventItems;