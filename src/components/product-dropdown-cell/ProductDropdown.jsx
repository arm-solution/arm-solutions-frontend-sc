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
    <td ref={dropdownRef} className="product-dropdown-container">
      <div 
        className="form-select dropdown-toggle product-dropdown-toggle"
        onClick={toggleDropdown}
      >
        {selectedProduct ? selectedProduct.name : 'Select a product...'}
      </div>

      {isOpen && (
        <div className="dropdown-menu show">
          <div className="dropdown-search-box">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div className="dropdown-items-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => {
                const isOutOfStock = product.stock_quantity === 0;

                const handleClick = () => {
                  if (isOutOfStock) {
                    alert(`${product.name} is out of stock.`);
                    return;
                  }
                  handleProductClick(product, row.id);
                };

                return (
                  <div
                    key={product.id}
                    className={`dropdown-item ${isOutOfStock ? 'disabled' : ''}`}
                    onClick={handleClick}
                    style={{
                      color: isOutOfStock ? '#999' : 'inherit',
                      pointerEvents: isOutOfStock ? 'none' : 'auto'
                    }}
                  >
                    {product.name} {isOutOfStock ? '(Out of stock)' : `   (${product.stock_quantity})` }
                  </div>
                );
              })
            ) : (
              <div className="dropdown-no-results">No products found</div>
            )}
          </div>
        </div>
      )}
    </td>
  );
};

export default ProductDropdown;
