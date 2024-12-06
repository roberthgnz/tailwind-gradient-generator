import type { GradientStop } from '@/types'

import { createSlice } from '@reduxjs/toolkit'

const mainState = {
    gradient: {
        start: { color: 'green', shade: '400', position: '0%', active: true },
        middle: { color: 'cyan', shade: '900', position: '50%', active: true },
        end: { color: 'blue', shade: '500', position: '100%', active: true },
    },
}

export const mainSlice = createSlice({
    name: 'main',
    initialState: mainState,
    reducers: {
        updateGradient: (
            state,
            action: {
                payload: {
                    stop: GradientStop
                    property: 'color' | 'shade' | 'position'
                    value: string
                }
            },
        ) => {
            const { stop, property, value } = action.payload
            state.gradient[stop][property] = value
        },
        toggleGradient: (
            state,
            action: {
                payload: {
                    stop: GradientStop
                }
            },
        ) => {
            const { stop } = action.payload
            state.gradient[stop].active = !state.gradient[stop].active
        },
    },
})

export const { updateGradient, toggleGradient } = mainSlice.actions

export default mainSlice.reducer

export const selectIsGradientActive = (state) => {
    return (stop: GradientStop) => state.main.gradient[stop].active
}
