// components/auth/auth-form.js
'use client';

import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';  // adjusted the import path for useRouter
import classes from '../../styles/auth-form.module.css';

async function createUser(username, email, password) {
	try {
		const res = await fetch('/api/auth/sign-up', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log('received response from api route:', res);
	} catch (error) {
		console.log(error);
	}
}

function AuthForm() {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const usernameInputRef = useRef();  // 1. Add a ref for the username input

	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();

	function switchAuthModeHandler() {
		setIsLogin(!isLogin);
	}

	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});
			console.log(result);
			if (!result.error) {
				router.push('/upload');
			}
		} else {
			const enteredUsername = usernameInputRef.current.value; // Extract the entered username
			try {
				await createUser(enteredUsername, enteredEmail, enteredPassword);
				router.push('/upload');
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				{!isLogin && (  // 2. Conditionally render the username input
					<div className={classes.control}>
						<label htmlFor="username">Your Username</label>
						<input type="text" id="username" required ref={usernameInputRef} />
					</div>
				)}
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;
