function ShippingMethodField(props) {
    let methods = props.options
    let selected = props.selectedOption
    let changeShippingMethod = props.onChange
  
    return (
      <div>
        <label htmlFor="shippingMethodField">Shipping Method</label>
        <select value={selected} onChange={changeShippingMethod} name="shippingMethodField" id="shippingMethodField">
          <option hidden> </option>
          {methods.map(method => {
            return <option value={method.id} key={method.id}>{method.shortHand}</option>;
          })}
        </select>
      </div>
    )
  }
  
  export default ShippingMethodField