function SortField(props) {
    let options = props.options;
    let sortValue = props.sortValue;
    let changeSort = props.changeSort;

    return (
      <div>
        <label>Sort By:</label>
        <select value={sortValue} name="sortField" id="sortField" onChange={changeSort} >
          {options.map((field, i) => {
            return <option key={i}>{field}</option>;
          })}
        </select>
      </div>
    )
  }

  export default SortField;