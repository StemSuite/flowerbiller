
function sortByProduct(prods) {
    return prods.sort((a, b) => {
        if (a.prod !== b.prod) return a.prod.localeCompare(b.prod);
        if (a.len !== b.len) return parseInt(a.len) < parseInt(b.len);
        if (a.var !== b.var) return a.var.localeCompare(b.var);
        if (a.pricePerUnit !== b.pricePerUnit) return a.pricePerUnit - b.pricePerUnit;
        if (a.totalQty !== b.totalQty) return a.totalQty - b.totalQty;
        if (a.ven !== b.ven) return a.ven.localeCompare(b.ven);
        return 0;
    });
}

function sortByVendor(prods) {
    return prods.sort((a, b) => {
        if (a.ven !== b.ven) return a.ven.localeCompare(b.ven);
        if (a.prod !== b.prod) return a.prod.localeCompare(b.prod);
        if (a.len !== b.len) return parseInt(a.len) < parseInt(b.len);
        if (a.var !== b.var) return a.var.localeCompare(b.var);
        if (a.pricePerUnit !== b.pricePerUnit) return a.pricePerUnit - b.pricePerUnit;
        if (a.totalQty !== b.totalQty) return a.totalQty - b.totalQty;
        return 0;
    });
 }

const sort = {
    "Product": {label: 'Product', func: sortByProduct},
    "Vendor": {label: 'Vendor', func: sortByVendor}
}

export default sort;