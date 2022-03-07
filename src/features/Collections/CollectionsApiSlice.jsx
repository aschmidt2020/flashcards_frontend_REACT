import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const API_KEY = can put api key here if needed, see headers below for how to use in api call

export const collectionApiSlice = createApi({
    reducerPath: "collectionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/flashcard/",
        // prepareHeaders(headers) {
        //     headers.set("x-api-key", API_KEY); //check what dictionary key-value pair is needed
        //     headers.set("Bearer ", token); //use this for JWT tokens
        //     return headers
        // },
    }),
    endpoints(builder) {
        return {
            fetchCollections: builder.query({
                query() { //parameters inside query()
                    return `allcollections/`;
                },
            }),
            //additional endpoints here
        };
    },
});

export const { useFetchCollectionsQuery } = collectionApiSlice;