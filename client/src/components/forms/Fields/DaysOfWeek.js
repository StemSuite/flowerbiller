import { daysOfTheWeek } from "../../../lib/data";

function DaysOfWeek(props) {
    
    return (
      <div>
        <label htmlFor="daysOfWeek">{props.label}</label>
        <select value={props.selectedDay} onChange={props.onChange} name="daysOfWeek" id="daysOfWeek">
          <option hidden> </option>
          {props.options.map(key => {
            return <option key={key} value={key}>{daysOfTheWeek[key]}</option>;
          })}
        </select>
      </div>
  )
  }
  
  export default DaysOfWeek;