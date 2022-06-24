import { configureStore} from'@reduxjs/toolkit'
import expenses from './expenses'
export const store=configureStore({
    reducer:{
        expenses
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})