'use client';
import NavBar from '@/components/navbar/NavBar';
import NoRoutineSection from '@/components/no-routine-section/NoRoutineSection';
import RoutineViewer from '@/components/routine-viewer/RoutineViewer';
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
		return (
			<div className='max-w-[100vw] h-[calc(100vh-60px)] '>
				<NavBar />
				<div className='flex justify-center max-w-[100vw] items-center'>
					{data?.doc?.length === 0 ? (
						<NoRoutineSection />
					) : (
						<RoutineViewer data={data} />
					)}
				</div>
			</div>
		);
	}
}
