// components/auth/LoginForm.js
'use client';

import { useRef } from 'react';
import { signIn } from 'next-auth/react';
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

function LoginForm() {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const router = useRouter();
	const toast = useToast();

	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		const result = await signIn('credentials', {
			redirect: false,
			email: enteredEmail,
			password: enteredPassword,
		});
		if (!result.error) {
			toast({
				title: 'Login successful.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			router.push('/home');
		} else {
			toast({
				title: 'Login failed.',
				description: result.error,
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
			<Heading mb={6}>Login</Heading>
			<form onSubmit={submitHandler}>
				<VStack spacing={4}>
					<FormControl id="email" isRequired>
						<FormLabel>Your Email</FormLabel>
						<Input type="email" ref={emailInputRef} />
					</FormControl>
					<FormControl id="password" isRequired>
						<FormLabel>Your Password</FormLabel>
						<Input type="password" ref={passwordInputRef} />
					</FormControl>
					<Button type="submit" colorScheme="teal" width="full">
						Login
					</Button>
					<Link href="/sign-up">
						Don&apos;t have an account?{' '}
						<span style={{ textDecoration: 'underline' }}>Sign up here</span>
					</Link>
				</VStack>
			</form>
		</Box>
	);
}

export default LoginForm;
