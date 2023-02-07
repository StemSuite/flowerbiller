function VarietyField({product}) {
  
    let varieties = product.varieties || []

    if (varieties.length > 1) varieties = varieties.sort((a, b) => a.name.localeCompare(b.name))
 
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
