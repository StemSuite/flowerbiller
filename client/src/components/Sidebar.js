import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	useColorModeValue,
	Drawer,
	DrawerContent,
	useDisclosure,
	Heading,
	List,
	ListItem,
	ListIcon,

} from '@chakra-ui/react';

import {
	TbHome,
	TbMenu,
	TbFlower,
	TbClipboard,
	TbTruckDelivery,
	TbSettings,
	TbCalendar,
	TbReceipt,
} from 'react-icons/tb';

import { GiBarracksTent } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const LinkItems = [
	{ name: 'Home', icon: TbHome, to: '/' },
	{ name: 'Products', icon: TbFlower, to: 'products' },
	{ name: 'Standing Orders', icon: TbClipboard, to: 'standing_orders' },
	{ name: 'Pre-Bookings', icon: TbCalendar, to: 'prebooks' },
	{ name: 'Events', icon: GiBarracksTent, to: 'events' },
	{ name: 'Shipments', icon: TbTruckDelivery, to: 'shipments' },
	{ name: 'Billing', icon: TbReceipt, to: 'billing' },
	{ name: 'Settings', icon: TbSettings, to: 'settings' },
];

export default function SimpleSidebar({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }}>
				{children}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	return (
		<Box
			w={{ base: 'full', md: 'auto' }}
			position="absolute"
			bg="green.400"
			{...rest}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Heading as="h1" color="white">Stem Suite</Heading>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			<List>
				{LinkItems.map( ( link ) => (
					<NavItem key={link.name} icon={link.icon} to={link.to} onClose={onClose}>
						{link.name}
					</NavItem>
				) )}
			</List>
		</Box>
	);
};

const NavItem = ({ icon, children, to, onClose }) => {
	return (
		<NavLink to={to} onClick={onClose}>
			<ListItem
				width="fit-content"
				color="white"
				rounded="md"
				py="5px"
				px="10px"
				fontSize="xl"
				m="5px"
				_hover={{
					bg: 'white',
					color: 'green.400',
				}}
			>
				<ListIcon 
					mr="4"
					fontSize="xl"
					_hover={{
						color: 'green.400',
					}}
					as={icon}
				/>
				{children}
			</ListItem>
		</NavLink>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			alignItems="center"
			borderBottomWidth="2px"
			borderBottomColor={useColorModeValue( 'green.400' )}
			justifyContent="flex-start"
			color="green.300"
			{...rest}>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open menu"
				bg="white"
				icon={<TbMenu />}
			/>
			<Heading as="h1" color="white" m="10px" >Stem Suite</Heading>
		</Flex>
	);
};