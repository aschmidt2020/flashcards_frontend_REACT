import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const jwt = localStorage.getItem("token");

export const userApiSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/flashcard/",
        prepareHeaders(headers) {
            headers.set("Authorization" , `Bearer ${jwt}`);
            return headers
        },
    }),
    endpoints: builder => ({
        getUserInfo: builder.mutation({
            query: (userId) => ({
                url: `user/${userId}/`,
                method: 'GET',
            })
        }),
    })
});

export const { useGetUserInfoMutation } = userApiSlice; 