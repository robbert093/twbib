import React, { useEffect } from 'react'
import Select from 'react-select';

function BookForm({props}) {
  const formik = props.formik;
  const categoryOptions = props.categories.map((category) => {
    return {value: category.id, label: category.name}
  });
  const authorOptions = props.authors.map((author) => {
    return {value: author.id, label: author.name}
  });
  const categoryChange = (selectedOption) => {
    formik.setFieldValue('categories', selectedOption.map((option) => option.value));
  }
  const authorChange = (selectedOption) => {
    formik.setFieldValue('authors', selectedOption.map((option) => option.value));
  }

  return (
    <>
      <div className="modal-body book-form">
        <form onSubmit={formik.handleSubmit} >
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input className="form-control" id="title" name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>
            <div className="errors text-danger fs-6">
              {formik.errors.title && formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div className="form-group mb-3">
            <label>Authors</label>
            <Select id="authors" options={authorOptions} 
              value={authorOptions.filter((option) => formik.values.authors.includes(option.value))}
              onChange={authorChange} isMulti
              onBlur={formik.handleBlur}/>
            <div className="errors text-danger fs-6">
              {formik.errors.authors && formik.touched.authors && formik.errors.authors}
            </div>
          </div>
          <div className="form-group mb-3">
            <label>Categories</label>
            <Select id="categories" options={categoryOptions} 
              value={categoryOptions.filter((option) => formik.values.categories.includes(option.value))}
              onChange={categoryChange} isMulti
              onBlur={formik.handleBlur}/>
            <div className="errors text-danger fs-6">
              {formik.errors.categories && formik.touched.categories && formik.errors.categories}
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>
            <div className="errors text-danger fs-6">
              {formik.errors.description && formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="pageCount">Pages</label>
            <input className="form-control" id="pageCount" name="pageCount"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>
            <div className="errors text-danger fs-6">
              {formik.errors.pageCount && formik.touched.pageCount && formik.errors.pageCount}
            </div>
          </div> 
          <div className="row mb-3">
            <div className="col">
              <div className="form-group">
                <label htmlFor="startRead">Start read</label>
                <input type="date" className="form-control" id="startRead" name="startRead"
                  value={formik.values.startRead || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}/>
                <div className="errors text-danger fs-6">
                  {formik.errors.startRead && formik.touched.startRead && formik.errors.startRead}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="endRead">End read</label>
                <input type="date" className="form-control" id="endRead" name="endRead"
                  value={formik.values.endRead || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}/>
                <div className="errors text-danger fs-6">
                  {formik.errors.endRead && formik.touched.endRead && formik.errors.endRead}
                </div>
              </div>
            </div>
          </div>       
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" 
          onClick={props.toggleModal}>Cancel</button>
        <button type="button" className="btn btn-primary"
          onClick={formik.submitForm}>Save</button>
      </div>
    </>
  )
}

export default BookForm