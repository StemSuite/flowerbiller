import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import Landing from "./components/Landing.js";
import StandingOrder from "./components/StandingOrder/StandingOrder.js";
import StandingOrders from "./components/StandingOrder/StandingOrders.js";
import Events from "./components/Events/Events.js";
import Event from "./components/Events/Event.js";
import Products from "./components/Products/Products.js";
import Shipments from "./components/Shipments/Shipments.js";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/standing_orders" element={<StandingOrders />} />
        <Route path="/standing_order/:id" element={<StandingOrder />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shipments" element={<Shipments />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;