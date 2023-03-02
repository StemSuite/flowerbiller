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
            daysToExp
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
`;

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
            name
            shortHand
            shippingMethods {
                id
                name
                shortHand
                shippingDays
                daysToArrive
            }
        }
    }`;

export const EVENTS_QUERY = `
    query events {
        events {
            id
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
            id
            title
            customer
            fdate
            store
        }
    }`;

export const EVENT_ITEMS_QUERY = `
    query eventItems($eventID: String!) {
        eventItems(eventID: $eventID) {
            id
            product
            variety
            size
            uom
            quantity
        }
    }
`;

export const EVENTS_ITEMS_QUERY = `
    query eventsItems {
        eventsItems {
            id
            product
            uom
            fdate
        }
    }
`;


export const STORES_QUERY = `
    query stores {
        stores {
            id
            name
        }
    }`;

export const SHIPMENTS_QUERY = `
    query shipments {
        shipments {
            id
            shipSH
            fshippingDate
            farrivalDate
            itemCount
        }
    }`;

export const SHIPMENT_QUERY = `
    query shimpent($id: String!) {
        shipment(id: $id) {
            id
            shipSH
            fshippingDate
            farrivalDate
        }
    }`;

export const SHIPMENT_ITEMS_QUERY = `
    query shipmentItems($shipmentID: String!) {
        shipmentItems(shipmentID: $shipmentID) {
            id
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
    }`;

export const PREBOOKS_QUERY = `
    query preBooks {
        preBooks {
            id
            venSH
            shipSH
            fshippingDate
            itemCount
        }
    }`;

export const PREBOOK_QUERY = `
    query preBook($id: String!) {
        preBook(id: $id) {
            id
            venSH
            shipSH
            fshippingDate
        }
    }`;

export const PREBOOK_ITEMS_QUERY = `
    query preBookItems($preBookId: String!) {
        preBookItems(preBookId: $preBookId) {
            id
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
    }`;