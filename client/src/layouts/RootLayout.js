import { Outlet } from 'react-router-dom';
import SimpleSidebar from '../components/Sidebar';
import { Box, Flex, Grid, GridItem, Spacer } from '@chakra-ui/react';
import AccountButton from '../components/buttons/AccountButton';

export default function SidebarLayout() {
	return (
		<Grid
			templateColumns='repeat(6, 1fr)'
		>
			<GridItem 
				as="aside"
				position={'relative'}
				colSpan={{ base: 6, md: 1 }}
				width={{ base: '100%', md: 'auto' }}
				bg="green.400" 
				minHeight={{ md: '100vh' }}
				p="25px">
				<SimpleSidebar />
			</GridItem>
			<GridItem as="main" colSpan={{ base: 6, md: 5 }} p="2px" >
				<Box>
					<Flex>
						<span></span>
						<Spacer />
						<AccountButton/>
					</Flex>
					<Outlet/>
				</Box>
			</GridItem>
		</Grid>
	);}