import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tags: any[] = [];
export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `http://localhost:5000/api/`,

		prepareHeaders: (headers, { getState }) => {
			const token: string = (getState() as any).auth?.token;
			headers.set('content-type', 'application/json');
			headers.set('accept', '*/*');
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
				return headers;
			} else {
				headers.set('authorization', `${process.env.NEXT_PUBLIC_TOKEN}`);
				return headers;
			}
		},
	}),
	tagTypes: tags,
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: `auth/login`,
				method: 'POST',
				body,
			}),
		}),
		register: builder.mutation({
			query: (body) => ({
				url: `auth/register`,
				method: 'POST',
				body,
			}),
		}),
		createRoutine: builder.mutation({
			query: (body) => ({
				url: `/routine`,
				method: 'POST',
				body,
			}),
		}),
		getAllRoutines: builder.query({
			query: () => `/routine`,
		}),
	}),
});

export const {
	useLoginMutation,
	useCreateRoutineMutation,
	useRegisterMutation,
	useGetAllRoutinesQuery,
} = mainApi;
export default mainApi;
