
import { apiSlice } from './apiSlice.js';
import { LISTS_URL } from '../constants.js';

export const listApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query({
            query: () => ({
                url: `${LISTS_URL}/`,
            })
        }),
        getTasks: builder.query({
            query: () => ({
                url: `${LISTS_URL}/task`,
            }),
            keepUnusedDataFor: 5,
        }),
    })
})

export const { useGetListsQuery, useGetTasksQuery } = listApiSlice;