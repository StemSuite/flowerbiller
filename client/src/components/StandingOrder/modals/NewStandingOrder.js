import React, { useState, useEffect } from 'react';
import FormModal from '../../shared/modals/FormModal';
import { useMutation, useQuery } from 'urql';
import DaysOfWeek from '../../shared/InputFields/DaysOfWeek';
import VendorField from '../../shared/InputFields/VendorField';
import ShippingMethodField from '../../shared/InputFields/ShippingMethodField';
import { ADD_STANDING_ORDER } from '../../../lib/Mutations';
import { VENDORS_QUERY } from '../../../lib/Queries';

function NewSOForm(closeModal) {

  const [ , addSO] = useMutation(ADD_STANDING_ORDER)

  const [selectedVen, setVen] = useState('');
  const [selectedShippingMethod, setShippingMethod] = useState('');
  const [shippingMethodOptions, setShippingMethodOptions] = useState([]);
  const [selectedShippingDay, setShippingDay] = useState('');
  const [shippingDayOptions, setShippingDayOptions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [fetchedVendors] = useQuery({
    query: VENDORS_QUERY
  });

  const { data, fetching, error } = fetchedVendors;

  useEffect(() => {
    if (data === undefined) return 
  }, [data])

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  function handleStartDateChange(event) {
    setStartDate(event.target.value)
  }

  function handleEndDateChange(event) {
      setEndDate(event.target.value)
  }

  function changeVen(event) {
    let vendorID = event.target.value
    let shippingMethodOptions = data.vendors.find(ven => ven.id === vendorID).shippingMethods
    setVen(vendorID)
    setShippingMethodOptions(shippingMethodOptions)
  }

  function changeShippingOptions(event) {
    let methodID = event.target.value
    let shippingDays = shippingMethodOptions.find(method => method.id === methodID).shippingDays
    setShippingMethod(methodID)
    setShippingDayOptions(shippingDays)
  }

  function changeShippingDay(event) {
    setShippingDay(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    let newStandingOrder = {
        vendor: selectedVen,
        startDate: startDate,
        endDate: endDate,
        shippingMethod: selectedShippingMethod,
        shippingDay: Number(selectedShippingDay)
  }

  addSO({standingOrder: newStandingOrder});
    closeModal();
  }

  return (
    <form className="newStandingOrder" onSubmit={handleSubmit}>
      <VendorField vendors={data.vendors} selectedVen={selectedVen} onChange={changeVen}/>
      <ShippingMethodField options={shippingMethodOptions} selectedMethod={selectedShippingMethod} onChange={changeShippingOptions}/>
      <div>
        <label htmlFor="startdate" className="date">Start Date</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} 
                id="startdate" name="startdate" className="date"></input>
      </div>
      <div>
        <label htmlFor="enddate">End Date</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} 
            id="enddate" name="enddate" className="date"></input>
      </div>
      <DaysOfWeek selectedDay={selectedShippingDay} onChange={changeShippingDay} options={shippingDayOptions} label={"Shipping Day"}/>
      <input id="submit" type="submit" value="Create" />
    </form>
  )
}

function NewSOModal() {
  return (
    <FormModal title={"New Standing Order"} form={NewSOForm}/>
  );
};

export default NewSOModal;