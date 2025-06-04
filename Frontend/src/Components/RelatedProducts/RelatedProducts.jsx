import { useState, useEffect, useContext } from "react";
import ShopContext from "../../context/ShopContext";
import Item from "../Item/Item";
import "./RelatedProducts.css";

const RelatedProducts = ({ product }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (product && products.length > 0) {
      // Filter products with the same subcategory, excluding the current product
      const related = products.filter(
        (p) =>
          p.subCategory === product.subCategory &&
          p._id !== product._id &&
          p.category === product.category
      );

      setRelatedProducts(related);
    }
  }, [product, products]);

  if (!relatedProducts.length) return null;

  return (
    <div className="related-products">
      <h2 className="related-products-title">You may also like</h2>
      <div className="related-products-grid">
        {relatedProducts.map((product) => (
          <Item
            key={product._id}
            id={product._id}
            name={product.name}
            image={product.image?.[0]}
            oldPrice={product.oldPrice}
            newPrice={product.newPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
