import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
const initialState = {
    books:[],
    loading : false,
    error : null    
}

export const createBook = createAsyncThunk('book/createBook',async(newBook,{rejectWithValue})=>{
    try {
        const res = await axios.post('/.json',newBook);       
        return {id: res.data.name, ...newBook}
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const fetchBook = createAsyncThunk('book/fetchBook',async(newBook,{rejectWithValue})=>{
    try {
        const res = await axios.get('/.json')
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const deleteBook = createAsyncThunk('book/deleteBook',async(id)=>{
    await axios.delete(`/${id}.json`);
    return id;
})

export const editBook = createAsyncThunk('book/editBook',async(book)=>{
    let updateBook = {
        title : book.title,
        price : book.price
    }
    await axios.put(`/${book.id}.json`,updateBook)
    return book;
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
            state.error = action
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
        .addCase(deleteBook.fulfilled,(state,action)=>{
            state.loading = false;
            state.books = state.books.filter((item)=>{
                return item.id !== action.payload;
            })
        })
        .addCase(editBook.fulfilled,(state,action)=>{
            state.books = state.books.filter((book)=>{
                if(book.id == action.payload.id)    
                {
                    book.title = action.payload.title;
                    book.price = action.payload.price;
                }
                return book;
            })
        })
    }
})

// export const {} = bookSlice.actions;
export default bookSlice.reducer;