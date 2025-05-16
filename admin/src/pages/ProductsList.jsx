import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VITE_BACKEND_URL } from "../../config/env";
import { Loader2, X, ShoppingBag } from "lucide-react";
import { productService } from "../services/api.js";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await productService.getAll();
      setProducts(products);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await productService.deleteProduct(productId);
      if (response.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete product");
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories for filter
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex items-center mb-6">
        <ShoppingBag className="w-8 h-8 mr-2 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-indigo-600 rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 mt-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-md font-medium text-gray-600">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-md font-medium text-gray-600">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-md font-medium text-gray-600">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-md font-medium text-gray-600">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-md font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-25 bg-gray-100  overflow-hidden">
                      {product.image && product.image[0]?.url ? (
                        <img
                          src={product.image[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-md text-gray-700">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-md text-gray-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-md font-medium text-blue-600">
                      ${product.newPrice}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
