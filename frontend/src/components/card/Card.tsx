import React from 'react';

type Objectives = {
	content: string;
};

interface CardProps {
	title: string;
	description: string;
	duration: string;
	objectives: Objectives[];
}

const Card: React.FC<CardProps> = ({
	title,
	description,
	duration,
	objectives,
}) => {
	return (
		<div className='bg-blue-100 rounded-lg shadow-lg p-6'>
			<h1 className='text-3xl font-bold mb-4'>{title}</h1>
			<p className='text-sm text-gray-500 mb-2'>{description}</p>
			<p className='text-sm text-gray-500 mb-2'>Duration: {duration}Hour</p>
			<ul className='list-disc pl-6'>
				{objectives.map((objective, index) => (
					<li key={index}>{objective.content}</li>
				))}
			</ul>
		</div>
	);
};

export default Card;
