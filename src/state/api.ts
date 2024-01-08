import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api (section of the store of the redux store)
export const api = createApi({ 
    
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
        postAiText: build.mutation({
            query: (text) => ({
                url: "openai/text",
                method: "POST",
                body: text
            }),
        }),
        postAiCode: build.mutation({
            query: (code) => ({
                url: "openai/code",
                method: "POST",
                body: code
            }),
        }),
        postAiAssist: build.mutation({
            query: (text) => ({
                url: "openai/assist",
                method: "POST",
                body: text
            }),
        }),
    }),
});

export const {
    usePostAiTextMutation,
    usePostAiCodeMutation,
    usePostAiAssistMutation,
} = api;