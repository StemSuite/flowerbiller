function VarietyField(props) {
  let selectedProduct = props.selectedProduct;
 
  return (
    <div>
      <label htmlFor="varietyField">Variety</label>
      <select name="varietyField" id="varietyField">
        <option hidden> </option>
        {selectedProduct.varieties.map((variety, i) => {
          return <option value={variety} key={i}>{variety}</option>;
        })}
      </select>
    </div>
  )
}

export default VarietyField;
