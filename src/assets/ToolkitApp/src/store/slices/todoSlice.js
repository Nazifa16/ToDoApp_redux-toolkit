import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = {
    todo: [],
}

export const todoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo = [...state.todo, action.payload]
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    addTodo,
} = todoSlice.actions

export default todoSlice.reducer