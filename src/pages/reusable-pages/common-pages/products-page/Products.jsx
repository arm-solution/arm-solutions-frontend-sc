import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { deleteConfirmation } from '../../../../customs/global/alertDialog'
import { getAllProducts, deleteProduct } from '../../../../store/features/productSlice'
import ProductsFormModal from '../../../../components/modals-forms/products-form/ProductFormModal'

const Client = () => {
  const modalRef = useRef(null)
  const dispatch = useDispatch()

  const LIMIT = 15

  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    description: '',
    sku: '',
    stock_quantity: '',
    base_price: '',
    category_id: ''
  })

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  // 🔥 get paginated response from redux
  const {
    allProducts,
    page: currentPage = 1,
    loading
  } = useSelector(state => state.products)

  // 🔥 FETCH DATA BASED ON PAGE + SEARCH
  useEffect(() => {
    dispatch(
      getAllProducts({
        page,
        limit: LIMIT,
        search
      })
    )
  }, [dispatch, page])


  useEffect(() => {
    console.log("data recieved ", allProducts)
  }, [allProducts])
  

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Quantity', accessor: 'stock_quantity' },
    { header: 'Base Price', accessor: 'base_price' },
    { header: 'Category', accessor: 'category_name' }
  ]

  const handleNext = () => {
    if (page < allProducts.totalPages) setPage(prev => prev + 1)
  }

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  const handleView = (product) => {
    const modal = new Modal(modalRef.current)
    setSelectedProduct(product)
    modal.show()
  }

  const handleDelete = (id) => {
    deleteConfirmation({}, async () => {
      const { payload } = await dispatch(deleteProduct(id))
      if (payload?.affectedRows > 0) {
        dispatch(getAllProducts({ page, limit: LIMIT, search }))
        return true
      }
      return false
    })
  }

  const handleSearch = async() => {
    if(search) {
      await dispatch(getAllProducts({ page, limit: LIMIT, search }))
    } else {
      console.error("Need to fill up the search input")
    }
  }

  const addProductModal = () => {
    const modal = new Modal(modalRef.current)
    setSelectedProduct({
      name: '',
      description: '',
      sku: '',
      stock_quantity: '',
      base_price: '',
      category_id: ''
    })
    modal.show()
  }

  return (
    <>
      <div className="px-4 py-3 fw-bold fs-4 bg-light mb-3">
        Product Management
      </div>

      <div className="px-3 mt-4">
        <div className="card shadow-sm w-100">
          <div className="card-header bg-light">

            {/* 🔍 SEARCH */}
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="form-control w-50"
                placeholder="Search name, sku, category, description..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1) // 🔥 reset page on search
                }}
              />
              <div>
                <button className="btn btn-primary text-white me-2" onClick={handleSearch}>
                  Search
                </button>
                <button className="btn btn-success" onClick={addProductModal}>
                  Add Product
                </button>
              </div>
            </div>

          </div>

          <div className="card-body p-0">
            <table className="table table-bordered m-0">
              <thead className="table-success">
                <tr>
                  {columns.map(col => (
                    <th key={col.accessor}>{col.header}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts?.data?.map(item => (
                  <tr key={item.id} className={item.stock_quantity === 0 ? 'table-danger' : ''}>
                    {columns.map(col => (
                      <td key={col.accessor}>{item[col.accessor]}</td>
                    ))}
                    <td>
                      <button
                        className="btn btn-info btn-sm me-1 text-white"
                        onClick={() => handleView(item)}
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {!loading && allProducts?.data.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 🔥 SERVER-SIDE PAGINATION */}
          <div className="card-footer d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handlePrev}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="text-muted">
              Page {page} of {allProducts.totalPages}
            </span>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleNext}
              disabled={page === allProducts.totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ProductsFormModal
        modalRef={modalRef}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </>
  )
}

export default Client
