import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://erp.apptrix.ru/api/',
    credentials: 'include',
    prepareHeaders:( headers) => {
        const token = localStorage.getItem('accesstoken')
        if (token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async( args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 401){
        const refreshResult = await baseQuery('/refresh/', api, extraOptions)
        if(refreshResult?.data){
            api.dispatch(setCredentials({...refreshResult.data}))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result


}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})