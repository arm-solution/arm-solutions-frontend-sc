import React, { useState, useEffect, useRef } from 'react';
import './ProductDropdown.css';

const ProductDropdown = ({ row, products, handleProductSelection }) => {
 const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dropdownRef = useRef(null);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleProductClick = (product, rowId) => {
    setSelectedProduct(product);
    handleProductSelection({ target: { value: product.id } }, rowId);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!row.isEditing) {
    return <td>{row.name}</td>;
  }

  return (
    <td ref={dropdownRef} style={{ position: 'relative' }}>
      <div 
        className="form-select dropdown-toggle"
        onClick={toggleDropdown}
        style={{
          cursor: 'pointer',
          padding: '0.375rem 2.25rem 0.375rem 0.75rem', 
          backgroundColor: '#fff',
          border: '1px solid #ced4da',
          borderRadius: '0.375rem',
        }}
      >
        {selectedProduct ? selectedProduct.name : 'Select a product...'}
      </div>
      
      {isOpen && (
        <div 
          className="dropdown-menu show"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid rgba(0,0,0,.15)',
            borderRadius: '0.375rem',
            backgroundColor: '#fff',
            padding: '0.5rem',
          }}
        >
          <div className="px-2 mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          
          <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="dropdown-item"
                  onClick={() => handleProductClick(product, row.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '0.25rem 1rem',
                    ':hover': {
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  {product.name}
                </div>
              ))
            ) : (
              <div className="dropdown-item text-muted">No products found</div>
            )}
          </div>
        </div>
      )}
    </td>
  );
}

export default ProductDropdown