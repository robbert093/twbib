import React, { useEffect, useState } from 'react'

function Sidebar({props}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

    useEffect(() => {
      props.onFilter({
        'categories': selectedCategories,
        'authors': selectedAuthors,
      });
  }, [selectedCategories, selectedAuthors, props]);

  function filterList(list, itemId, checked) {
    if (checked) {
      return [...list, itemId];
    } else {
      return list.filter((item) => item !== itemId);
    }
  }
  
  function clearFilters() {
    const sidebar = document.getElementById('sidebar');
    const checkboxes = sidebar.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    setSelectedCategories([]);
    setSelectedAuthors([]);
  }

  return (
    <div id="sidebar" className="border mb-6 mb-md-0 shadow-none card">
      <div className="card-header bg-white">
        <h4 className="mb-0 fs-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter text-muted me-2" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
          </svg>
          Filters
        </h4>
      </div>
      <div className="py-3 card-body">
        <div className="fw-medium">Categories</div>
        <div id="categories">
          <div className="mt-3">
            {
              props.categories.map(cat => {
                return (
                  <div key={cat.id} className="mb-2 form-check">
                    <input type="checkbox" className="form-check-input" 
                      id={'cat_'+cat.id} onChange={e => setSelectedCategories(
                        (prev) => filterList(prev, cat.id, e.target.checked))}/>
                    <label htmlFor={'cat_'+cat.id} className="form-check-label">
                      {`${cat.name} (${cat.Books.length})`}
                    </label>
                  </div>
                )}
              )
            }
          </div>
        </div>
      </div>
      <div className="border-top py-3 card-body">
        <div className="fw-medium">Authors</div>
        <div id="authors">
          <div className="mt-3">
            {
              props.authors.map(author => {
                return (
                  <div key={author.id} className="mb-2 form-check">
                    <input type="checkbox" className="form-check-input" 
                      id={'author_'+author.id} onChange={e => setSelectedAuthors(
                        (prev) => filterList(prev, author.id, e.target.checked))}/>
                    <label htmlFor={'author_'+author.id} className="form-check-label">
                      {`${author.name} (${author.Books.length})`}
                    </label>
                  </div>
                )}
              )
            }
          </div>
        </div>
      </div>
      
      <div className="py-3 d-grid card-body">
        <button className="btn btn-outline-secondary"
          onClick={clearFilters}>Clear Filters</button>
      </div>
    </div>
  )
}

export default Sidebar