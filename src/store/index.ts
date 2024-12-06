import { configureStore } from '@reduxjs/toolkit'

import mainReducer from './main-slice'

export const store = configureStore({
    reducer: {
        main: mainReducer,
    },
})
