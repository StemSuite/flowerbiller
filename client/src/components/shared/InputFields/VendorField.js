function VendorField(props) {
  let input = props.inputVen
  let vendors = ['ESP', 'KEN']
  return (
    <div>
      <select ref={input} name="inputVen" id="inputVen" >
        <option hidden> </option>
        {vendors.map((e, key) => {
          return <option key={key}>{e}</option>;
        })}
      </select>
    </div>
  )
}

export default VendorField
