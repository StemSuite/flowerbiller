
function VendorField(props) {
  let input = props.inputVen
  let vendors = props.vendors
  let changeVen = props.onChange

  return (
    <div>
      <label htmlFor="venField">Vendor</label>
      <select ref={input} value={props.selectedVen} onChange={changeVen} name="venField" id="venField">
        <option hidden> </option>
        {vendors.map(vendor => {
          return <option value={vendor.id} key={vendor.id}>{vendor.shortHand}</option>;
        })}
      </select>
    </div>
  )
}

export default VendorField
