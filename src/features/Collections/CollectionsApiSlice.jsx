import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const jwt = localStorage.getItem("token");

export const collectionApiSlice = createApi({
    reducerPath: "collectionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/flashcard/",
        prepareHeaders(headers) {
            headers.set("Authorization", `Bearer ${jwt}`); //use this for JWT tokens
            return headers
        },
    }),
    
    endpoints: builder => ({
        fetchCollections: builder.query({
            query: () => ({
                url: 'allcollections/',
                method: 'GET',
            })
        }),
        addCollection: builder.mutation({
            query: newCollectionInfo => ({
                url: 'addcollection/',
                method: 'POST',
                body: newCollectionInfo
            })
        })

    })
});

export const { useFetchCollectionsQuery, useAddCollectionMutation } = collectionApiSlice;