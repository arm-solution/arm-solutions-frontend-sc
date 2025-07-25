import React, { useState, useEffect, useRef } from 'react'
// import './Client.css'
import { useSelector, useDispatch } from 'react-redux' 
import DataTable from '../../../../components/DataTable';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
// import ClientDetails from '../../components/modals-forms/clients-details-modal/ClientDetails'
import { deleteConfirmation } from '../../../../customs/global/alertDialog';
import { getAllProducts, deleteProduct } from '../../../../store/features/productSlice';
import { currencyFormat } from '../../../../customs/global/currency';
import ProductsFormModal from '../../../../components/modals-forms/products-form/ProductFormModal';

const Client = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const ITEMS_PER_PAGE = 15;
 
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    description: '',
    sku: '',
    stock_quantity: '',
    base_price: '',
    category_id: ''
  })

  const { data: allProducts, loading: productLoading } = useSelector(state => state.products);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Quantity', accessor: 'stock_quantity' },
    { header: 'Base Price', accessor: 'base_price' },
    { header: 'Category', accessor: 'category_name' },
  ]


  const filteredData = allProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

    // Pagination logic
      const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
      };

      const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
      };


  const handleView = (product) => {
      const modalElement = modalRef.current;
      const modal = new Modal(modalElement);
      setSelectedProduct(product);
      modal.show();
  }

  const handleDelete = (id) => {
   deleteConfirmation({
         title: "",
         text: "",
         icon: "",
         confirmButtonText: "",
         cancelButtonText: "",
         deleteTitle: "",
         deleteText: "",
         successTitle: "", 
         successText: ""
       }, async () => {
       
         const { payload } =  await dispatch(deleteProduct(id)) 
         const result = payload.affectedRows > 0 ? true : false;
         if (result) {
           dispatch(getAllProducts());
           return true;
         }
         return false;
   
       })

  }

    const addProductModal = () => {
      const modalElement = modalRef.current;
      const modal = new Modal(modalElement);
      setSelectedProduct({
        name: '',
        description: '',
        sku: '',
        stock_quantity: '',
        base_price: '',
        category_id: ''
      });
      modal.show();
    }


  return (
    <>
    {/* Navbar-style header */}
      <div className="px-4 py-3 text-black fw-bold fs-4 rounded" style={{ backgroundColor: "#ededed", marginBottom: "15px" }}>
      Product Management
    </div>

        {/* <DataTable
          data={Array.isArray(allProducts) ? allProducts : []} // Ensure data is an array
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
          deleteAccess={true}
          tableLabel='Products List'
          addData={ addProductModal }
        /> */}

        <div className="px-3 mt-4">


          {/* Card Table Full Width */}
          <div className="card shadow-sm w-100">
            <div className="card-header fw-bold bg-light">


          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search for product..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
            />
            <button className="btn btn-success p-2" onClick={addProductModal}>Add Product</button>
          </div>




            </div>
            <div className="card-body p-0">
              <table className="table table-bordered m-0">
                <thead className="table-success">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.accessor}>{col.header}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className={item.stock_quantity === 0 ? 'table-danger' : ''}
                    >
                      {columns.map((col) => (
                        <td key={col.accessor}>{item[col.accessor]}</td>
                      ))}
                      <td>
                        <button className="btn btn-info btn-sm me-1 text-white" onClick={() => handleView(item)}>Details</button>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan={columns.length + 1} className="text-center">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="card-footer d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="text-muted">
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
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