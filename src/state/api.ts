import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api (section of the store of the redux store)
export const api = createApi({ 

    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
        postAiText: build.mutation({
            query: (payload) => ({
                url: "openai/text",
                method: "POST",
                body: payload
            }),
        }),
    }),
});

export const {
    usePostAiTextMutation
} = api;