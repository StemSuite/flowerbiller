function BoxTypeField(props) {
  let inputBoxType = props.inputBoxType;
  let boxes = ['QB', 'HB']
  return (
    <div>
      <select ref={inputBoxType}>
        <option hidden> </option>
        {boxes.map((e, key) => {
          return <option key={key}>{e}</option>;
        })}
      </select>
    </div>
  )
}

export default BoxTypeField;
