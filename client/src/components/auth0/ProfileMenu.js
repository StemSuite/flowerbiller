import { useAuth0 } from '@auth0/auth0-react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';


function ProfileMenu({ user }) {
	const { logout } = useAuth0();

	return (
		<Menu>
			<MenuButton 
				as={Button} 
				rightIcon={<MdAccountCircle />}
				width="fit-content" 
				m="10px" p="10px" 
				boxShadow="md" 
				rounded="md" 
				bg="green.300" 
				textColor="white"
			>
				{user.nickname}
			</MenuButton>
			<MenuList>
				<MenuItem as='a' href='/profile'>Profile</MenuItem>
				<MenuItem
					onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
					Log Out
				</MenuItem>
			</MenuList>
		</Menu>
	);
}

const LoginButton = () => {
	const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

	if ( isLoading ) {
		return <div>Loading ...</div>;
	}

	if ( isAuthenticated ) {
		return (
			<ProfileMenu user={user}/>
		);
	}

	return <Button
		float="right" 
		width="fit-content" 
		m="10px" p="10px" 
		boxShadow="md" 
		rounded="md" 
		bg="green.300" 
		textColor="white"
		onClick={() => loginWithRedirect()}>
            Log In
	</Button>;
};

export default LoginButton;