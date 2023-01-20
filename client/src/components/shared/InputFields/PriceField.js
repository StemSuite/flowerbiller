function PriceField(props) {
  return(
    <div>
      <label htmlFor="priceField"> $/Unit</label>
      <input name="priceField" id="priceField" placeholder="0.00" 
            type="number" step="0.01"/>
    </div>
  )
}

export default PriceField;
