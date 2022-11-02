function LengthField(props) {
  let selectedProduct = props.selectedProduct;
  let inputLength = props.inputLength;

  return (
    <div>
      <select ref={inputLength}>
        {selectedProduct.lens.map((e, key) => {
          return <option key={key}>{e}</option>;
        })}
      </select>
    </div>
  )
}

export default LengthField
