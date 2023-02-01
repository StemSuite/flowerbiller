function LengthField(props) {
  let validSizes = props.validSizes || [];

  return (
    <div>
      <label htmlFor="lenField">Len</label>
      <select name="lenField" id="lenField">
        <option hidden> </option>
        {validSizes.map((len, i) => {
          return <option value={len} key={i}>{len}</option>;
        })}
      </select>
    </div>
  )
}

export default LengthField
