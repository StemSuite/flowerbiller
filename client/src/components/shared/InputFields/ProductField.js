function ProductField(props) {
  let inputProd = props.inputProd
  let products = props.products;
  let changeProduct = props.changeProduct;
  let selectedProduct = props.selectedProduct;

  return (
    <div>
      <select ref = {inputProd} name="inputProd" id="inputProd" value={selectedProduct.name || ''} onChange={changeProduct}>
        <option hidden> </option>
        {products.map((e, key) => {
          return <option key={key}>{e.name}</option>;
        })}
      </select>
    </div>
  )
}

export default ProductField;
