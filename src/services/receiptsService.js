import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/database'

export const receiptApi = createApi({
    reducerPath: "receiptApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: (...receipt) => ({
                url: 'receipts.json',
                method: 'POST',
                body: receipt
            })
        })
    }),

})


export const {usePostReceiptMutation} = receiptApi