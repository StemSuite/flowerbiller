function LengthField(props) {
  let validLengths = props.selectedProduct.lens;

  return (
    <div>
      <label htmlFor="lenField">Len</label>
      <select name="lenField" id="lenField">
        {validLengths.map((len, i) => {
          return <option value={len} key={i}>{len}</option>;
        })}
      </select>
    </div>
  )
}

export default LengthField
