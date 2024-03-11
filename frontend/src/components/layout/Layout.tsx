'use client';
import { store } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';

type Props = {
	children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default Layout;
