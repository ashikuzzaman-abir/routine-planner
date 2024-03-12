import React from 'react';

type ButtonProps = {
	children: string | React.ReactNode;
	onClick?: () => void;
	className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<button
			className={`bg-blue-500 hover:bg-blue-700 children-white font-bold py-2 px-4 rounded ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
