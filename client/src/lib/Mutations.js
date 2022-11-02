export const ADD_PURCHASE =  `
    mutation($purchase: AddPurchaseInput!) {
        addStandingOrderPurch(purchase: $purchase) {   
            id
            ven
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
    }`;

export const ADD_SO_ITEM = `
    mutation addSOItem($standingOrderId: String! $item: StandingOrderItemInput!) {
        addSOItem(standingOrderId: $standingOrderId, item: $item) {
            items {
                prod
            }
        }
    }`

export const DELETE_PURCHASE = `
    mutation deletePurchase($purchId: String!) {
        deletePurchase(purchId: $purchId, standingOrderId: $standingOrderId) {
            id
        }
    }`;

export const DELETE_SO_ITEM = `
    mutation deleteSOItem($standingOrderId: String!, $itemId: String!) {
        deleteSOItem(standingOrderId: $standingOrderId, itemId: $itemId) {
            _id
        }
    }`;
