function ProductField(props) {
  let inputProd = props.inputProd
  let products = props.products;
  let changeProduct = props.changeProduct;

  return (
    <div>
      <label htmlFor="prodField">Product</label>
      <select ref={inputProd} name="prodField" id="prodField" onChange={changeProduct}>
        <option hidden> </option>
        {products.map(prod => {
          return <option value={prod.name} key={prod.id}>{prod.name}</option>;
        })}
      </select>
    </div>
  )
}

export default ProductField;
