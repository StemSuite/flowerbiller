function QuantityField(props) {
  let input = props.input
  return (
    <div>
      <input ref={input} placeholder="0" id="qty" name="qty" type="number"/>
    </div>
  )
}

export default QuantityField;
