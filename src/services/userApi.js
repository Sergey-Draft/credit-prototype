import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/baseQuery';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: '/',
    }),
    tagTypes: ['UserRequests', 'UserResponses'],

    endpoints: (builder) => ({
        getActiveUserRequests: builder.query({
            query: () => ({
                url: 'users/request',
                method: 'GET',
                params: { status: 'LAST' },
            }),
            providesTags: ['UserRequests'],
        }),

        getAllUserRequests: builder.query({
            query: () => ({
                url: 'users/request',
                method: 'GET',
            }),
            providesTags: ['UserRequests'],
        }),

        getRequestResponse: builder.query({
            query: (requestId) => ({
                url: '/users/response',
                params: { responseId: requestId },
            }),
            providesTags: (result, error, requestId) => [
                { type: 'UserResponses', id: requestId },
            ],
        }),
        selectLoan: builder.mutation({
            query: (body) => ({
                url: '/users/response/select',
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['UserRequests'],
        }),
        signLoan: builder.mutation({
            query: (body) => ({
                url: '/users/response/sign',
                method: 'POST',
                data: body,
            }),
            invalidatesTags: (result, error, body) => [
                { type: 'UserRequests' },
                { type: 'UserResponses', id: body.requestId },
            ],
        }),

        rejectLoan: builder.mutation({
            query: (requestId) => ({
                url: '/users/response/reject',
                method: 'POST',
                params: { requestId }
            }),
            invalidatesTags: ['UserRequests'],
        }),


        createLoanRequest: builder.mutation({
            query: (body) => ({
                url: 'users/request',
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['UserRequests'],
        }),
    }),
});

export const {
    useGetActiveUserRequestsQuery,
    useGetAllUserRequestsQuery,
    useCreateLoanRequestMutation,
    useSelectLoanMutation,
    useGetRequestResponseQuery,
    useRejectLoanMutation,
    useSignLoanMutation
} = userApi;