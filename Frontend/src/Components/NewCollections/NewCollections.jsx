import React, { useContext } from "react";
import ShopContext from "../../Context/ShopContext";
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = () => {
  const { products, isLoading } = useContext(ShopContext);

  const newCollections = products.filter((product) => product.newCollection);

  if (isLoading) {
    return (
      <div className="new-collections">
        <div className="new-collections-header">
          <h1>NEW COLLECTIONS</h1>
        </div>
        <div className="loading">Loading new collections...</div>
      </div>
    );
  }

  return (
    <section className="new-collections" id="new-collections">
      <div className="new-collections-header">
        <h1>NEW COLLECTIONS</h1>
      </div>

      <div className="new-collections-grid">
        {newCollections.map((product) => (
          <div className="grid-item" key={product._id}>
            <Item
              id={product._id}
              name={product.name}
              image={product.image[0]}
              newPrice={product.newPrice}
              oldPrice={product.oldPrice}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewCollections;
