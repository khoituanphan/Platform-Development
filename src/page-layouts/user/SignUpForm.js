// components/auth/SignUpForm.js
'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Heading,
	VStack,
	useToast,
} from '@chakra-ui/react';
import Link from 'next/link';

async function createUser(email, password, username, name) {
	try {
		const res = await fetch('/api/auth/sign-up', {
			method: 'POST',
			body: JSON.stringify({ email, password, username, name }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log('received response from api route:', res);
	} catch (error) {
		console.log(error);
	}
}

const SignUpForm = () => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const usernameInputRef = useRef();
	const nameInputRef = useRef();
	const router = useRouter();
	const toast = useToast();

	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const enteredUsername = usernameInputRef.current.value;
		const enteredName = nameInputRef.current.value;

		try {
			await createUser(
				enteredEmail,
				enteredPassword,
				enteredUsername,
				enteredName
			);
			toast({
				title: 'Account created.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			router.push('/home');
		} catch (error) {
			toast({
				title: 'Account creation failed.',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	}

	return (
		<Box
			maxW="md"
			mx="auto"
			mt={8}
			p={6}
			borderWidth={1}
			borderRadius="lg"
			boxShadow="lg"
		>
			<Heading mb={6}>Sign Up</Heading>
			<form onSubmit={submitHandler}>
				<VStack spacing={4}>
					<FormControl id="email" isRequired>
						<FormLabel>Email</FormLabel>
						<Input type="email" ref={emailInputRef} />
					</FormControl>
					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
						<Input type="password" ref={passwordInputRef} />
					</FormControl>
					<FormControl id="username" isRequired>
						<FormLabel>Username</FormLabel>
						<Input type="text" ref={usernameInputRef} />
					</FormControl>
					<FormControl id="name" isRequired>
						<FormLabel>Name</FormLabel>
						<Input type="text" ref={nameInputRef} />
					</FormControl>
					<Button type="submit" colorScheme="teal" width="full">
						Create Account
					</Button>
					<Link href="/login">
						Already have an account?{' '}
						<span style={{ textDecoration: 'underline' }}>Login</span>
					</Link>
				</VStack>
			</form>
		</Box>
	);
};

export default SignUpForm;
