export const PRODUCTS_QUERY =  `
    query {
        products {
            id
            name
            varieties
            lens
            uom
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
            vendor {
                shortHand
            }
            startDate
            endDate
            shippingMethod {
                shortHand
            }
            shippingDay
            items {
                _id
                prod
                len
                uom
                var
                boxCount
                boxType
                qtyPerBox
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
                prod
                len
                var
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