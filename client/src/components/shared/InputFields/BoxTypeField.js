function BoxTypeField(props) {
  let boxes = ['QB', 'HB']
  
  return (
    <div>
      <label htmlFor="boxField">Box Type</label>
      <select name="boxField" id="boxField" >
        <option hidden> </option>
        {boxes.map((box, i) => {
          return <option value={box} key={i}>{box}</option>;
        })}
      </select>
    </div>
  )
}

export default BoxTypeField;
