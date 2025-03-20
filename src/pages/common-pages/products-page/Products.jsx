import React, { useState, useEffect, useRef } from 'react'
// import './Client.css'
import { useSelector, useDispatch } from 'react-redux' 
import DataTable from '../../../components/DataTable';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
// import ClientDetails from '../../components/modals-forms/clients-details-modal/ClientDetails'
import { deleteConfirmation } from '../../../customs/global/alertDialog';
import productSlice, { getAllProducts, deleteProduct } from '../../../store/features/productSlice';
import { currencyFormat } from '../../../customs/global/currency'
import ProductsFormModal from '../../../components/modals-forms/products-form/ProductFormModal';

const Client = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
 
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    description: '',
    sku: '',
    base_price: '',
    category_id: ''
  })

  const { data: allProducts, loading: productLoading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Base Price', accessor: 'base_price' },
    { header: 'Category', accessor: 'category_name' },
  ]

  const handleView = (product) => {
    // alert(product.id);
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

        <DataTable
          data={Array.isArray(allProducts) ? allProducts : []} // Ensure data is an array
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
          deleteAccess={true}
          tableLabel='Products List'
          addData={ addProductModal }
        />

        <ProductsFormModal
        modalRef={modalRef}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        />
    </>
  )
}

export default Client