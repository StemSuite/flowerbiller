function DaysToExpField(props) {
    let label = props.label
    let defaultDays = props.defaultDays || null
  
    return (
      <div id="dep-field">
        <label htmlFor="expField">{label}</label>
        <input name="expField" id="exp-input" defaultValue={defaultDays} type="number"/>
      </div>
    )
  }
  
  export default DaysToExpField;