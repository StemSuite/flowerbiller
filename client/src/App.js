import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.js";
import Home from "./pages/Home.js";
import StandingOrder from "./pages/StandingOrder.js";
import StandingOrders from "./pages/StandingOrders.js";
import Events from "./pages/Events.js";
import Event from "./pages/Event.js";
import Products from "./pages/Products.js";
import Shipments from "./pages/Shipments.js";

const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/standing_orders" element={<StandingOrders />} />
      <Route path="/standing_order/:id" element={<StandingOrder />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/products" element={<Products />} />
      <Route path="/shipments" element={<Shipments />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
};

export default App;