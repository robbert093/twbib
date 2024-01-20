import React from 'react'

function Header({openModal, onSearch}) {

  return (
    <div className="row mb-4 align-items-center justify-content-between">
      <div className="col col-lg-6">
        <div className="search-bar bg-white rounded-3 border overflow-hidden">
          <div className="input-group">
            <span className="bg-transparent border-0 pe-0 ps-md-3 ps-md-0 input-group-text" id="searchBook">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-search text-muted" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
            </span>
            <input type="search" onChange={e => onSearch(e.target.value)} 
              placeholder="Search" aria-label="Search" 
              className="border-0 ps-3 form-focus-none form-control shadow-none" />
          </div>
        </div>
      </div>
      <div className="col-auto">
        <button className="btn btn-primary" onClick={openModal}>Add new</button>
      </div>
    </div>
  )
}

export default Header