export const ADD_SO_ITEM = `
    mutation addSOItem($standingOrderId: String! $item: StandingOrderItemInput!) {
        addSOItem(standingOrderId: $standingOrderId, item: $item) {
            _id
        }
    }`;

export const DELETE_SO_ITEM = `
    mutation deleteSOItem($standingOrderId: String!, $itemId: String!) {
        deleteSOItem(standingOrderId: $standingOrderId, itemId: $itemId) {
            _id
        }
    }`;

export const ADD_STANDING_ORDER = `
    mutation addStandingOrder($standingOrder: AddStandingOrderInput!) {
        addStandingOrder(standingOrder: $standingOrder) {
            _id
        }
    }`;

export const ADD_EVENT =`
    mutation addEvent($event: AddEventInput!) {
        addEvent(event: $event) {
            _id
        }
    }`;

export const ADD_EVENT_ITEM=`
    mutation addEventItem($eventID: String!, $item: EventItemInput!) {
        addEventItem(eventID: $eventID, item: $item) {
            items {
                _id
            }
        }
    }`;

export const DELETE_EVENT_ITEM=`
    mutation deleteEventItem($eventID: String!, $itemID: String!) {
        deleteEventItem(eventID: $eventID, itemID: $itemID) {
            _id
        }
    }`;

export const ADD_VARIETY_MUTATION=`
    mutation addVariety($productID: String!, $variety: AddVarietyInput!) {
        addVariety(productID: $productID, variety: $variety) {
            id
        }
    }
`

export const ADD_PRODUCT_MUTATION=`
    mutation addProduct($product: AddProductInput!) {
        addProduct(product: $product) {
            id
        }
    }
`