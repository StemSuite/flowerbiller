function QuantityField(props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input name={props.name} id={props.name} placeholder="0" type="number"/>
    </div>
  )
}

export default QuantityField;
