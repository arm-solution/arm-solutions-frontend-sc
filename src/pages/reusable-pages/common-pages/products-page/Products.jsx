import React, { useState, useEffect } from 'react';
import './Products.css';
import { useDispatch, useSelector } from 'react-redux';
import ProductsForm from '../../../../components/modals-forms/products-form/ProductsForm';
import { getAllProducts } from '../../../../store/features/productSlice';
import EditProduct from '../../../../components/modals-forms/edit-product-modal/EditProduct';
import Card from '../../../../components/card-product-v1/CardProduct';

const Products = () => {
  const [selectedTab, setSelectedTab] = useState('tab-one');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const columns = [
    { header: 'Product Name', accessor: 'product_name' },
    { header: 'Product Description', accessor: 'product_description' },
    { header: 'Product Price', accessor: 'product_price' },
    { header: 'Image Link', accessor: 'product_image_link' },
    { header: 'Product ID', accessor: 'id' },
    { header: 'Product Image Original Name', accessor: 'product_image_original_name' },
    { header: 'Product Image Name', accessor: 'product_image_name' },
    { header: 'Date Created', accessor: 'date_created' },
    { header: 'Product Drive Id', accessor: 'product_drive_id' },
  ];

  const handleTabChange = (event) => {
    setSelectedTab(event.target.id);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="worko-tabs">
        <input
          className="state"
          type="radio"
          title="tab-one"
          name="tabs-state"
          id="tab-one"
          checked={selectedTab === 'tab-one'}
          onChange={handleTabChange}
        />
        <input
          className="state"
          type="radio"
          title="tab-two"
          name="tabs-state"
          id="tab-two"
          checked={selectedTab === 'tab-two'}
          onChange={handleTabChange}
        />

        <div className="tabs flex-tabs">
          <label htmlFor="tab-one" id="tab-one-label" className="tab">Product Form</label>
          <label htmlFor="tab-two" id="tab-two-label" className="tab">Product List</label>

          <div id="tab-one-panel" className={`panel ${selectedTab === 'tab-one' ? 'active' : ''}`}>
            <ProductsForm />
          </div>

          <div id="tab-two-panel" className={`panel ${selectedTab === 'tab-two' ? 'active' : ''}`}>
            <Card
              products={products.data}
              columns={columns}
              perPage={5}
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default Products;