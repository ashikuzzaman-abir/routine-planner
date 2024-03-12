import { useAppDispatch } from '@/hooks/useAuth';
import { logout } from '@/store/slices/auth.slice';
import React from 'react';

const NavBar = () => {
	const dispatch = useAppDispatch();
	const handleLogOut = (e: any) => {
		dispatch(logout());
	};
	return (
		<div className=' w-full flex flex-1 justify-between items-center px-4 py-2 bg-blue-50 h-[60px]'>
			<p className='text-2xl font-bold '>Routine Planner</p>
			<button
				className='text-lg rounded-lg bg-blue-500 px-4 py-2 text-white'
				onClick={handleLogOut}
			>
				Log out
			</button>
		</div>
	);
};

export default NavBar;
