function UOMsField(props) {
    let uoms = props.UOMs
    
    return (
      <div>
        <label htmlFor="uomField">UoM</label>
        <select name="uomField" id="uom-field" >
          <option hidden> </option>
          {uoms.map((box, i) => {
            return <option value={box} key={i}>{box}</option>;
          })}
        </select>
      </div>
    )
  }
  
  export default UOMsField;