function PriceField(props) {
  let inputPrice = props.inputPrice

  return(
    <div>
      <input ref={inputPrice} placeholder="0.00" id="price" name="price" type="number" step="0.01"/>
    </div>
  )
}

export default PriceField;
