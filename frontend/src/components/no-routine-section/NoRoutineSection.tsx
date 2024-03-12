import React from 'react';
import Button from '../button/Button';
import CreateARoutineModal from '../create-a-routine-modal/CreateARoutineModal';

const NoRoutineSection = () => {
	return (
		<div className='flex flex-col w-[600px] h-[200px] justify-center gap-4 items-center'>
			<p className=' font-bold text-2xl'>No Tasks Available for you!</p>
			<p className=' font-bold text-xl'>
				Generate Tasks by clicking the button below 👇🏼
			</p>
			<CreateARoutineModal />
		</div>
	);
};

export default NoRoutineSection;
