export const ADD_SO_ITEM = `
    mutation addSOItem($orderID: String! $item: AddIncomingItemInput!) {
        addSOItem(standingOrderId: $orderID, item: $item) {
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
    mutation addPreBookItem($orderID: String! $item: AddIncomingItemInput!) {
        addPreBookItem(preBookId: $orderID, item: $item) {
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

export const ADD_BILL_MUTATION = `
    mutation addBill($newBill: AddBillInput!) {
        addBill(newBill: $newBill) {
            _id
        }
    }`;

export const UPDATE_SALE_QTY_MUATION = `
    mutation updateSaleQty($sale: EditSaleQtyInput!) {
        updateSaleQty(sale: $sale) {
            _id
        }
    }`;

export const ADD_VENDOR_MUTATION = `
    mutation addVendor($vendor: AddVendorInput!) {
        addVendor(vendor: $vendor) {
            id
        }
    }`;

export const ADD_VENDOR_SHIPPING_METHOD_MUTATION = `
    mutation addVendorShippingMethod($id: String!, $shippingMethod: EditShippingMethodInput!) {
        addVendorShippingMethod(id: $id, shippingMethod: $shippingMethod) {
            id
        }
    }`;

export const REMOVE_VENDOR_SHIPPING_METHOD_MUTATION = `
    mutation removeVendorShippingMethod($id: String!, $shippingMethod: EditShippingMethodInput!) {
        removeVendorShippingMethod(id: $id, shippingMethod: $shippingMethod) {
            id
        }
    }`;

export const ADD_BOX_MUTATION = `
    mutation addBox($box: AddBoxInput!) {
        addBox(box: $box) {
            _id
        }
    }`;

export const ADD_VENDOR_BOX_MUTATION =`
    mutation addVendorBox($id: String!, $box: AddBoxInput!) {
        addVendorBox(id: $id, box: $box) {
            id
        }
    }`;

export const REMOVE_VENDOR_BOX_MUTATION =`
    mutation removeVendorBox($id: String!, $boxType: String!) {
        removeVendorBox(id: $id, boxType: $boxType) {
            id
        }
    }`;

export const UPDATE_VENDOR_BOX_CBF = `
    mutation updateVendorBoxCBF($id: String!, $box: EditBoxInput!) {
        updateVendorBoxCBF(id: $id, box: $box) {
            id
        }
    }`;

export const UPDATE_SHIPMENT_SURCHARGE = `
    mutation updateShipmentSurcharge($id: String!, $totalSurcharge: Float!) {
        updateShipmentSurcharge(id: $id, totalSurcharge: $totalSurcharge) {
            id
        }
    }`;