import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import Landing from "./components/Landing.js";
import StandingOrder from "./components/StandingOrder.js";
import StandingOrders from "./components/StandingOrders.js";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/standing_orders" element={<StandingOrders />} />
        <Route path="/standing_order/:id" element={<StandingOrder />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;