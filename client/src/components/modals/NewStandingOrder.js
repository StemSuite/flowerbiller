import React, { useState, useEffect } from 'react';
import FormModal from './StandardModal';
import { useMutation, useQuery } from 'urql';
import DaysOfWeek from '../forms/Fields/DaysOfWeek';
import VendorField from '../forms/Fields/VendorField';
import ShippingMethodField from '../forms/Fields/ShippingMethodField';
import { ADD_STANDING_ORDER } from '../../lib/Mutations';
import { VENDORS_QUERY } from '../../lib/Queries';

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
    let vendorSH = event.target.value
    let vendor = data.vendors.find(ven => ven.shortHand === vendorSH)
    let shippingMethodOptions = vendor.shippingMethods

    setVen(vendor)
    setShippingMethodOptions(shippingMethodOptions)
  }

  function changeShippingOptions(event) {
    let methodID = event.target.value
    let shippingMethod = shippingMethodOptions.find(method => method.id === methodID)
    let shippingDays = shippingMethod.shippingDays
    setShippingMethod(shippingMethod)
    setShippingDayOptions(shippingDays)
  }

  function changeShippingDay(event) {
    setShippingDay(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    let newStandingOrder = {
        venSH: selectedVen.shortHand,
        shipSH: selectedShippingMethod.shortHand,
        startDate: startDate,
        endDate: endDate,
        shippingDay: Number(selectedShippingDay),
        daysToArrive: selectedShippingMethod.daysToArrive,
    } 

    addSO({standingOrder: newStandingOrder});
    closeModal();
  }

  return (
    <form className="newStandingOrder" onSubmit={handleSubmit}>
      <VendorField vendors={data.vendors} selectedVen={selectedVen} changeVen={changeVen}/>
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