import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
const initialState = {
    books:[],
    loading : false,
    error : null    
}

export const createBook = createAsyncThunk('book/createBook',async(newBook,{rejectWithValue})=>{
    try {
        const res = await axios.post('/',newBook);       
        return {id: res.data.name, ...newBook}
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const fetchBook = createAsyncThunk('book/createBook',async(newBook,{rejectWithValue})=>{
    try {
        const res = await axios.post('/',newBook)
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

const bookSlice = createSlice({
    name : 'book',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBook.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchBook.rejected,(state,action)=>{
            state.loading = false
            state.error = action.
        })
        .addCase(fetchBook.fulfilled,(state,action)=>{
            state.loading = false;
            state.books = Object.keys(action.payload || {}).map((key)=>({
                id:key,
                ...action.payload[key]
            }));
        })
        .addCase(createBook.fulfilled,(state,action)=>{
            state.books.push(action.payload);
        })
    }
})

// export const {} = bookSlice.actions;
export default bookSlice.reducer;