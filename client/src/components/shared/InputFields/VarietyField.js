function VarietyField({product}) {
  
    let varieties = product.varieties || []
 
    return (
    <div>
        <label htmlFor="varietyField">Variety</label>
        <select name="varietyField" id="variety-field">
        <option hidden> </option>
        {varieties.map((variety, i) => {
            return <option key={i}>{variety.name}</option>;
        })}
        </select>
    </div>
    )
}

export default VarietyField;
