import React, { useEffect, useState } from "react";
import sort from "../../lib/Sort.js";


function ItemsList({items, handleDeleteItem, fields}) {
  const [sortValue, setSort] = useState({key: fields[0].key, ascending: true});
  const [sortedItems, setItems] = useState(sort[sortValue.key](items))

  useEffect(() =>{
    let prodsCopy = [...items]
    let sortedProds = sort[sortValue.key](prodsCopy)
    setItems(sortValue.ascending ? sortedProds : sortedProds.reverse())
  },[items, sortValue])

  function changeSort(key, ascending) {
    setSort({key: key, ascending: ascending});
  } 

  function formatRow(item, field) {
    if (typeof item[field.key] === 'object' ) {
        if (item[field.key].length === 0) return "--"
        return item[field.key].map((str, i) => {
            return <span key={i}>{item[field.key][i+1] ? `${str}, ` : str}</span>
        })
    }
    return item[field.key] || "--"
  }

  function DeleteButton({itemID}) {
    if (handleDeleteItem) {
        return <td id="delete-button"><button onClick={() => handleDeleteItem(itemID)}>
                   Delete</button></td>
    }
  }

   let headers = fields.map((field, i) => {
    if (field.sort) {
      return <th className="sort-header" key={i} onClick={() => changeSort(field.key, !sortValue.ascending)}>{field.header}</th>
    }
    return <th className="static-header" key={i}>{field.header}</th>
   })

  let prodList = sortedItems.map(item => {

    if (item.pricePerUnit && typeof item.pricePerUnit !== 'string') item.pricePerUnit = '$' + item.pricePerUnit.toFixed(2)
    if (item.totalPrice && typeof item.totalPrice !== 'string') item.totalPrice = '$' + item.totalPrice.toFixed(2)
    
    return (
      <tr  key={item._id}>
        {fields.map((field, i) => <td key={i}>{formatRow(item, field)}</td>)}
        <DeleteButton itemID={item._id}/>
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

export default ItemsList;