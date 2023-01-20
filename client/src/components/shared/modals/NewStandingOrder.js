import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useMutation, useQuery } from 'urql';
import DaysOfWeek from '../InputFields/DaysOfWeek';
import VendorField from '../InputFields/VendorField';
import ShippingMethodField from '../InputFields/ShippingMethodField';
import { ADD_STANDING_ORDER } from '../../../lib/Mutations';
import { VENDORS_QUERY } from '../../../lib/Queries';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function NewStandingOrder() {

    const [ , addSO] = useMutation(ADD_STANDING_ORDER)

    const [selectedVen, setVen] = useState('');
    const [selectedShippingMethod, setShippingMethod] = useState('');
    const [shippingMethodOptions, setShippingMethodOptions] = useState([]);
    const [selectedShippingDay, setShippingDay] = useState('');
    const [shippingDayOptions, setShippingDayOptions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    function handleStartDateChange(event) {
        setStartDate(event.target.value)
    }

    function handleEndDateChange(event) {
        setEndDate(event.target.value)
    }


  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
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

  const [fetchedVendors] = useQuery({
    query: VENDORS_QUERY
  });

  const { data, fetching, error } = fetchedVendors;

  useEffect(() => {
    if (data === undefined) return 
  }, [data])

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

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

  return (
    <div>
      <button onClick={openModal}>Create New</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="New Standing Order"
      >
        <button onClick={closeModal}>close</button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Standing Order</h2>
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
      </Modal>
    </div>
  );
}

export default NewStandingOrder;