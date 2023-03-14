import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '473f0d2c00msh5a26effacbe6ae9p11383djsnb02aedd3cf95',
    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
  }

const baseUrl= 'https://crypto-news16.p.rapidapi.com/news/top';

const  createRequest= (url) => ({url, headers:cryptoNewsHeaders});


export const cryptoNewsApi = createApi({
    reducerPath:'crytpoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        getCryptoNews: builder.query({
            query: (count) => createRequest(`/${count}`),
        }),
    }),
});

export const {useGetCryptoNewsQuery} = cryptoNewsApi;