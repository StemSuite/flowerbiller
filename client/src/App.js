import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.js';
import Home from './pages/Home.js';
import StandingOrder from './pages/StandingOrder.js';
import StandingOrders from './pages/StandingOrders.js';
import Events from './pages/Events.js';
import Event from './pages/Event.js';
import Products from './pages/Products.js';
import Shipments from './pages/Shipments.js';
import Shipment from './pages/Shipment.js';
import PreBooks from './pages/PreBooks.js';
import PreBook from './pages/PreBook.js';
import Billing from './pages/Billing.js';
import Bill from './pages/Bill.js';
import Settings from './pages/Settings.js';
import Vendors from './pages/Vendors.js';
import Vendor from './pages/Vendor.js';

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
			<Route path="/shipment/:id" element={<Shipment />} />
			<Route path="/prebooks" element={<PreBooks />} />
			<Route path="/prebook/:id" element={<PreBook />} />
			<Route path="/billing" element={<Billing />} />
			<Route path="/bill/:id" element={<Bill />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/vendors" element={<Vendors />} />
			<Route path="/vendor/:id" element={<Vendor/>} />
		</Route>
	)
);

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;