import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { createBook, deleteBook, editBook, fetchBook } from "./features/books/bookSlice";

function App() {

  const [book,setBook] = useState({});
  const dispatch = useDispatch();
  const {books} = useSelector(state=> state.books);
  const [editIndex,setEditIndex] = useState('');
  useEffect(()=>{
    dispatch(fetchBook());
  },[dispatch])

  let handleSubmit=(e)=>{
    e.preventDefault();
       
    if(editIndex == '')
    {
      dispatch(createBook(book));
    }
    else
    {
      dispatch(editBook(book));
      setEditIndex('');
    }
    setBook({});
  }

  let handleEdit=(book)=>{
    setBook(book)
    setEditIndex(book.id);
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
      
      <div className="row m-3 justify-content-center">
      {
        books.map((book)=>{
          return(
            <div className="col-md-4 col-lg-3 m-2" key={book.id}>
              <div className="card" style={{ width: "18rem" }} >
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button 
                className="btn btn-primary"
                onClick={()=> dispatch(deleteBook(book.id))}
              >
                Delete
              </button>
              <button 
                className="btn btn-primary"
                onClick={()=> handleEdit(book)}
              >
                Edit
              </button>
            </div>
          </div>
            </div>
          )
        })
      }
      </div>
      </div>
    </>
  );
}

export default App;
