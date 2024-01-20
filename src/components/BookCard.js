import React from 'react'
import { useNavigate } from 'react-router-dom';

function BookCard({book, props}) {
  const navigate = useNavigate();

  return (
    <div className="card-bordered mb-4 card-hover cursor-pointer card">
      <div className="card-body">
        <div className="d-md-flex">
          <div className="w-100 p-2">
            <div className="d-flex flex-column mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-1 text-primary me-1 book-title">
                  {book.title}
                </h2>
                <div className="ms-2 fs-4">
                  {(book.endRead != '' && book.endRead !== 'Invalid date') ? (
                    <span className="badge bg-success">Finished</span>
                  ) : (
                    <span className="badge bg-warning">Reading</span>
                  )}
                </div>
              </div>
              
              <div className="book-author mb-2 fs-5">
                <span className="me-2 fw-bold">Author:</span>
                <span>{book.Authors.map(a => a.name).join(', ')}</span>              
              </div>
              <div className="book-category fs-5">
                <span className="me-2 fw-bold">Category:</span>
                <span>{book.Categories.map(c => c.name).join(', ')}</span>              
              </div>
            </div>
            <div className="d-md-flex justify-content-between align-items-center">
              <div className="mb-2 mb-md-0">
                <span className="me-2">
                  <span className="fs-5 me-2 fw-bold">Start Reading:</span>
                  <span>{book.startRead}</span>
                </span>
                <span className="me-2">
                  <span className="fs-5 me-2 ms-3 fw-bold">End Reading:</span>
                  <span>{book.endRead === 'Invalid date' ? '' : book.endRead}</span>
                </span>
              </div>
              <div className="book-actions"> 
                <button className="btn btn-sm px-1 me-2"
                  onClick={() => navigate('/book-detail/'+book.id)}>
                  <i className="bi bi-eye fs-4"></i>
                </button> 
                <button className="btn btn-sm px-1 me-2"
                  onClick={() => props.onEdit(book)}>
                  <i className="bi bi-pencil-square fs-4"></i>
                </button>
                <button className="btn btn-sm px-1 pe-0"
                  onClick={() => props.onDelete(book)}>
                  <i className="bi bi-trash3 fs-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard