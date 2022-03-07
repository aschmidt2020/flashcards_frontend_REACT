import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/auth/",
        // prepareHeaders(headers) {
        //     headers.set("x-api-key", API_KEY); //check what dictionary key-value pair is needed
        //     headers.set("Bearer ", token); //use this for JWT tokens
        //     return headers
        // },
    }),
    endpoints: builder => ({
        login: builder.mutation({
            query: loginCredentials => ({
                url: 'login/',
                method: 'POST',
                body: loginCredentials
            })
        }),
        register: builder.mutation({
            query: newUserInfo => ({
                url: 'register/',
                method: 'POST',
                body: newUserInfo
            })
        })

    })
});

export const { useLoginMutation, useRegisterMutation } = authSlice; //append word use and add word Query/Mutations to end to build hook