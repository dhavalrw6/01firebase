import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { createBook } from "./features/books/bookSlice";

function App() {

  const [book,setBook] = useState({});
  const dispatch = useDispatch();

  let handleSubmit=(e)=>{
    e.preventDefault();
    console.log(book);    
    dispatch(createBook(book));
    setBook({});
  }

  return (
    <>
      <div className="container">
        <div className="mx-auto col-sm-6 text-start">
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Book Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={book.title || ''}
              onChange={(e)=> setBook({...book,[e.target.name]:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={book.price || ''}
              onChange={(e)=> setBook({...book,[e.target.name]:e.target.value})}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        </div>
      </div>
    </>
  );
}

export default App;
