import { useCreateRoutineMutation } from '@/store/service/main.api';
import React, { useEffect, useState } from 'react';
import { BiCross } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';

const CreateARoutineModal: React.FC = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [trigger, result] = useCreateRoutineMutation();

	const handleSubmit = (e: any) => {
		// Handle form submission logic here
		e.preventDefault();
		trigger({
			name: title,
			description,
		});
	};
	useEffect(() => {
		if (result.isSuccess) {
			handleClose();
			result.reset();
		}
	}, [result]);
	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			{isOpen ? (
				<div className='fixed inset-0 flex items-center justify-center z-50'>
					<div className='fixed inset-0 bg-black opacity-50'></div>
					<div className='bg-white rounded-lg p-8 w-80 relative'>
						<button className='absolute top-2 right-2' onClick={handleClose}>
							<RxCross1 size={24} color={'#ff0000'} />
						</button>
						<h2 className='text-xl font-bold mb-4'>Create Your Routine</h2>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label htmlFor='title' className='block mb-2'>
									Title
								</label>
								<input
									type='text'
									id='title'
									className='w-full border border-gray-300 rounded px-3 py-2'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div className='mb-4'>
								<label htmlFor='description' className='block mb-2'>
									Description
								</label>
								<input
									type='text'
									id='description'
									className='w-full border border-gray-300 rounded px-3 py-2'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className='flex justify-end'>
								<button
									type='submit'
									className='bg-blue-300 text-white px-4 py-2 rounded'
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<button
					className='bg-blue-300 text-white px-4 py-2 rounded'
					onClick={() => setIsOpen(true)}
				>
					Generate Your Routine
				</button>
			)}
		</>
	);
};

export default CreateARoutineModal;
