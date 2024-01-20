import React, { useEffect, useState } from 'react'
import BookCard from './BookCard';
import Modal from './Modal';
import BookForm from './BookForm';
import Header from './Header';
import { useFormik } from 'formik';
import axios from 'axios';

function BookList({props}) {
  const emptyBook = {
    id: null,
    title: '',
    description: '',
    pageCount: '',
    startRead: '',
    endRead: '',
    categories: [],
    authors: [],
  }
  const [book, setBook] = useState(emptyBook); 
  const [showModal, setShowModal] = useState(false);
  const formik = useFormik({
    initialValues: book,
    enableReinitialze: true,
    onSubmit: values => handleSave(values),
    validate: values => {
      const errors = {};
      ['title', 'description', 'pageCount', 'startRead'].forEach(key => {
        if (!values[key]) {
          errors[key] = 'Required';
        }
      });

      ['categories', 'authors'].forEach(key => {
        if (!values[key].length) {
          errors[key] = 'Required';
        }
      })
      return errors;
    }
  });

  const toggleModal = () => {
    formik.resetForm();
    if (showModal) {
      setBook(emptyBook);
    }
    setShowModal(!showModal);
  }

  const setBookDetails = (book) => {
    setBook({
      id: book.id,
      title: book.title,
      description: book.description,
      pageCount: book.pageCount,
      startRead: book.startRead,
      endRead: book.endRead == 'Invalid date' ? '' : book.endRead,
      categories: book.Categories.map((category) => category.id),
      authors: book.Authors.map((author) => author.id),
    });
  }

  const handleSave = (values) => {
    if(book.id) {
      axios.put(`${props.booksApiUrl}/${book.id}`, values).then((response) => {
        if (response.status === 200) {
          setBookDetails(response.data);
          props.setBooksList(props.booksList.map((b) => b.id === book.id ? response.data : b));
          toggleModal();
        }
      })
    } else {    
      axios.post(props.booksApiUrl, values).then((response) => {
        if (response.status === 201) {
          props.getBooks();
          toggleModal();
        }
      })
    }
  }  

  props = {...props,
    'book': book,
    'showModal': showModal,
    'setShowModal': setShowModal,
    'handleSave': handleSave,
    'toggleModal': toggleModal,
    'formik': formik,
  }

  // open edit modal and set form values from book
  const openEditModal = (book) => {
    setBookDetails(book);
    toggleModal();
  }

  useEffect(() => {
    if (book !== formik.values && !formik.dirty) {
      formik.setValues(book);
    }
  }, [book, formik]);

  // delete book and remove from books list
  const handleDelete = (book) => {
    axios.delete(`${props.booksApiUrl}/${book.id}`).then((response) => {
      if (response.status === 200) {
        props.setBooksList(props.booksList.filter((b) => b.id !== book.id));
      }
    })
  }

  // search books by title and filter books list
  const [filteredBooks, setFilteredBooks] = useState(props.booksList);
  const handleSearch = (value) => {
    const filteredItems = props.booksList.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(filteredItems);
  }

  useEffect(() => {
    setFilteredBooks(props.booksList);
  }, [props.booksList]);
  
  return (
    <>
      <Header openModal={toggleModal} onSearch={handleSearch}></Header>
      <div className="books-container">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} props={{
            'onEdit': openEditModal,
            'onDelete': handleDelete,
          }}/>
        ))}
        {
          filteredBooks.length === 0 &&
          <div className="empty-list text-center py-5 my-5">
            <h2>No books found.</h2>
            <h5>Click on "Add new" button to add a new book.</h5>
          </div>
        }
      </div>
      <Modal title="Add new book" show={showModal} handleClose={toggleModal}>
        <BookForm props={props}></BookForm>
      </Modal>
    </>    
  )
}

export default BookList