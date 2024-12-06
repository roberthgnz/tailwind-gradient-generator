import type { Gradient, GradientStop } from '@/types'

import { createSlice } from '@reduxjs/toolkit'

const mainState = {
    gradient: {
        start: { color: 'cyan', shade: '500', position: '', active: true },
        middle: { color: 'blue', shade: '500', position: '', active: true },
        end: { color: 'blue', shade: '', position: '', active: false },
    } as Gradient,
}

export const mainSlice = createSlice({
    name: 'main',
    initialState: mainState,
    reducers: {
        updateGradient: (
            state,
            action: {
                payload: GradientStop
            },
        ) => {
            state.gradient = action.payload as any
        },
        updateGradientBy: (
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

export const { updateGradient, updateGradientBy, toggleGradient } = mainSlice.actions

export default mainSlice.reducer

export const selectIsGradientActive = (state) => {
    return (stop: GradientStop) => state.main.gradient[stop].active
}
