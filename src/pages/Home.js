import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BookList from '../components/BookList';
import axios from 'axios';

function Home() {
  const booksApiUrl = 'http://localhost:3000/api/v1/books';
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [booksList, setBooksList] = useState([]);
  
  
  function getBooks() {
    axios.get(booksApiUrl).then((response) => {
      setBooksList(response.data);
    });
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories').then((response) => {
      setCategories(response.data);      
    });
    axios.get('http://localhost:3000/api/v1/authors').then((response) => {
      setAuthors(response.data);
    });
    getBooks();
  }, []);

  
  const [filteredBooksList, setFilteredBooksList] = useState([]);
  function onSidebarFilter(data) {
    const filtered = booksList.filter((book) => {
      if (data.categories.length > 0 && data.authors.length > 0) {
        return book.Categories.some((item) => data.categories.includes(item.id)) &&
               book.Authors.some((item) => data.authors.includes(item.id));
      } else if (data.categories.length > 0) {
        return book.Categories.some((item) => data.categories.includes(item.id));
      } else if (data.authors.length > 0) {
        return book.Authors.some((item) => data.authors.includes(item.id));
      } else {
        return true;
      }
    }); 

    if (JSON.stringify(filtered) !== JSON.stringify(filteredBooksList)) {
      setFilteredBooksList(filtered);
    }
  };
  
  useEffect(() => {
    setFilteredBooksList(booksList);
  }, [booksList]);

  const props = {
    'booksApiUrl': booksApiUrl,
    'categories': categories,
    'authors': authors,
    'booksList': filteredBooksList,
    'setBooksList': setBooksList,
    'onFilter': onSidebarFilter,
    'getBooks': getBooks,
  }

  

  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <section className="py-4">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-4">
                <Sidebar props={props}/>
              </div>
              <div className="mb-6 mb-md-0 col-xl-9 col-md-8">
                <BookList props={props}/>
              </div>
            </div>
          </div>     
        </section>         
      </div>
    </>    
  )
}

export default Home;