import "./BestSellers.css";
import Item from "../Item/Item";
import { useContext } from "react";
import ShopContext from "../../context/ShopContext";
import Loader from "../Loader/Loader";

const Bestsellers = () => {
  const { products, moveToBag, isLoading } = useContext(ShopContext);

  const bestSellerProducts = products.filter((product) => product.bestSeller);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="best-sellers" id="best-sellers">
      <div className="best-sellers-header">
        <h1>Best Sellers</h1>
      </div>

      <div className="best-sellers-grid">
        {bestSellerProducts.map((product) => (
          <div className="grid-item" key={product._id}>
            <Item
              id={product._id}
              name={product.name}
              image={product.image[0]}
              newPrice={product.newPrice}
              oldPrice={product.oldPrice}
              onMoveToBag={() => moveToBag(product, product.sizes[0])}
            />
          </div>
        ))}
      </div>

      <button className="view-all-button">
        View All Products
        <svg
          xmlns="https://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </section>
  );
};

export default Bestsellers;
