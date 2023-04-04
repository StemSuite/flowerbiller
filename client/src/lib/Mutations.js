export const ADD_SO_ITEM = `
    mutation addSOItem($standingOrderId: String! $item: AddIncomingItemInput!) {
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
    mutation addEventItem($newSale: AddSaleInput!) {
        addEventItem(newSale: $newSale) {
            _id
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
            _id
        }
    }`;

export const ADD_PRODUCT_MUTATION=`
    mutation addProduct($product: AddProductInput!) {
        addProduct(product: $product) {
            id
        }
    }`;

export const ADD_PREBOOK_MUTATION = `
    mutation addPreBook($preBook: AddPreBookInput!) {
        addPreBook(preBook: $preBook) {
            id
        }
    }`;

export const ADD_PREBOOK_ITEM = `
    mutation addPreBookItem($preBookId: String! $item: AddIncomingItemInput!) {
        addPreBookItem(preBookId: $preBookId, item: $item) {
            id
        }
    }`;

export const UPDATE_INVENTORY_MUTATION = `
    mutation updateInventory($id: String! $qty: Int!) {
        updateInventory(id: $id, qty: $qty) {
            id
        }
    }`;

export const UPDATE_FILLEDFROM_MUTATION = `
    mutation updateFilledFrom($id: String! $newFilledFrom: String) {
        updateFilledFrom(id: $id, newFilledFrom: $newFilledFrom) {
            _id
        }
    }`;

