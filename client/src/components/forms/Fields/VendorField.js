
function VendorField({input, vendors, selectedVen, changeVen}) {

  return (
    <div>
      <label htmlFor="venField">Vendor</label>
      <select ref={input} value={selectedVen.shortHand} onChange={changeVen} name="venField" id="venField">
        <option hidden> </option>
        {vendors.map(vendor => {
          return <option value={vendor.shortHand} key={vendor.id}>{vendor.shortHand}</option>;
        })}
      </select>
    </div>
  )
}

export default VendorField
