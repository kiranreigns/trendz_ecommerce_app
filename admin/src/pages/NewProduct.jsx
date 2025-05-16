import React, { useState } from "react";
import upload_area from "../assets/upload_area.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productService } from "../services/api";

const NewProduct = () => {
  const adultSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const kidsSizes = [
    "0-1Y",
    "1-2Y",
    "2-3Y",
    "4-5Y",
    "6-7Y",
    "8-9Y",
    "10-11Y",
    "12-13Y",
    "14-15Y",
    "16-17Y",
  ];

  const [formData, setFormData] = useState({
    name: "",
    category: "Men",
    subCategory: "Shirts",
    images: [],
    newPrice: "",
    oldPrice: "",
    description: "",
    sizes: [],
    bestSeller: false,
    newCollection: false,
    rating: 0, // Initialize with 0
    reviews: 0, // Initialize with 0
  });

  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const { id, files } = e.target;
    if (files[0]) {
      setImageFiles((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation for sizes
    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append all form fields with proper type conversion
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("subCategory", formData.subCategory);
      formDataToSend.append("newPrice", Number(formData.newPrice) || 0);
      formDataToSend.append("oldPrice", Number(formData.oldPrice) || 0);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("sizes", JSON.stringify(formData.sizes));
      formDataToSend.append("bestSeller", formData.bestSeller);
      formDataToSend.append("newCollection", formData.newCollection); // Add this line
      formDataToSend.append("ratings", Number(formData.rating) || 0); // Ensure number
      formDataToSend.append("reviews", Number(formData.reviews) || 0); // Ensure number

      // Append image files
      Object.keys(imageFiles).forEach((key) => {
        if (imageFiles[key]) {
          formDataToSend.append(key, imageFiles[key]);
        }
      });

      const response = await productService.createProduct(formDataToSend);
      if (response.success) {
        toast.success("Product created successfully!");
        // Reset form
        setFormData({
          name: "",
          category: "Men",
          subCategory: "Shirts",
          images: [],
          newPrice: "",
          oldPrice: "",
          description: "",
          sizes: [],
          bestSeller: false,
          newCollection: false,
          rating: 0,
          reviews: 0,
        });
        setImageFiles({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error creating product";
      toast.error(errorMessage);
      console.error("Error creating product:", error);
    }
  };

  const availableSizes = formData.category === "Kids" ? kidsSizes : adultSizes;

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Image Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="mb-3 font-medium text-gray-700">Upload Images</p>
          <div className="flex gap-4 flex-wrap">
            {[1, 2, 3, 4].map((num) => (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="relative cursor-pointer group"
              >
                <img
                  className="w-32 h-32 object-cover rounded-lg border-2 border-dashed border-gray-300 group-hover:border-purple-500 transition-colors"
                  src={
                    imageFiles[`image${num}`]
                      ? URL.createObjectURL(imageFiles[`image${num}`])
                      : upload_area
                  }
                  alt=""
                />
                <input
                  type="file"
                  id={`image${num}`}
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Sizes Selection */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`min-w-[3.5rem] h-10 rounded-full border-2 cursor-pointer text-sm flex items-center justify-center px-3 ${
                    formData.sizes.includes(size)
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  } hover:border-purple-600 transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Sub Category
            </label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="Shirts">Shirts</option>
              <option value="Pants">Pants</option>
              <option value="Jackets and Suits">Jackets and Suits</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Tops">Tops</option>
              <option value="Dresses">Dresses</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Accessories">Accessories</option>
              <option value="Boys Clothing">Boys Clothing</option>
              <option value="Girls Clothing">Girls Clothing</option>
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Original Price
            </label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Original price"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Sale Price
            </label>
            <input
              type="number"
              name="newPrice"
              value={formData.newPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Sale price"
              required
            />
          </div>
        </div>

        {/* Ratings and Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Initial Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Initial rating"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Initial Reviews Count
            </label>
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Number of reviews"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        {/* Additional Options */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="bestSeller"
              id="bestSeller"
              checked={formData.bestSeller}
              onChange={handleInputChange}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="bestSeller" className="font-medium text-gray-700">
              Mark as Best Seller
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="newCollection"
              id="newCollection"
              checked={formData.newCollection}
              onChange={handleInputChange}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label
              htmlFor="newCollection"
              className="font-medium text-gray-700"
            >
              Add to New Collections
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="lg:w-full sm:w-auto px-4 py-3 bg-purple-700 text-white text-md font-semibold rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition-colors cursor-pointer"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
