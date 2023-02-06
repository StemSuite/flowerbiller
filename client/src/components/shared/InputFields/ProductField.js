function ProductField({products, inputProd, setProduct, setUOM}) {

  function changeProduct(event) {
    let product = products.find(prd => prd.name === event.target.value);
    if (setUOM) setUOM(product.uom);
		setProduct(product || {});
	}

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
