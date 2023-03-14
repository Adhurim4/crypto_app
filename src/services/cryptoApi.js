import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '473f0d2c00msh5a26effacbe6ae9p11383djsnb02aedd3cf95',
    }

const baseUrl = 'https://coinranking1.p.rapidapi.com'
 

const  createRequest= (url) => ({url, headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
          })
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery,  useGetCryptoHistoryQuery,  useGetExchangesQuery} = cryptoApi;