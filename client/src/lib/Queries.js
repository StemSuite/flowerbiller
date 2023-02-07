export const PRODUCT_TYPES_QUERY =  `
    query product{
        productTypes {
            id
            name
            uoms
            defaultDaysToExp
        }
    }`;

export const PRODUCTS_ONLY_QUERY =  `
    query products{
        products {
            id
            name
            uom
            sizes
        }
    }`;

export const PRODUCTS_AND_VARIETIES_QUERY =  `
    query products{
        products {
            id
            name
            uom
            sizes
            varieties {
                name
            }
        }
    }`;

export const VARIETIES_QUERY = `
    query varieties {
        varieties {
            _id
            product
            variety
            colors
            tags
        }
    }
`

export const STANDING_ORDERS_QUERY = `
    query standingOrders {
        standingOrders {
            _id
            venSH
            shipSH
            fstartDate
            fendDate
            shippingDay
            itemCount
        }
    }`;

export const STANDING_ORDER_QUERY = `
    query standingOrder($id: String!) {
        standingOrder(id: $id) {
            _id
            venSH
            shipSH
            fstartDate
            fendDate
            shippingDay
            items {
                _id
                product
                variety
                size
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
                daysToArrive
            }
        }
    }`;

export const EVENTS_QUERY = `
    query events {
        events {
            _id
            title
            customer
            store
            fdate
            itemCount
        }
    }`;

export const EVENT_QUERY = `
    query event($id: String!) {
        event(id: $id) {
            _id
            title
            customer
            fdate
            store
            items {
                _id
                product
                variety
                size
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