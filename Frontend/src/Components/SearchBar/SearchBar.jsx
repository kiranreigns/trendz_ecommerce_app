import { useState, useRef, useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { productService } from "../../services/api";
import "./SearchBar.css";

const SearchBar = ({
  isMobile = false,
  onClose = null,
  isVisible = true,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getAll();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsLoading(true);
      // Filter products locally based on search query
      const filteredProducts = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(query.toLowerCase()))
      );

      setProducts(filteredProducts.slice(0, 5)); // Limit to 5 products for suggestions
      setShowSearchSuggestions(true);
      setIsLoading(false);
    } else if (query.length === 0) {
      setProducts([]);
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchSuggestions(false);
      setSearchQuery(""); // Clear search bar after search
      if (isMobile && onClose) onClose();
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearchSuggestions(false);
    setSearchQuery(""); // Clear search bar after product click
    if (isMobile && onClose) onClose();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isVisible) return null;

  // Generate search suggestions based on product categories
  const searchSuggestions = [
    ...new Set(
      allProducts
        .map((product) => product.category)
        .filter(
          (category) =>
            category &&
            category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ),
  ].slice(0, 5);

  return (
    <div
      className={`search-container ${
        isMobile ? "mobile-search-container" : "desktop-search"
      } {${className}}`}
      ref={searchRef}
    >
      <form
        onSubmit={handleSearchSubmit}
        className="search-form ${isMobile ? 'mobile-search-form' : ''}"
      >
        <div className={isMobile ? "mobile-search-wrapper" : "search-wrapper"}>
          <button type="submit" className="search-icon">
            <LuSearch size={20} />
          </button>
          <input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            autoFocus={isMobile}
          />
          {isMobile && onClose && (
            <button
              type="button"
              className="mobile-search-close"
              onClick={onClose}
            >
              <LuX size={20} />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSearchSuggestions && searchQuery.length > 0 && (
          <div className="search-suggestions">
            {isLoading ? (
              <div className="suggestion-loading">Loading...</div>
            ) : (
              <>
                {/* Product results */}
                {products.length > 0 && (
                  <div className="suggestion-section">
                    <div className="suggestion-header">Products</div>
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="suggestion-product"
                        onClick={() => handleProductClick(product._id)}
                      >
                        <div className="suggestion-product-info">
                          <div className="suggestion-product-name">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Category suggestions */}
                {searchSuggestions.length > 0 && (
                  <div className="suggestion-section">
                    <div className="suggestion-header">Categories</div>
                    {searchSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          navigate(
                            `/search?q=${encodeURIComponent(suggestion)}`
                          );
                          setShowSearchSuggestions(false);
                          setSearchQuery(""); // Clear search bar after category click
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        <LuSearch size={14} className="suggestion-icon" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* No results message */}
                {products.length === 0 && searchSuggestions.length === 0 && (
                  <div className="suggestion-no-results">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
