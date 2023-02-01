export const PRODUCT_TYPES_QUERY =  `
    query product{
        productTypes {
            id
            name
            uoms
        }
    }`;

export const PRODUCTS_QUERY =  `
    query products{
        products {
            id
            name
            uom
            sizes
        }
    }`;

export const VARIETIES_QUERY = `
    query varieties{
        varieties {
            id
            product {
                name
                type {
                    name
                }
            }
            name
            colors
            tags
        }
    }`;

export const VARIETIES_BY_PRODUCT_ID_QUERY = `
    query varietiesByProdID($prodID: String!) {
        varietiesByProdID(prodID: $prodID) {
            id
            name
        }
    }`;

export const STANDING_ORDERS_QUERY = `
    query standingOrders {
        standingOrders {
            _id
            vendor {
                shortHand
            }
            startDate
            endDate
        }
    }`;

export const STANDING_ORDER_QUERY = `
    query standingOrder($id: String!) {
        standingOrder(id: $id) {
            _id
        vendor {
          shortHand
        }
        shippingMethod {
          shortHand
        }
        startDate
        endDate
        shippingDay
        items {
            _id
            prodName
            size
            varName
            boxCount
            boxType
            qtyPerBox
            uom
            pricePerUnit
            totalQty
            totalPrice
        }
      }
    }`;

export const VENDORS_QUERY = `
    query vendors {
        vendors {
            id
            shortHand
            shippingMethods {
                id
                shortHand
                shippingDays
            }
        }
    }`;

export const EVENTS_QUERY = `
    query events {
        events {
            _id
            store {
                name
            }
            title
            customer
            location
            date
        }
    }`;

export const EVENT_QUERY = `
    query event($id: String!) {
        event(id: $id) {
            _id
            title
            customer
            date
            store {
                name
            }
            items {
                _id
                prodName
                size
                varName
                uom
                quantity
            }
        }
    }`;

export const STORES_QUERY = `
    query stores {
        stores {
            id
            name
        }
    }
`;