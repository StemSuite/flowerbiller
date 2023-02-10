import { TableContainer, Table, Thead, Tr, Tbody, Th, Icon, Td, LinkBox, LinkOverlay, Box} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import sort from "../../lib/Sort.js";
import { TbArrowsSort } from "react-icons/tb";


function OrdersTable({orders, fields, path}) {
  const [sortValue, setSort] = useState({key: fields[0].key, ascending: true});
  const [sortedOrders, setOrders] = useState(sort[sortValue.key](orders))

  useEffect(() =>{
    let ordersCopy = [...orders]
    let sortedOrders = sort[sortValue.key](ordersCopy)
    setOrders(sortValue.ascending ? sortedOrders : sortedOrders.reverse())
  },[orders, sortValue])

  function changeSort(key, ascending) {
    setSort({key: key, ascending: ascending});
  }

  function formatRow(order, field) {
    if (!order[field.key]) return "--"
    if (typeof order[field.key] === 'object' ) {
        if (order[field.key].length === 0) return "--"
        return order[field.key].map((str, i) => {
            return <span key={i}>{order[field.key][i+1] ? `${str}, ` : str}</span>
        })
    }
    return order[field.key]
  }

  function Headers() {
    return fields.map((field, i) => {
      if (field.sort) {
        return (
            <Th 
                textAlign="center"
                textDecor="underline"
                cursor="pointer"
                key={i} 
                onClick={() => changeSort(field.key, !sortValue.ascending)}
                >
                {field.header}
                <Icon as={TbArrowsSort}></Icon>
            </Th>
        )
      }
      return <Th textAlign="center" key={i}>{field.header}</Th>
    })
  }

   function Orders({orders}) {
    return orders.map(order => {
      
      return (
        <Tr key={order._id}>
                {fields.map((field, i) => {
                    return (
                        <Td 
                            maxHeight="25px"
                            textAlign="center" 
                            key={i}
                        >
                            <LinkBox as={Box} width="full" height="full">
                                <LinkOverlay 
                                    href={`/${path}/${order._id}`} 
                                    display
                                >
                                    {formatRow(order, field)}
                                </LinkOverlay>
                            </LinkBox>
                        </Td>
                    )
                })}
            
        </Tr>
        )
    })
   }

    return (
        <TableContainer overflowX="unset" overflowY="unset" >
          <Table variant="striped" colorScheme="gray"  border-collapase="sperate">
            <Thead bg="white" position="sticky" top={0} zIndex="docked" borderBottomColor="green.400" borderBottomWidth="4px">
              <Tr>
                <Headers />
              </Tr>
            </Thead>
            <Tbody textAlign="center">
              <Orders orders={sortedOrders}/>
            </Tbody>
          </Table>
        </TableContainer>
    )

}

export default OrdersTable;