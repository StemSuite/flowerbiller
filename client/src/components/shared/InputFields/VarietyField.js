function VarietyField(props) {
  let selectedProduct = props.selectedProduct;
  let inputVariety = props.inputVariety;
  return (
    <div>
      <select ref={inputVariety}>
        <option hidden> </option>
        {selectedProduct.varieties.map((e, key) => {
          return <option key={key}>{e}</option>;
        })}
      </select>
    </div>
  )
}

export default VarietyField;
