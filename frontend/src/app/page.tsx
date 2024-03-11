'use client';
import { useAppSelector } from '@/hooks/useAuth';
import { useGetAllRoutinesQuery } from '@/store/service/main.api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
	const login = useAppSelector((state) => state.auth.loggedIn);
	const router = useRouter();

	const { data, isLoading, isError, isSuccess } = useGetAllRoutinesQuery({});
	if (!login) {
		router.push('/login');
	} else {
		return <div> </div>;
	}
}
