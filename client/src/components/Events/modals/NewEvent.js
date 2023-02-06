import { useState } from 'react';
import { useMutation } from 'urql';
import { ADD_EVENT } from '../../../lib/Mutations';
import StoreField from '../../shared/InputFields/StoreField';
import FormModal from '../../shared/modals/FormModal';

function NewEventForm(closeModal) {

  const [store, setStore] = useState({})

  const [ , addEvent] = useMutation(ADD_EVENT)
  //   const [deliveryRequired, setDelivery] = useState('')


  // eventualy want to add functionality to put in delivery and pick up info
  //   function handleDeliveryChange(event) {
  //     setDelivery(!deliveryRequired)
  //   }

  //   function LocationInput() {
  //     if (deliveryRequired === true) {
  //         return (
  //             <div>
  //               <label htmlFor="event-location" className="event-location">Location</label>
  //               <input type="text" id="event-location" name="event-location" className="event-location"></input>
  //             </div>
  //         )
  //     }
  //   }

  function handleSubmit(event) {
    event.preventDefault()

    let newEvent = {
        store: store.name,
        title: event.target.newEventTitle.value,
        customer: event.target.newEventCustomer.value,
        date: event.target.newEventDate.value
    }

    addEvent({event: newEvent})
    closeModal();
  }

  return (
    <form className="newEvent" onSubmit={handleSubmit}>
        <StoreField name="newEventStore" htmlID="new-event-store" setStore={setStore}/>
        <div>
          <label htmlFor="newEventTitle" className="event-title">Event Title</label>
          <input type="text" id="event-title" name="newEventTitle" className="event-title"></input>
        </div>
        <div>
          <label htmlFor="newEventCustomer" className="event-customer">Customer Name</label>
          <input type="text" id="event-customer" name="newEventCustomer" className="event-customer"></input>
        </div>
        <div>
          <label htmlFor="newEventDate" className="event-date">Date</label>
          <input type="date" id="event-date" name="newEventDate" className="event-date"></input>
        </div>
        {/* <div>
          <label htmlFor="delivery-option" className="delivery-option">Delivery Required</label>
          <input type="checkbox" id="event-name" name="event-name" 
            className="event-name" onChange={handleDeliveryChange}>
        </input>
        </div> */}
        {/* <LocationInput/> */}
        <input id="submit" type="submit" value="Create" />
    </form>
  )
}

function NewEventModal() {
  return (
    <FormModal title={"New Event"} form={NewEventForm}/>
  );
};

export default NewEventModal;