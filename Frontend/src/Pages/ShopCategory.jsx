import React, { useState, useContext } from "react";
import ShopContext from "../context/ShopContext";
import Item from "../components/Item/Item";
import "./CSS/ShopCategory.css";
import Loader from "../components/Loader/Loader";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";

const ShopCategory = ({ banner, category }) => {
  const { products, isLoading, addToWishlist, moveToBag } =
    useContext(ShopContext);
  const [subCategory, setSubCategory] = useState("all");

  const categoriesMap = {
    men: ["all", "shirts", "pants", "Jackets and Suits", "t-shirts"],
    women: ["all", "tops", "dresses", "bottoms", "sarees"],
    kids: ["all", "Boys Clothing", "Girls Clothing"],
  };

  // Filter products by category (case-insensitive)
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  // Filter by subcategory if not "all"
  const filteredProducts =
    subCategory.toLowerCase() === "all"
      ? categoryProducts
      : categoryProducts.filter(
          (product) =>
            product.subCategory.toLowerCase() === subCategory.toLowerCase()
        );

  if (isLoading) {
    return (
      <div className="shop-category">
        <img className="shopcategory-banner" src={banner} alt="" />
        <Loader />
      </div>
    );
  }

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="" />
      <div className="categories-filter">
        {categoriesMap[category.toLowerCase()]?.map((sub) => (
          <button
            key={sub}
            className={`category-button ${
              subCategory.toLowerCase() === sub.toLowerCase() ? "active" : ""
            }`}
            onClick={() => setSubCategory(sub)}
          >
            {sub.charAt(0).toUpperCase() + sub.slice(1)}
          </button>
        ))}
      </div>
      <div className="shopcategory-products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">No products found in this category</div>
        ) : (
          filteredProducts.map((product) => (
            <div className="grid-product" key={product._id}>
              <Item
                id={product._id}
                name={product.name}
                image={product.image[0]}
                newPrice={product.newPrice}
                oldPrice={product.oldPrice}
                onMoveToBag={() => moveToBag(product, product.sizes[0])}
                onAdd={() => addToWishlist(product)}
              />
            </div>
          ))
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default ShopCategory;
