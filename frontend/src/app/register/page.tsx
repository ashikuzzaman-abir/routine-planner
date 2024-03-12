'use client';
import { useAppDispatch } from '@/hooks/useAuth';
import { useRegisterMutation } from '@/store/service/main.api';
import { login } from '@/store/slices/auth.slice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [learningObjective, setLearningObjective] = useState('');
	const [availableStudyTime, setAvailableStudyTime] = useState<number>(2);

	const [trigger, result] = useRegisterMutation();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleSubmit = (event: any) => {
		event.preventDefault();
		trigger({
			name,
			email,
			password,
			preference: {
				learningObjective,
				availableStudyTime,
			},
		});
	};
	useEffect(() => {
		if (result?.isSuccess) {
			dispatch(login(result?.data?.token));
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
						htmlFor='name'
					>
						Name
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='name'
						type='text'
						placeholder='Enter your name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
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
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type='checkbox'
						checked={showPassword}
						onChange={() => setShowPassword(!showPassword)}
					/>
					<label>Show Password</label>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='learningObjective'
					>
						Learning Objective
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='learningObjective'
						type='text'
						placeholder='Enter your learning objective'
						value={learningObjective}
						onChange={(e) => setLearningObjective(e.target.value)}
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='availableStudyTime'
					>
						Available Study Time (in hours)
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='availableStudyTime'
						type='number'
						placeholder='Enter your available study time'
						value={availableStudyTime}
						onChange={(e) => setAvailableStudyTime(Number(e.target.value))}
						style={{ appearance: 'textfield' }}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterPage;
