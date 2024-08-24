import { configureStore } from "@reduxjs/toolkit";

import customerReducer from '../src/Features/Customer/customerSlice'
import accountReducer from '../src/Features/Account/accountSlice'

const store = configureStore({
   reducer:{
    account : accountReducer,
    customer : customerReducer
   }
})

export default store