import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tags: any[] = ['routine'];
export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,

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
			invalidatesTags: ['routine'],
		}),
		getAllRoutines: builder.query({
			query: () => `/routine`,
			providesTags: ['routine'],
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
