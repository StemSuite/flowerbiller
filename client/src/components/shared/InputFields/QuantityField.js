function QuantityField(props) {
  let uom = props.uom

  function uomDisplay() {
    if (uom) return <div id="prod-uom">{uom}</div>
  }

  return (
    <div id="quantity-field">
      <label htmlFor={props.name}>{props.label}</label>
      <input name={props.name} id={props.name} placeholder="0" type="number"/>
      {uomDisplay()}
    </div>
  )
}

export default QuantityField;
