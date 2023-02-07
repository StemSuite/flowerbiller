import ItemsList from "../shared/itemsList.js";
import { DELETE_EVENT_ITEM } from "../../lib/Mutations.js";
import { useMutation } from "urql";

function EventItems({items, eventID}) {

  const [ , deleteEventItem] = useMutation(DELETE_EVENT_ITEM)

  const fields = [ 
    { header: 'Product', key: 'product', sort: true},
    { header: 'Variety', key: 'variety'},
    { header: 'Size', key: 'size'},
    { header: 'UoM', key: 'uom'},
    { header: 'QTY', key: 'quantity'},
   ]

   function handleDeleteItem(itemID) {
    deleteEventItem({eventID: eventID, itemID: itemID})
   }

  return (
    <ItemsList
      items={items}
      fields={fields}
      handleDeleteItem={handleDeleteItem}
    />
  )
}

export default EventItems;