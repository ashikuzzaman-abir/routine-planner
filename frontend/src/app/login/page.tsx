'use client';
import { useAppDispatch } from '@/hooks/useAuth';
import { useLoginMutation } from '@/store/service/main.api';
import { login } from '@/store/slices/auth.slice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [trigger, result] = useLoginMutation();

	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// Handle form submission here
		trigger({
			email,
			password,
		});
	};

	useEffect(() => {
		if (result.isSuccess) {
			dispatch(login(result.data.token));
			router.push('/');
		}
	}, [result]);

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
			>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'
					>
						Email
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='email'
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						Sign In
					</button>
					<a
						className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
						href='#'
					>
						Forgot Password?
					</a>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
