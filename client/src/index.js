import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App.js';
import { createClient, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

const client = createClient({
	url: 'http://localhost:4000/graphql'
});

root.render(
	<Provider  value={client}>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</Provider>
);
